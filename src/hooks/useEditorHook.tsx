import {useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const useSummaryEditor = () => {
    return useEditor({
        extensions: [
            StarterKit,
        ],
        editorProps: {
            attributes: {
                class:
                    "p-4 focus:outline-none",
            },
            handleKeyDown: (view, event) => {
                if(event.key === "Tab") {
                    event.preventDefault();
                    view.dispatch(view.state.tr.insertText("    "));
                    return true;
                }
                return false;
            }, 
        },
    })
}