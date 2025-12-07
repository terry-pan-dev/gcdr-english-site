import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

interface Props {
  content: string;
  onChange: (content: string) => void;
}

export function MDXEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] p-4",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="h-full flex flex-col border rounded-lg" style={{ borderColor: "#c9a050" }}>
      <div className="p-2 border-b flex gap-2 flex-wrap" style={{ borderColor: "#c9a050", backgroundColor: "#f5f5f5" }}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("bold") ? "bg-gray-300" : "bg-white"
          }`}
          style={{ border: "1px solid #c9a050" }}
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("italic") ? "bg-gray-300" : "bg-white"
          }`}
          style={{ border: "1px solid #c9a050" }}
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : "bg-white"
          }`}
          style={{ border: "1px solid #c9a050" }}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : "bg-white"
          }`}
          style={{ border: "1px solid #c9a050" }}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : "bg-white"
          }`}
          style={{ border: "1px solid #c9a050" }}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("bulletList") ? "bg-gray-300" : "bg-white"
          }`}
          style={{ border: "1px solid #c9a050" }}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("orderedList") ? "bg-gray-300" : "bg-white"
          }`}
          style={{ border: "1px solid #c9a050" }}
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("blockquote") ? "bg-gray-300" : "bg-white"
          }`}
          style={{ border: "1px solid #c9a050" }}
        >
          "
        </button>
        <button
          onClick={() => {
            const url = window.prompt("Enter image URL:");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="px-3 py-1 rounded text-sm bg-white"
          style={{ border: "1px solid #c9a050" }}
        >
          Image
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

