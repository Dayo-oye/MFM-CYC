import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import compression from 'vite-plugin-compression';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default defineConfig({
  root: '.',
  base: './',
  publicDir: 'assets',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        programs: resolve(__dirname, 'programs.html'),
        outreach: resolve(__dirname, 'outreach.html'),
        testimonies: resolve(__dirname, 'testimonies.html'),
        giving: resolve(__dirname, 'giving.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
      output: {
        manualChunks: {
          vendor: ['intersection-observer'],
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          } else if (/woff|woff2|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
  },

  server: {
    port: 3000,
    open: true,
    cors: true,
  },

  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'MFM CAASO Youth Church',
          injectScript: `<script>
            // Critical inline script for immediate execution
            document.documentElement.classList.remove('no-js');
            document.documentElement.classList.add('js');
          </script>`,
        },
      },
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],

  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        cssnano({
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
          }],
        }),
      ],
    },
  },

  optimizeDeps: {
    include: ['intersection-observer'],
  },
});
