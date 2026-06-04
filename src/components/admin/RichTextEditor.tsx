import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Node as TiptapNode, mergeAttributes } from "@tiptap/core";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  MessageSquareQuote,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const PullQuote = TiptapNode.create({
  name: "pullQuote",
  group: "block",
  content: "inline*",
  defining: true,

  parseHTML() {
    return [{ tag: 'blockquote[data-type="pull-quote"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "blockquote",
      mergeAttributes(HTMLAttributes, { "data-type": "pull-quote" }),
      0,
    ];
  },
});

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const ToolbarButton = ({
  onClick,
  isActive,
  children,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
}) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    className={`h-8 w-8 p-0 ${isActive ? "bg-accent text-accent-foreground" : ""}`}
    onClick={onClick}
    title={title}
  >
    {children}
  </Button>
);

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: {},
        bulletList: {},
        orderedList: {},
      }),
      Underline,
      PullQuote,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content]);

  if (!editor) return null;

  const togglePullQuote = () => {
    if (editor.isActive("pullQuote")) {
      editor.chain().focus().lift("pullQuote").run();
    } else {
      editor.chain().focus().setNode("pullQuote").run();
    }
  };

  return (
    <div className="border border-input rounded-md overflow-hidden">
      <div className="flex flex-wrap items-center gap-0.5 p-1.5 border-b border-input bg-muted/30">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-border mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-border mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={togglePullQuote}
          isActive={editor.isActive("pullQuote")}
          title="Pull Quote"
        >
          <MessageSquareQuote className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-border mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>
      </div>

      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-3 min-h-[250px] focus-within:outline-none [&_.tiptap]:outline-none [&_.tiptap]:min-h-[230px] [&_blockquote[data-type='pull-quote']]:border-r-4 [&_blockquote[data-type='pull-quote']]:border-primary [&_blockquote[data-type='pull-quote']]:pr-4 [&_blockquote[data-type='pull-quote']]:italic [&_blockquote[data-type='pull-quote']]:text-lg [&_blockquote[data-type='pull-quote']]:text-primary/80 [&_blockquote[data-type='pull-quote']]:my-6 [&_blockquote[data-type='pull-quote']]:bg-primary/5 [&_blockquote[data-type='pull-quote']]:py-3 [&_blockquote[data-type='pull-quote']]:rounded-sm"
      />
    </div>
  );
};

export default RichTextEditor;
