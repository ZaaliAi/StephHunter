'use client';

import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange, placeholder }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleBoldClick = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      const selectedText = value.substring(selectionStart, selectionEnd);

      const newValue = value.substring(0, selectionStart) +
                     '**' + selectedText + '**' +
                     value.substring(selectionEnd);

      onChange(newValue);

      // Restore selection and focus after updating
      // Need to wait for the DOM to update with the new value
      requestAnimationFrame(() => {
        textarea.selectionStart = selectionStart + 2; // +2 for the added '**'
        textarea.selectionEnd = selectionEnd + 2;
        textarea.focus();
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col">
        {/* Simple toolbar with a Bold button */}
        <div className="mb-2">
          <button
            type="button"
            onClick={handleBoldClick}
            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Bold
          </button>
        </div>
        <textarea
          ref={textareaRef}
          className="w-full p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows={15}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Start writing...'}
        />
      </div>
      <div className="prose dark:prose-invert p-4 border rounded-md overflow-auto max-h-[400px]">
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    </div>
  );
};

export default QuillEditor;