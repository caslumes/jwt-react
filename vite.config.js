import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    var config = {
        plugins: [react(), tailwindcss()],
    };

    if (command !== "build") {
        config.server = {
            host: true,
            port: env.VITE_SERVER_PORT,
            watch: {
                usePolling: true,
            },
            https: {
                key: fs.readFileSync(env.VITE_SERVER_HTTPS_KEY),
                cert: fs.readFileSync(env.VITE_SERVER_HTTPS_CERT),
            },
        };
    }

    return config;
});
