import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'dist/index.js', // Use the compiled JS from TypeScript
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      plugins: [terser()], // Minify the CommonJS bundle
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      plugins: [terser()], // Minify the ES Module bundle
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
  ],
  external: ['react', 'next/script'], // Exclude external dependencies
};
