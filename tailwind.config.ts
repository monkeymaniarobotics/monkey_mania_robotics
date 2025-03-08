import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-space-mono)", "monospace"], // Set Space Mono as primary
      },
    },
  },
  plugins: [],
} satisfies Config;
