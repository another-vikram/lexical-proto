import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode } from "@lexical/rich-text";
import { $getSelection, $isRangeSelection } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { JSX } from "react";

type HeadingType = "h1" | "h2" | "h3";
export function HeadingToolbarPlugin(): JSX.Element[] {
  const [editor] = useLexicalComposerContext();
  const onClick = (heading: HeadingType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => {
          return $createHeadingNode(heading);
        });
      }
    });
  };
  const headings: HeadingType[] = ["h1", "h2", "h3"];
  return headings.map((heading) => (
    <button
      type="button"
      onClick={() => {
        onClick(heading);
      }}
      key={heading}
    >
      {heading.toUpperCase()}
    </button>
  ));
}
