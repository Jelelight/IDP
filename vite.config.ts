import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://www.thaigold.info",  // URL ของ API ที่คุณต้องการเข้าถึง
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),  // ตัด '/api' ออกจากเส้นทางเพื่อให้ตรงกับ path จริงของ API
      },
    },
  },
});