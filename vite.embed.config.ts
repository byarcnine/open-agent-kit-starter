import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
  },
  build: {
    lib: {
      entry: "node_modules/@open-agent-kit/core/embed/chat.tsx",
      name: "ChatComponent",
      fileName: (format) => `chat.bundle.${format}.js`,
    },
    outDir: "node_modules/@open-agent-kit/core/public/embed",
    rollupOptions: {
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@db": resolve(__dirname, "./node_modules/@open-agent-kit/core/prisma"),
      "~": resolve(__dirname, "./node_modules/@open-agent-kit/core/app"),
    },
  },
});
