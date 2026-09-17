"use client"

import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import { FigureCaption } from "./FigureCaption"
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Link as LinkIcon,
  List,
  ListOrdered,
  Code,
  Quote,
  Undo,
  Redo,
  X,
  Upload,
  Minus,
} from "lucide-react"
import { useCallback, useRef, useState, useEffect } from "react"

interface TiptapEditorProps {
  content: string
  onChange: (value: string) => void
  placeholder?: string
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  children,
  title,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
  title?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
        active
          ? "bg-[#7C8472] text-white"
          : "text-[#8D8A82] hover:bg-[#F5F3EE] hover:text-[#54524D]"
      } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="mx-1 h-5 w-px bg-[rgba(84,82,77,0.12)]" />
}

async function uploadImageToServer(file: File): Promise<{ url: string; fileId: string }> {
  const formData = new FormData()
  formData.append("file", file)
  const res = await fetch("/api/blogs/upload", { method: "POST", body: formData })
  if (!res.ok) throw new Error("Upload failed")
  const data = await res.json()
  return { url: data.url, fileId: data.fileId }
}

function ImageUploadButton({ editor }: { editor: Editor }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB")
      return
    }

    setUploading(true)
    try {
      const { url, fileId } = await uploadImageToServer(file)
      editor.chain().focus().setImageFigure({ src: url, alt: file.name, fileId }).run()
    } catch {
      alert("Failed to upload image")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <ToolbarButton
        onClick={() => fileInputRef.current?.click()}
        title="Upload image"
      >
        {uploading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#8D8A82] border-t-transparent" />
        ) : (
          <ImageIcon className="h-4 w-4" />
        )}
      </ToolbarButton>
    </>
  )
}

async function handleImageFile(
  file: File,
  editor: Editor,
  setUploading: (v: boolean) => void
) {
  if (file.size > 5 * 1024 * 1024) {
    alert("Image must be less than 5MB")
    return
  }
  setUploading(true)
  try {
    const { url, fileId } = await uploadImageToServer(file)
    editor.chain().focus().setImageFigure({ src: url, alt: file.name, fileId }).run()
  } catch {
    alert("Failed to upload image")
  } finally {
    setUploading(false)
  }
}

export default function TiptapEditor({
  content,
  onChange,
  placeholder = "Write something amazing...",
}: TiptapEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const editorRef = useRef<Editor | null>(null)

  const editor = useEditor({
    immediatelyRender: true,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({ inline: false, allowBase64: true }),
      FigureCaption.configure({}),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-[#7C8472] underline" } }),
      Placeholder.configure({ placeholder }),
      Underline,
    ],
    content: content ? JSON.parse(content) : "",
    onUpdate: ({ editor }) => {
      onChange(JSON.stringify(editor.getJSON()))
    },
    editorProps: {
      attributes: {
        class: "tiptap-editor-content min-h-[300px] px-4 py-3 focus:outline-none",
      },
      handleDrop: (_view, event) => {
        const files = event.dataTransfer?.files
        if (!files?.length) return false

        const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"))
        if (!imageFiles.length) return false

        event.preventDefault()
        const ed = editorRef.current
        if (!ed) return false

        imageFiles.forEach((file) => handleImageFile(file, ed, setUploading))
        return true
      },
      handlePaste: (_view, event) => {
        const files = event.clipboardData?.files
        if (!files?.length) return false

        const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"))
        if (!imageFiles.length) return false

        event.preventDefault()
        const ed = editorRef.current
        if (!ed) return false

        imageFiles.forEach((file) => handleImageFile(file, ed, setUploading))
        return true
      },
    },
  })

  useEffect(() => {
    editorRef.current = editor
  }, [editor])

  const setLink = useCallback(() => {
    if (!editor) return
    if (linkUrl) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
    }
    setShowLinkInput(false)
    setLinkUrl("")
  }, [editor, linkUrl])

  useEffect(() => {
    function handleDragOver(e: DragEvent) {
      if (e.dataTransfer?.types.includes("Files")) {
        setIsDragging(true)
      }
    }
    function handleDragLeave() {
      setIsDragging(false)
    }
    function handleDrop() {
      setIsDragging(false)
    }

    window.addEventListener("dragover", handleDragOver)
    window.addEventListener("dragleave", handleDragLeave)
    window.addEventListener("drop", handleDrop)
    return () => {
      window.removeEventListener("dragover", handleDragOver)
      window.removeEventListener("dragleave", handleDragLeave)
      window.removeEventListener("drop", handleDrop)
    }
  }, [])

  if (!editor) {
    return (
      <div className="rounded-lg border border-[rgba(84,82,77,0.12)] bg-white p-4">
        <div className="h-[300px] animate-pulse rounded bg-[#F5F3EE]" />
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-[rgba(84,82,77,0.12)] bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-[rgba(84,82,77,0.12)] bg-[#FAFAF8] px-2 py-1.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet list"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered list"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="Code block"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Divider"
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ImageUploadButton editor={editor} />
        <ToolbarButton
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run()
            } else {
              setShowLinkInput(true)
            }
          }}
          active={editor.isActive("link")}
          title="Link"
        >
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Link input */}
      {showLinkInput && (
        <div className="flex items-center gap-2 border-b border-[rgba(84,82,77,0.12)] bg-[#FAFAF8] px-3 py-2">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 rounded-md border border-[rgba(84,82,77,0.12)] bg-white px-2 py-1 text-sm text-[#54524D] focus:border-[#7C8472] focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                setLink()
              }
            }}
            autoFocus
          />
          <button
            type="button"
            onClick={setLink}
            className="rounded-md bg-[#7C8472] px-3 py-1 text-xs font-medium text-white hover:bg-[#5F6558]"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() => {
              setShowLinkInput(false)
              setLinkUrl("")
            }}
            className="rounded-md px-2 py-1 text-xs text-[#8D8A82] hover:text-[#54524D]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Drag overlay */}
      {isDragging && (
        <div className="flex items-center justify-center border-2 border-dashed border-[#7C8472] bg-[#7C8472]/5 m-2 rounded-lg py-12">
          <div className="text-center">
            <Upload className="h-8 w-8 mx-auto text-[#7C8472] mb-2" />
            <p className="text-sm text-[#7C8472] font-medium">Drop image here</p>
          </div>
        </div>
      )}

      {/* Upload indicator */}
      {uploading && !isDragging && (
        <div className="flex items-center gap-2 bg-[#7C8472]/5 border-b border-[#7C8472]/20 px-3 py-2">
          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#7C8472] border-t-transparent" />
          <span className="text-xs text-[#7C8472]">Uploading image...</span>
        </div>
      )}

      {/* Editor */}
      <EditorContent editor={editor} className="tiptap-editor" />
    </div>
  )
}
