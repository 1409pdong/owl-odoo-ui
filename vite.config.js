import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // Yêu cầu Sass im lặng với các cú pháp cũ của Bootstrap
        silenceDeprecations: [
          'import', 
          'global-builtin', 
          'color-functions', 
          'if-function'
        ],
      },
    },
  },
});