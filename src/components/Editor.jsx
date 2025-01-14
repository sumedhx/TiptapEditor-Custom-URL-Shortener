// src/components/Editor.jsx
import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Highlight } from '../extensions/Highlight';
import { UrlShortener } from '../extensions/UrlShortener';
import { Link } from '@tiptap/extension-link'; // Import Link extension

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Link.configure({
        autolink: true, // Automatically converts URLs into links
      }),
      UrlShortener.configure({
        fallbackApis: ['https://is.gd/create.php?format=json&url='], // Using is.gd API for URL shortening
      }),
    ],
    content: '<p>Hello, I have created a Url shortener extension. Paste any Url or Select below Url and click on Shorten URL Button.</p><a href="https://github.com/sumedhx/">https://github.com/sumedhx/</a>',
  });

  const toggleBold = () => editor.commands.toggleBold();
  const toggleItalic = () => editor.commands.toggleItalic();
  const toggleStrike = () => editor.commands.toggleStrike();
  const toggleHighlight = () => editor.commands.toggleHighlight();
  const undo = () => editor.commands.undo();
  const redo = () => editor.commands.redo();
  const shortenUrl = () => editor.commands.shortenUrl();

  if (!editor) {
    return <p>Loading Editor...</p>;
  }

  return (
    <div className="editor-container">
      <div className="editor-wrapper">
        {/* Toolbar */}
        <div className="toolbar">
          <button
            onClick={toggleBold}
            className={editor.isActive('bold') ? 'active' : ''}
          >
            <strong>Bold</strong>
          </button>
          <button
            onClick={toggleItalic}
            className={editor.isActive('italic') ? 'active' : ''}
          >
            <em>Italic</em>
          </button>
          <button
            onClick={toggleStrike}
            className={editor.isActive('strike') ? 'active' : ''}
          >
            <s>Strike</s>
          </button>
          <button onClick={toggleHighlight}>
            Highlight
          </button>
          <button onClick={shortenUrl}>Shorten URL</button>
          <button onClick={undo}>Undo</button>
          <button onClick={redo}>Redo</button>
        </div>
        {/* Editor */}
        <EditorContent editor={editor} className="tiptap-editor" />
      </div>
      <footer>
        By{' '}
        <a target="new" href="https://github.com/sumedhx/">
          Sumedh
        </a>
      </footer>
    </div>
  );
};

export default Editor;
