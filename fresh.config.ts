import tailwind from "$fresh/plugins/tailwind.ts";
import { defineConfig } from "$fresh/server.ts";
import storiesPlugin from "https://deno.land/x/fresh_stories@0.0.13/stories-plugin.ts";

const plugins = [tailwind()];
if (Deno.env.get("DENO_ENV") === "production") {
  plugins.push(
    storiesPlugin(),
  );
}

export default defineConfig({
  plugins,
});
