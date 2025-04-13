import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND
} from "@lexical/list";
import { JSX } from "react";

type IListType = "ul" | "ol";
export function ListToolbarPlugin(): JSX.Element {
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
        <button
          type="button"
          onClick={() => {
            onClick(listType);
          }}
          key={listType}
        >
          {listType.toUpperCase()}
        </button>
      ))}
    </>
  );
}
