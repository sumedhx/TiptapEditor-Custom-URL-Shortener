import { Mark, mergeAttributes } from '@tiptap/core';

export const Highlight = Mark.create({
  name: 'highlight',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {};
  },

  parseHTML() {
    return [
      {
        tag: 'mark',
        getAttrs: (element) => {
          if (element.style.backgroundColor === 'yellow') {
            return { color: 'yellow' };
          }
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes(HTMLAttributes, { style: 'background-color: yellow;' }), 0];
  },

  addCommands() {
    return {
      setHighlight: () => ({ commands }) => {
        return commands.setMark(this.name, {});
      },
      toggleHighlight: () => ({ commands }) => {
        return commands.toggleMark(this.name, {});
      },
      unsetHighlight: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-h': () => this.editor.commands.toggleHighlight(),
    };
  },
});
