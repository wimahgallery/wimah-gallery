import { Node, mergeAttributes } from "@tiptap/core"

export interface FigureCaptionOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    figureCaption: {
      setFigure: (attributes: { src: string; alt?: string; caption?: string; fileId?: string }) => ReturnType
      setImageFigure: (attributes: { src: string; alt?: string; caption?: string; fileId?: string }) => ReturnType
    }
  }
}

export const FigureCaption = Node.create<FigureCaptionOptions>({
  name: "figure",

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: "block",

  content: "inline*",

  draggable: true,

  isolating: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) => element.querySelector("img")?.getAttribute("src"),
        renderHTML: (attributes) => ({
          src: attributes.src,
        }),
      },
      alt: {
        default: null,
        parseHTML: (element) => element.querySelector("img")?.getAttribute("alt"),
        renderHTML: (attributes) => ({
          alt: attributes.alt,
        }),
      },
      fileId: {
        default: null,
        parseHTML: (element) => element.querySelector("img")?.getAttribute("data-file-id"),
        renderHTML: (attributes) => ({
          "data-file-id": attributes.fileId,
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "figure",
        getAttrs: (element) => {
          const img = (element as HTMLElement).querySelector("img")
          return img ? null : false
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes, node }) {
    const captionContent = node.content.size > 0
      ? `<figcaption class="blog-figure-caption">${node.textContent}</figcaption>`
      : ""

    return [
      "figure",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: "blog-figure",
      }),
      [
        "img",
        mergeAttributes(
          {},
          {
            src: HTMLAttributes.src,
            alt: HTMLAttributes.alt || "",
            "data-file-id": HTMLAttributes.fileId || "",
          }
        ),
      ],
      captionContent,
    ]
  },

  addCommands() {
    return {
      setFigure:
        (attributes) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: attributes.src,
              alt: attributes.alt || "",
              fileId: attributes.fileId || null,
            },
            content: attributes.caption ? [{ type: "text", text: attributes.caption }] : [],
          })
        },
      setImageFigure:
        (attributes) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: attributes.src,
              alt: attributes.alt || "",
              fileId: attributes.fileId || null,
            },
            content: attributes.caption ? [{ type: "text", text: attributes.caption }] : [],
          })
        },
    }
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const figure = document.createElement("figure")
      figure.className = "blog-figure"
      figure.contentEditable = "false"

      const img = document.createElement("img")
      img.src = node.attrs.src as string
      img.alt = (node.attrs.alt as string) || ""
      img.className = "blog-figure-img"
      if (node.attrs.fileId) {
        img.setAttribute("data-file-id", node.attrs.fileId as string)
      }
      figure.appendChild(img)

      const caption = document.createElement("figcaption")
      caption.className = "blog-figure-caption"
      caption.contentEditable = "true"
      caption.textContent = node.textContent || "Add a caption..."
      figure.appendChild(caption)

      caption.addEventListener("focus", () => {
        if (caption.textContent === "Add a caption...") {
          caption.textContent = ""
        }
      })

      caption.addEventListener("blur", () => {
        const pos = getPos()
        if (pos === undefined) return
        const { state } = editor
        const tr = state.tr
        const resolvedPos = tr.doc.resolve(pos)
        const nodeInside = resolvedPos.nodeAfter
        if (nodeInside && nodeInside.type.name === "figure") {
          const captionNode = nodeInside.content.lastChild
          if (captionNode && captionNode.type.name === "text") {
            const captionText = caption.textContent || ""
            const newText = state.schema.text(captionText)
            const startPos = pos + 1 + (nodeInside.content.size - (captionNode?.nodeSize || 0))
            tr.delete(startPos, startPos + (captionNode?.nodeSize || 0))
            if (captionText) {
              tr.insert(startPos, newText)
            }
            editor.view.dispatch(tr)
          }
        }
      })

      return {
        dom: figure,
      }
    }
  },
})
