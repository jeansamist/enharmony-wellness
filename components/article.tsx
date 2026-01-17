"use client";
import { Category } from "@/generated/prisma/client";
import Image from "@tiptap/extension-image";
import { Markdown } from "@tiptap/markdown";
import {
  Editor,
  EditorContent,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FunctionComponent } from "react";
import { v4 as uuidv4 } from "uuid";
export type ArticleProps = {
  title: string;
  content: string;
  description: string;
  cover?: string;
  video_url?: string;
  type?: "text" | "video";
  category?: Category;
};

// Typage des nodes Tiptap
type TiptapNode = {
  type: string;
  text?: string;
  attrs?: { id?: string; src?: string; level?: number };
  content?: TiptapNode[];
};

type SummaryProps = {
  editor: Editor;
};

const Summary: React.FC<SummaryProps> = ({ editor }) => {
  const state = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.getJSON() as TiptapNode,
  });

  if (!state) return null;

  const renderSummary = (node: TiptapNode): React.ReactNode[] => {
    const items: React.ReactNode[] = [];

    if (!node.content) return items;

    for (const child of node.content) {
      switch (child.type) {
        case "heading":
          items.push(
            <div
              key={child.attrs?.id ?? uuidv4()}
              className={` font-bold text-lg`}
              style={{ paddingLeft: ((child.attrs?.level ?? 1) - 1) * 16 }}
            >
              {child.text ?? child.content?.map((c) => c.text).join("")}
            </div>
          );
          break;
        case "paragraph":
          break;
        case "image":
          break;
        case "bulletList":
          break;
        case "orderedList":
          break;
        default:
          break;
      }
    }

    return items;
  };

  return <div className="space-y-2 px-4">{renderSummary(state)}</div>;
};

export const Article: FunctionComponent<ArticleProps> = ({
  content,
  title,
  description,
  cover,
  video_url,
  type,
  category,
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Markdown, Image],
    content: content,
    contentType: "markdown",
    editable: false,

    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });
  if (!editor) return null;
  return (
    <div className="container px-6 mx-auto flex flex-col">
      <div className="flex-1 p-6 flex flex-col xl:flex-row gap-6 overflow-auto">
        <div className="flex-1">
          <div
            style={{
              background: `url("${cover}") no-repeat center / cover`,
            }}
            className="bg-secondary flex flex-col justify-center items-center gap-6 rounded-3xl aspect-video "
          ></div>
          <div className="p-6 space-y-6">
            <div className="text-3xl leading-normal font-bold w-full">
              {title}
            </div>
            <div className="text-base opacity-70 w-full resize-none leading-normal outline-none border-none">
              {description}
            </div>
            <EditorContent
              className="outline-none border-none"
              editor={editor}
            />
          </div>
        </div>
        <div className="max-w-sm w-full space-y-2">
          <div className="text-3xl leading-normal font-bold">Summary</div>
          <Summary editor={editor} />
        </div>
      </div>
    </div>
  );
};
