import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        https: {
            key: fs.readFileSync(
                "C:/Users/Lucas/OneDrive/Code/Back-End/securityservice/src/main/resources/localhost-key.pem"
            ),
            cert: fs.readFileSync(
                "C:/Users/Lucas/OneDrive/Code/Back-End/securityservice/src/main/resources/localhost.pem"
            ),
        },
    },
});
