import { defineConfig } from "vite";
import { resolve } from "path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { prepareBuildEnv } from "@open-agent-kit/core/utils/prepareBuildEnv";
import chalk from "chalk";
prepareBuildEnv();

export default defineConfig({
  publicDir: ".oak/core/public", // Use the symlinked folder instead
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    {
      name: "watch-plugins",
      handleHotUpdate(ctx) {
        if (ctx.file.includes("/plugins/")) {
          console.log(chalk.green("plugin changed - reloading"));
          ctx.server.moduleGraph.invalidateAll();
          ctx.server.ws.send({
            type: "full-reload",
            path: "*",
          });
        }
      },
    },
  ],
  optimizeDeps: {
    force: true,
    noDiscovery: false,
    entries: [".oak/core/app/**/*.tsx", ".oak/core/app/**/*.ts"],
  },
  resolve: {
    alias: {
      "@db": resolve(__dirname, ".oak/core/prisma"),
      "~": resolve(__dirname, ".oak/core/app"),
      "@config": resolve(__dirname),
    },
    preserveSymlinks: true,
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /plugins/],
      transformMixedEsModules: true,
    },
  },
});
