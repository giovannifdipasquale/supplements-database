import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import bootstrap from "bootstrap-icons/font/bootstrap-icons.css";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      src: "/src",
      public: "/public",
    },
  },
});
