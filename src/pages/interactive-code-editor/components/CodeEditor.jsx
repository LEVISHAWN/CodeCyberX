import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CodeEditor = ({ 
  code, 
  onChange, 
  language, 
  onLanguageChange, 
  theme, 
  onThemeChange,
  fontSize,
  onFontSizeChange,
  className = "" 
}) => {
  const editorRef = useRef(null);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(false);

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'sql', label: 'SQL' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'high-contrast', label: 'High Contrast' }
  ];

  const fontSizeOptions = [
    { value: 12, label: '12px' },
    { value: 14, label: '14px' },
    { value: 16, label: '16px' },
    { value: 18, label: '18px' },
    { value: 20, label: '20px' }
  ];

  const handleTextareaChange = (e) => {
    onChange(e?.target?.value);
  };

  const insertTab = (e) => {
    if (e?.key === 'Tab') {
      e?.preventDefault();
      const textarea = e?.target;
      const start = textarea?.selectionStart;
      const end = textarea?.selectionEnd;
      const newValue = code?.substring(0, start) + '  ' + code?.substring(end);
      onChange(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const getLanguageClass = () => {
    switch (language) {
      case 'javascript': return 'language-javascript';
      case 'python': return 'language-python';
      case 'java': return 'language-java';
      case 'cpp': return 'language-cpp';
      case 'html': return 'language-html';
      case 'css': return 'language-css';
      case 'sql': return 'language-sql';
      default: return 'language-javascript';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      {/* Editor Toolbar */}
      <div className="bg-muted border-b border-border p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select
              options={languageOptions}
              value={language}
              onChange={onLanguageChange}
              className="w-32"
            />
            
            <div className="hidden sm:block">
              <Select
                options={themeOptions}
                value={theme}
                onChange={onThemeChange}
                className="w-36"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={lineNumbers ? "default" : "outline"}
              size="sm"
              onClick={() => setLineNumbers(!lineNumbers)}
            >
              <Icon name="Hash" size={16} />
            </Button>
            
            <Button
              variant={wordWrap ? "default" : "outline"}
              size="sm"
              onClick={() => setWordWrap(!wordWrap)}
            >
              <Icon name="WrapText" size={16} />
            </Button>

            <div className="hidden md:block">
              <Select
                options={fontSizeOptions}
                value={fontSize}
                onChange={onFontSizeChange}
                className="w-20"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Editor Content */}
      <div className="relative">
        <div className="flex">
          {/* Line Numbers */}
          {lineNumbers && (
            <div className={`bg-muted border-r border-border p-4 text-right select-none ${
              theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'
            }`} style={{ minWidth: '60px' }}>
              {code?.split('\n')?.map((_, index) => (
                <div key={index} className="leading-6" style={{ fontSize: `${fontSize}px` }}>
                  {index + 1}
                </div>
              ))}
            </div>
          )}

          {/* Code Input Area */}
          <div className="flex-1 relative">
            <textarea
              ref={editorRef}
              value={code}
              onChange={handleTextareaChange}
              onKeyDown={insertTab}
              className={`w-full h-96 p-4 bg-transparent border-none outline-none resize-none font-data leading-6 ${
                theme === 'dark' ?'bg-gray-900 text-gray-100' 
                  : theme === 'high-contrast' ?'bg-black text-white' :'bg-white text-gray-900'
              } ${getLanguageClass()}`}
              style={{ 
                fontSize: `${fontSize}px`,
                whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
                overflowWrap: wordWrap ? 'break-word' : 'normal'
              }}
              placeholder={`// Start coding in ${language}...\n// This editor supports syntax highlighting and auto-indentation`}
              spellCheck={false}
            />

            {/* Syntax Highlighting Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <pre className={`p-4 m-0 font-data leading-6 ${getLanguageClass()}`} 
                   style={{ fontSize: `${fontSize}px` }}>
                <code>{code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Editor Status Bar */}
        <div className="bg-muted border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span>Lines: {code?.split('\n')?.length}</span>
              <span>Characters: {code?.length}</span>
              <span>Language: {language?.toUpperCase()}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={12} className="text-success" />
              <span>Secure Environment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;