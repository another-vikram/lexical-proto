import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
  ElementNode,
  LexicalNode,
  RangeSelection
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export class BannerNode extends ElementNode {
  static getType() {
    return "banner";
  }

  static clone(node: BannerNode) {
    return new BannerNode(node.__key);
  }

  createDOM() {
    const element = document.createElement("div");
    element.className = "banner-editor-class";
    return element;
  }

  updateDOM() {
    return false;
  }

  collapseAtStart(): boolean {
    const paragraph = $createParagraphNode();
    const children = this.getChildren();
    children.forEach((child) => paragraph.append(child));
    this.replace(paragraph);
    return true;
  }
  insertNewAfter(
    _selection: RangeSelection,
    restoreSelection?: boolean
  ): null | LexicalNode {
    const newBlock = $createParagraphNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.insertAfter(newBlock, restoreSelection);
    return newBlock;
  }
}

export const INSERT_BANNER_COMMAND = createCommand("insertBannerCommand");

export function BannerPlugin(): null {
  const [editor] = useLexicalComposerContext();
  editor.registerCommand(
    INSERT_BANNER_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, $createBannerNode);
        return true;
      }
      return false;
    },
    COMMAND_PRIORITY_LOW
  );
  return null;
}
export const $createBannerNode = () => {
  return new BannerNode();
};

export function $isBannerNode(node: LexicalNode): node is BannerNode {
  return node instanceof BannerNode;
}
