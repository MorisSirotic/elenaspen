import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(
        "/etc/letsencrypt/live/elenaspen.com/privkey.pem",
        "utf8"
      ), // Path to your private key file
      cert: fs.readFileSync(
        "/etc/letsencrypt/live/elenaspen.com/fullchain.pem",
        "utf8"
      ), // Path to your SSL certificate file
    },
  },
});
