import { BannerToolbarPlugin } from "./BannerToolbarPlugin";
import { HeadingToolbarPlugin } from "./HeadingToolbarPlugin";
import { ListToolbarPlugin } from "./ListToolbarPlugin";

export function ToolbarPlugin() {
  return (
    <>
      <HeadingToolbarPlugin />
      <ListToolbarPlugin />
      <BannerToolbarPlugin />
    </>
  );
}
