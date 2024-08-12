import daisyui from "daisyui";
import { type Config } from "tailwindcss";
import { type PluginCreator } from "tailwindcss/types/config";

const daisyuiPlugin = daisyui as unknown as PluginCreator;

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  plugins: [daisyuiPlugin],
  daisyui: {
    themes: ["dark"],
  },
} satisfies Config;
