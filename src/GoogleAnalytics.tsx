'use client';

import { useEffect, Suspense, useRef, useCallback } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

// Declare gtag on window for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

interface GoogleAnalyticsProps {
  id: string;
  isNextJs?: boolean;
}

/**
 * Send page view event to Google Analytics
 */
function sendPageView(id: string, url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', id, {
      page_path: url,
    });
  }
}

/**
 * Internal component that handles route change tracking for Next.js App Router
 * Separated to allow Suspense boundary for useSearchParams
 */
function NextJsRouteTracker({ id }: { id: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Construct the full URL path with search params
      const url = searchParams?.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      // Send page_view event on route change
      sendPageView(id, url);
    }
  }, [pathname, searchParams, id]);

  return null;
}

/**
 * Internal component that handles route change tracking for React apps
 * Uses browser history API interception to detect route changes
 */
function ReactRouteTracker({ id }: { id: string }) {
  const lastUrl = useRef<string>('');

  const handleRouteChange = useCallback(() => {
    const currentUrl = window.location.pathname + window.location.search;

    // Only send if URL actually changed
    if (currentUrl !== lastUrl.current) {
      lastUrl.current = currentUrl;
      sendPageView(id, currentUrl);
    }
  }, [id]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Store original methods
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    // Override pushState to detect programmatic navigation
    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      handleRouteChange();
    };

    // Override replaceState to detect programmatic navigation
    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      handleRouteChange();
    };

    // Listen for popstate (browser back/forward buttons)
    window.addEventListener('popstate', handleRouteChange);

    // Initialize last URL
    lastUrl.current = window.location.pathname + window.location.search;

    // Cleanup
    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [handleRouteChange]);

  return null;
}

/**
 * GoogleAnalytics component for Next.js and React applications
 * 
 * Features:
 * - Initializes Google Analytics with your Measurement ID
 * - Automatically tracks client-side route changes in Next.js (App Router & Pages Router)
 * - Automatically tracks client-side route changes in React apps (React Router, etc.)
 * - Supports both Next.js and standard React
 * 
 * @param id - Your Google Analytics Measurement ID (e.g., 'G-XXXXXXXXXX')
 * @param isNextJs - Set to true for Next.js apps (default), false for React apps
 */
function GoogleAnalytics({ id, isNextJs = true }: GoogleAnalyticsProps) {
  if (!id) {
    console.error('GoogleAnalytics: Measurement ID is required.');
    return null;
  }

  return (
    <>
      {/* Load the Google Analytics script */}
      {isNextJs ? (
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        />
      ) : (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        ></script>
      )}

      {/* Initialize gtag */}
      <Script
        id="google-analytics-init"
        strategy={isNextJs ? 'afterInteractive' : undefined}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', {
            page_path: window.location.pathname + window.location.search,
          });
        `}
      </Script>

      {/* Route change tracker */}
      {isNextJs ? (
        <Suspense fallback={null}>
          <NextJsRouteTracker id={id} />
        </Suspense>
      ) : (
        <ReactRouteTracker id={id} />
      )}
    </>
  );
}

export default GoogleAnalytics;
