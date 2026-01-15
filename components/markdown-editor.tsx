"use client";
import { Markdown } from "@tiptap/markdown";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC } from "react";

interface MarkdownEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
}

export const MarkdownEditor: FC<MarkdownEditorProps> = ({
  initialContent = "# Hello World\n\nThis is **Markdown**!",
  onContentChange,
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: initialContent,
    contentType: "markdown",

    onUpdate: ({ editor }) => {
      onContentChange?.(editor.markdown?.serialize());
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return (
    <EditorContent
      className="outline-none border-none"
      editor={editor as Editor}
    />
  );
};
