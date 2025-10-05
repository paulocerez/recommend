import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';

interface TheoryBlocksProps {
  articlePath: string;
  className?: string;
}

export function TheoryBlocks({ articlePath, className = '' }: TheoryBlocksProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(articlePath)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load article: ${res.status}`);
        }
        return res.text();
      })
      .then(setContent)
      .catch(err => {
        console.error('Error loading article:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [articlePath]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <h3 className="text-red-800 font-medium">Error Loading Article</h3>
        <p className="text-red-600 mt-1">{error}</p>
        <p className="text-red-500 text-sm mt-2">
          Make sure the file exists at: {articlePath}
        </p>
      </div>
    );
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-gray-700 mb-3 mt-4">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-gray-600 leading-relaxed mb-4">
              {children}
            </p>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
