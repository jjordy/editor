import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
export default function Editor({ data, onChange, }) {
    const editorRef = useRef(null);
    const [editorId, setEditorId] = useState("");
    const initializeEditor = async (editorId) => {
        const { default: EditorJS } = await import("@editorjs/editorjs");
        const { default: Image } = await import("@editorjs/image");
        const { default: Button } = await import("../button");
        const { default: DragDrop } = await import("editorjs-drag-drop");
        const { default: Undo } = await import("editorjs-undo");
        const { default: Header } = await import("@editorjs/header");
        const { default: RawTool } = await import("@editorjs/raw");
        const { default: Embed } = await import("@editorjs/embed");
        const { default: QuestionBlock } = await import("../question/index");
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
        };
        const editor = new EditorJS({
            autofocus: false,
            holder: editorId,
            //@ts-expect-error
            logLevel: "ERROR",
            onReady: () => {
                new Undo({ editor });
                new DragDrop(editor);
                editorRef.current = editor;
            },
            onChange: async (e) => {
                const button = document.querySelector("#editor-save");
                button?.removeAttribute("disabled");
                const content = await e.saver.save();
                onChange(content);
            },
            //@ts-expect-error
            tools: {
                ...mainTools,
            },
            data: data || { blocks: [] },
        });
    };
    useEffect(() => {
        const editorId = nanoid();
        setEditorId(editorId);
        if (!editorRef.current || !editorRef.current.isReady) {
            initializeEditor(editorId);
        }
        return () => {
            editorRef.current.destroy();
            editorRef.current = null;
        };
    }, []);
    return _jsx("div", { id: editorId });
}
