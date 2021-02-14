import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Editor, Node, Transforms } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'

export const RichText = (): JSX.Element => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [{ text: 'An opening paragraph...' }],
    },
    {
      type: 'quote',
      children: [{ text: 'A wise quote.' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'A closing paragraph!' }],
    },
  ])
  const renderElement = useCallback(({ attributes, children, element }) => {
    switch (element.type) {
      case 'bold':
        return (
          <strong className=" font-medium" {...attributes}>
            {children}
          </strong>
        )
      case 'link':
        return (
          <a
            {...attributes}
            className="underline text-blue-800"
            href={element.url}
          >
            {children}
          </a>
        )
      default:
        return <p {...attributes}>{children}</p>
    }
  }, [])
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <button
        onMouseDown={(e) => {
          e.preventDefault()
          Transforms.setNodes(
            editor,
            { type: 'link', url: 'http://example.com' },
            { match: (n) => Editor.isBlock(editor, n) }
          )
        }}
      >
        link
      </button>

      <button
        onMouseDown={(e) => {
          e.preventDefault()
          Transforms.setNodes(
            editor,
            { type: 'bold' },
            { match: (n) => Editor.isBlock(editor, n) }
          )
        }}
      >
        bold
      </button>
      <Editable className="bg-gray-300 h-28" renderElement={renderElement} />
    </Slate>
  )
}
