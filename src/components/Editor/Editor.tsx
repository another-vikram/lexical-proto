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
import { $createTextNode, $getRoot } from "lexical";

const theme = {
  text: {
    bold: "text-bold",
  },
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

function MyHeadingNodePlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  return (
    <button
      onClick={() => {
        editor.update(() => {
          $getRoot().append(
            $createHeadingNode("h1").append($createTextNode("Hello World!"))
          );
        });
      }}
    >
      Heading
    </button>
  );
}

export function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode],
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
      <MyHeadingNodePlugin />
    </LexicalComposer>
  );
}
