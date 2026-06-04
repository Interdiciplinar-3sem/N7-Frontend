import {useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import CharacterCount from "@tiptap/extension-character-count";

export const useSummaryEditor = () => {
    return useEditor({
        extensions: [
            StarterKit,
            CharacterCount.configure({
                limit: 5000,
            }),
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