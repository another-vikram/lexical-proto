import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $createHeadingNode, HeadingNode } from "@lexical/rich-text";
import "./Editor.styles.css";
import { JSX } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListItemNode,
  ListNode
} from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

const theme = {
  text: {
    bold: "text-bold"
  }
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}
type HeadingType = "h1" | "h2" | "h3";
function HeadingPlugin(): JSX.Element[] {
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
    <button onClick={() => onClick(heading)} key={heading}>
      {heading.toUpperCase()}
    </button>
  ));
}

type IListType = "ul" | "ol";
function ListToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const onClick = (listType: IListType) => {
    if (listType === "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };
  const listTypes: IListType[] = ["ul", "ol"];
  return (
    <>
      {listTypes.map((listType) => (
        <button onClick={() => onClick(listType)} key={listType}>
          {listType.toUpperCase()}
        </button>
      ))}
    </>
  );
}

export function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode]
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            aria-placeholder={"Enter some text..."}
            placeholder={
              <div className="editor-placeholder">Enter some text...</div>
            }
            className="editor-contentEditable"
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <HeadingPlugin />
      <ListPlugin />
      <ListToolbarPlugin />
    </LexicalComposer>
  );
}
