import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // server: {
  //   // Defina manualmente o host e a porta aqui
  //   host: '172.23.225.21',
  //   port: '5174'
  // }
});
