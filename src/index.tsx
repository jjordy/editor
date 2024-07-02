import { useEffect, useRef } from "react";
import type EditorJS from "@editorjs/editorjs";
import { type OutputData } from "@editorjs/editorjs";

declare global {
  interface Window {
    editorData: OutputData;
    editor?: EditorJS;
    editorChanged?: boolean;
  }
}

export default function Editor(
  {
    data,
  }: {
    data: OutputData | any;
  } = { data: undefined },
) {
  const editorRef = useRef<any>(null);

  const initializeEditor = async () => {
    // Import tools on the fly for speed
    const { default: EditorJS } = await import("@editorjs/editorjs");
    const { default: Image } = await import("@editorjs/image");
    const { default: Button } = await import("./blocks/button");
    const { default: DragDrop } = await import("editorjs-drag-drop");
    const { default: Undo } = await import("editorjs-undo");
    const { default: Header } = await import("@editorjs/header");
    const { default: RawTool } = await import("@editorjs/raw");
    const { default: Embed } = await import("@editorjs/embed");
    const { default: QuestionBlock } = await import("./blocks/question/index");
    const { default: GridBlock } = await import("./blocks/grid");

    const mainTools = {
      header: {
        class: Header,
      },
      embed: {
        class: Embed,
      },
      image: {
        class: Image,
        config: {
          endpoints: {
            byFile: "http://localhost:5174/admin/upload-image",
            byUrl: "http://localhost:5174/admin/fetch-url",
          },
        },
      },
      question: {
        class: QuestionBlock,
      },
      raw: {
        class: RawTool,
      },
      button: {
        class: Button,
      },
      grid: {
        class: GridBlock,
        config: {
          EditorJS,
        },
      },
    };

    const editor = new EditorJS({
      autofocus: true,
      holder: "editor",

      onReady: () => {
        new Undo({ editor });
        new DragDrop(editor);
        editorRef.current = editor;
        window.editor = editor;
      },
      //@ts-expect-error
      tools: {
        ...mainTools,
      },
      data: data || { blocks: [] },
    });
  };
  useEffect(() => {
    if (!editorRef.current || !editorRef.current.isReady) {
      initializeEditor();
    }
    return () => {
      editorRef.current.destroy();
      editorRef.current = null;
    };
  }, []);

  return <div id="editor"></div>;
}
