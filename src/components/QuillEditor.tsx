
'use client'; // This component will only be used on the client

import ReactMarkdown from 'react-markdown';

// Props type for our editor
interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange, placeholder }) => {

/*  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color', 'background', 'font', 'align'
  ];

*/

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <textarea
        className="w-full p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        rows={15}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'Start writing...'}
      />
      <div className="prose dark:prose-invert p-4 border rounded-md overflow-auto max-h-[400px]">
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    </div>
  );
};

export default QuillEditor;