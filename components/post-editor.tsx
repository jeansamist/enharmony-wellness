"use client";
import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  CodeIcon,
  ImageIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  QuotesIcon,
  TextAlignLeftIcon,
  TextBIcon,
  TextHFiveIcon,
  TextHFourIcon,
  TextHOneIcon,
  TextHSixIcon,
  TextHThreeIcon,
  TextHTwoIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
} from "@phosphor-icons/react";
import { Markdown } from "@tiptap/markdown";
import {
  Editor,
  EditorContent,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Activity, FunctionComponent, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";

import { createPostAction } from "@/actions/post.actions";
import { Category, User } from "@/generated/prisma/client";
import { uploadImage } from "@/services/file.service";
import Image from "@tiptap/extension-image";
import { v4 as uuidv4 } from "uuid";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";

export type PostEditorProps = {
  title: string;
  content: string;
  categories: Category[];
  reviewers: User[];
  description: string;
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

export const Summary: React.FC<SummaryProps> = ({ editor }) => {
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

const Menu = ({ editor }: { editor: Editor }) => {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
        text: ctx.editor.markdown?.serialize(editor.getJSON()),
      };
    },
  });

  const addImageFromFile = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      // Création d'une image skeleton
      const placeholderId = `img-${uuidv4()}`;
      editor
        .chain()
        .focus()
        .insertContent({
          type: "image",
          attrs: {
            src: "",
            alt: "Loading...",
            id: placeholderId,
          },
        })
        .run();

      // Crée un canvas temporaire pour simuler le skeleton
      const imgElement = document.getElementById(
        placeholderId
      ) as HTMLImageElement;
      if (imgElement) {
        const canvas = document.createElement("canvas");
        canvas.width = 400;
        canvas.height = 200;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#e5e7eb"; // gris clair
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#d1d5db"; // gris légèrement plus foncé
          ctx.fillRect(0, 0, canvas.width, canvas.height / 3);
          ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 4);
          imgElement.src = canvas.toDataURL();
        }
      }

      // Upload réel
      const url = await uploadImage(file);

      // Remplace le canvas par l'image finale
      editor.chain().focus().setImage({ src: url }).run();
    };

    input.click();
  };

  return (
    <div className="flex gap-2 flex-wrap items-center">
      {/* Text Formatting */}
      <div className="flex gap-1">
        <Button
          size="icon-sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editorState?.isBold ? "primary" : "ghost"}
          disabled={!editorState?.canBold}
          title="Bold"
        >
          <TextBIcon size={20} />
        </Button>
        <Button
          size="icon-sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editorState?.isItalic ? "primary" : "ghost"}
          disabled={!editorState?.canItalic}
          title="Italic"
        >
          <TextItalicIcon size={20} />
        </Button>
        <Button
          size="icon-sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={editorState?.isStrike ? "primary" : "ghost"}
          disabled={!editorState?.canStrike}
          title="Strikethrough"
        >
          <TextStrikethroughIcon size={20} />
        </Button>
        <Button
          size="icon-sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          variant={editorState?.isCode ? "primary" : "ghost"}
          disabled={!editorState?.canCode}
          title="Inline Code"
        >
          <CodeIcon size={20} />
        </Button>
      </div>

      <div className="w-px h-6 bg-tertiary/10" />

      {/* Headings */}
      <div className="flex gap-1">
        <Button
          size="icon-sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          variant={editorState?.isHeading1 ? "primary" : "ghost"}
          title="Heading 1"
        >
          <TextHOneIcon size={20} />
        </Button>
        <Button
          size="icon-sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          variant={editorState?.isHeading2 ? "primary" : "ghost"}
          title="Heading 2"
        >
          <TextHTwoIcon size={20} />
        </Button>
        <Button
          size="icon-sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          variant={editorState?.isHeading3 ? "primary" : "ghost"}
          title="Heading 3"
        >
          <TextHThreeIcon size={20} />
        </Button>
        <Button
          size="icon-sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          variant={editorState?.isHeading4 ? "primary" : "ghost"}
          title="Heading 4"
        >
          <TextHFourIcon size={20} />
        </Button>
        <Button
          size="icon-sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          variant={editorState?.isHeading5 ? "primary" : "ghost"}
          title="Heading 5"
        >
          <TextHFiveIcon size={20} />
        </Button>
        <Button
          size="icon-sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          variant={editorState?.isHeading6 ? "primary" : "ghost"}
          title="Heading 6"
        >
          <TextHSixIcon size={20} />
        </Button>
        <Button
          size="icon-sm"
          onClick={() => editor.chain().focus().setParagraph().run()}
          variant={editorState?.isParagraph ? "primary" : "ghost"}
          title="Paragraph"
        >
          <TextAlignLeftIcon size={20} />
        </Button>
      </div>

      <div className="w-px h-6 bg-tertiary/10" />

      {/* Lists & Blocks */}
      <div className="flex gap-1">
        <Button
          size="icon-sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editorState?.isBulletList ? "primary" : "ghost"}
          title="Bullet List"
        >
          <ListBulletsIcon size={20} />
        </Button>
        <Button
          size="icon-sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editorState?.isOrderedList ? "primary" : "ghost"}
          title="Numbered List"
        >
          <ListNumbersIcon size={20} />
        </Button>
        <Button
          size="icon-sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          variant={editorState?.isBlockquote ? "primary" : "ghost"}
          title="Blockquote"
        >
          <QuotesIcon size={20} />
        </Button>
      </div>

      <div className="w-px h-6 bg-tertiary/10" />

      <Button
        size="icon-sm"
        onClick={addImageFromFile}
        variant="ghost"
        title="Insert Image"
      >
        <ImageIcon size={20} />
      </Button>

      <div className="w-px h-6 bg-tertiary/10" />
      {/* Undo/Redo */}
      <div className="flex gap-1">
        <Button
          size="icon-sm"
          onClick={() => editor.chain().focus().undo().run()}
          variant="ghost"
          disabled={!editorState?.canUndo}
          title="Undo"
        >
          <ArrowCounterClockwiseIcon size={20} />
        </Button>
        <Button
          size="icon-sm"
          onClick={() => editor.chain().focus().redo().run()}
          variant="ghost"
          disabled={!editorState?.canRedo}
          title="Redo"
        >
          <ArrowClockwiseIcon size={20} />
        </Button>
      </div>
    </div>
  );
};
export const PostEditor: FunctionComponent<PostEditorProps> = ({
  content,
  title,
  categories,
  reviewers,
  description,
}) => {
  const [title_, setTitle] = useState(title);
  const [description_, setDescription] = useState(description);
  const [readTime, setReadTime] = useState(0);
  const [content_, setContent] = useState(content);
  const editor = useEditor({
    extensions: [StarterKit, Markdown, Image],
    content: content,
    contentType: "markdown",
    // Collage depuis le presse-papier
    editorProps: {
      handlePaste(view, event) {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false;

        for (const item of clipboardData.items) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (!file) return false;

            const placeholderId = `img-${uuidv4()}`;
            editor
              ?.chain()
              .focus()
              .insertContent({
                type: "image",
                attrs: { src: "", alt: "Loading...", id: placeholderId },
              })
              .run();

            const imgElement = document.getElementById(
              placeholderId
            ) as HTMLImageElement;
            if (imgElement) {
              const canvas = document.createElement("canvas");
              canvas.width = 400;
              canvas.height = 200;
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.fillStyle = "#e5e7eb";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#d1d5db";
                ctx.fillRect(0, 0, canvas.width, canvas.height / 3);
                ctx.fillRect(
                  0,
                  canvas.height / 2,
                  canvas.width,
                  canvas.height / 4
                );
                imgElement.src = canvas.toDataURL();
              }
            }

            uploadImage(file).then((url) => {
              editor?.chain().focus().setImage({ src: url }).run();
            });

            return true;
          }
        }

        return false;
      },
    },

    onUpdate: ({ editor }) => {
      const text = editor.getMarkdown();
      const wordCount = text.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);
      setReadTime(readTime);
      setContent(text);
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const slug = useMemo(() => {
    const length = 12;
    const charset = "123456789";
    let code = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      // eslint-disable-next-line react-hooks/purity
      code += charset.charAt(Math.floor(Math.random() * n));
    }
    return title_.replace(/ /g, "-").toLowerCase().concat(`-${code}`);
  }, [title_]);

  const [error, setError] = useState<string | null>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);
  const [coverImage, setCoverImage] = useState("");
  const handleSubmit = async (formData: FormData) => {
    setError(null);
    const response = await createPostAction(formData);
    if (response?.error) {
      setError(response.error);
      return;
    }
  };
  if (!editor) {
    return null;
  }

  console.log(editor);
  return (
    <>
      <Activity mode={saveModalOpen ? "visible" : "hidden"}>
        <div className="fixed z-50 inset-0 bg-tertiary/30 backdrop-blur-xl flex items-center justify-center">
          <div className="p-8 bg-secondary border-tertiary/15 border rounded-3xl max-w-md w-full space-y-6 mx-auto">
            <h2 className="text-3xl leading-normal font-bold">Save post</h2>
            <form className="space-y-6" action={handleSubmit}>
              <input type="hidden" name="slug" value={slug} />
              <input type="hidden" name="content" value={content_} />
              <input type="hidden" name="description" value={description_} />
              <input type="hidden" name="title" value={title_} />
              <input type="hidden" name="read_time" value={readTime} />
              <input type="hidden" name="cover" value={coverImage} />
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  name="category"
                  options={categories.map((c) => ({
                    label: c.name,
                    value: c.id.toString(),
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reviewer">Reviewer</Label>
                <Select
                  name="reviewer"
                  options={reviewers.map((r) => ({
                    label: r.full_name,
                    value: r.id.toString(),
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  name="type"
                  options={[
                    { value: "video", label: "Video post" },
                    {
                      value: "text",
                      label: "Article",
                    },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="video_url">Video URL</Label>
                <Input name="video_url" placeholder="Paste the video URL" />
              </div>
              <div className="space-y-2">
                <Button type="submit" className="w-full">
                  Assign to review
                </Button>
                <Button
                  type="button"
                  onClick={() => setSaveModalOpen(false)}
                  variant="ghost"
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Activity>
      <div className="container h-[calc(100vh-6rem)] mx-auto border-x border-secondary flex flex-col">
        <div className="p-6 py-4 flex items-center justify-between gap-6 border-b border-secondary bg-secondary/30">
          <Menu editor={editor} />
          <div className="flex gap-4">
            <Button size="sm" onClick={() => setSaveModalOpen(true)}>
              Save
            </Button>
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col xl:flex-row gap-6 overflow-auto">
          <div className="flex-1">
            <input
              type="file"
              accept="image/"
              className="hidden"
              id="cover_image"
              ref={coverImageRef}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = await uploadImage(file);
                  setCoverImage(url);
                }
              }}
            />
            <label
              htmlFor="cover_image"
              style={{
                background: `url("${coverImage}") no-repeat center / cover`,
              }}
              className="bg-secondary flex flex-col justify-center items-center gap-6 rounded-3xl aspect-video border border-tertiary/10 border-dashed"
            >
              <ImageIcon size={48} />
              <span>Cover Image</span>
            </label>
            <div className="p-6 space-y-6">
              <input
                type="text"
                value={title_}
                name="title"
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="text-3xl leading-normal font-bold w-full"
              />
              <textarea
                placeholder="Description"
                rows={3}
                value={description_}
                name="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="text-base opacity-70 w-full resize-none leading-normal outline-none border-none"
              />

              <EditorContent
                className="outline-none border-none"
                editor={editor}
              />
              <div className="h-500"></div>
            </div>
          </div>
          <div className="max-w-sm w-full space-y-2">
            <div className="text-3xl leading-normal font-bold">Summary</div>
            <Summary editor={editor} />
          </div>
        </div>
      </div>
    </>
  );
};
