import React from 'react';
import Script from 'next/script';

interface GoogleAnalyticsProps {
  id: string;
  isNextJs?: boolean;
}

function GoogleAnalytics({ id, isNextJs = true }: GoogleAnalyticsProps) {
  if (!id) {
    console.error('GoogleAnalytics: Measurement ID is required.');
    return null;
  }

  return (
    <>
      {isNextJs ? (
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        />
      ) : (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        ></script>
      )}
      <Script id="google-analytics-init" strategy={isNextJs ? 'lazyOnload' : undefined}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

export default GoogleAnalytics;
