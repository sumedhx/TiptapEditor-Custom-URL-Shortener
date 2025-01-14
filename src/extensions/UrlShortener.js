// src/extensions/UrlShortener.js
import { Extension } from '@tiptap/core';
import axios from 'axios';

export const UrlShortener = Extension.create({
  name: 'urlShortener',

  addOptions() {
    return {
      fallbackApis: ['https://is.gd/create.php?format=json&url='], // Using is.gd API 
    };
  },

  addCommands() {
    return {
      shortenUrl: () => async ({ editor }) => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to, ' ');

        if (!selectedText.startsWith('http')) {
          alert('Please select a valid URL.');
          return false;
        }

        try {
          let shortUrl = '';
          // Attempt using the fallback API
          const response = await axios.get(`${this.options.fallbackApis[0]}${selectedText}`);
          shortUrl = response.data.shorturl || response.data.result_url;

          if (shortUrl) {
            // Ensure the selected URL is replaced with the shortened one
            editor.commands.deleteRange({ from, to });  // Delete selected URL
            // Insert shortened link 
            editor.commands.insertContent(`<a href="${shortUrl}" target="_blank" class="shortened-link style="color: blue; text-decoration: none;">${shortUrl}</a>`); 
            return true;
          } else {
            alert('Failed to shorten URL.');
            return false;
          }
        } catch (error) {
          console.error('Error shortening URL:', error);
          alert('Error shortening URL.');
          return false;
        }
      },
    };
  },
});
