import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotesSection = ({
  lessonId = "sql-injection-lesson",
  onNotesChange,
  className = ""
}) => {
  const [notes, setNotes] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  // Load saved notes on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`lesson-notes-${lessonId}`);
    const savedBookmarks = localStorage.getItem(`lesson-bookmarks-${lessonId}`);
    
    if (savedNotes) {
      setNotes(savedNotes);
    }
    
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, [lessonId]);

  // Auto-save notes with debouncing
  useEffect(() => {
    if (saveTimeoutRef?.current) {
      clearTimeout(saveTimeoutRef?.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      if (notes?.trim()) {
        saveNotes();
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef?.current) {
        clearTimeout(saveTimeoutRef?.current);
      }
    };
  }, [notes]);

  const saveNotes = async () => {
    setIsSaving(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    localStorage.setItem(`lesson-notes-${lessonId}`, notes);
    localStorage.setItem(`lesson-bookmarks-${lessonId}`, JSON.stringify(bookmarks));
    
    setLastSaved(new Date());
    setIsSaving(false);
    onNotesChange?.(notes);
  };

  const handleNotesChange = (e) => {
    setNotes(e?.target?.value);
  };

  const addBookmark = () => {
    const timestamp = new Date();
    const newBookmark = {
      id: Date.now(),
      text: `Bookmark ${bookmarks?.length + 1}`,
      timestamp,
      section: "Current Section",
      notes: ""
    };
    
    setBookmarks([...bookmarks, newBookmark]);
  };

  const removeBookmark = (bookmarkId) => {
    setBookmarks(bookmarks?.filter(b => b?.id !== bookmarkId));
  };

  const updateBookmark = (bookmarkId, updates) => {
    setBookmarks(bookmarks?.map(b => 
      b?.id === bookmarkId ? { ...b, ...updates } : b
    ));
  };

  const insertTemplate = (template) => {
    const textarea = textareaRef?.current;
    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const newText = notes?.substring(0, start) + template + notes?.substring(end);
    
    setNotes(newText);
    
    // Focus and set cursor position after template
    setTimeout(() => {
      textarea?.focus();
      textarea?.setSelectionRange(start + template?.length, start + template?.length);
    }, 0);
  };

  const templates = [
    { name: "Key Point", text: "🔑 Key Point: " },
    { name: "Question", text: "❓ Question: " },
    { name: "Important", text: "⚠️ Important: " },
    { name: "Code Example", text: "💻 Code Example:\n```\n\n```" },
    { name: "Summary", text: "📝 Summary: " }
  ];

  const formatTimestamp = (date) => {
    return date?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden shadow-subtle ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">My Notes</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            {isSaving && (
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Loader2" size={14} className="animate-spin" />
                <span className="text-xs">Saving...</span>
              </div>
            )}
            
            {lastSaved && !isSaving && (
              <span className="text-xs text-muted-foreground">
                Saved {formatTimestamp(lastSaved)}
              </span>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            />
          </div>
        </div>
      </div>
      {/* Notes Content */}
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-48'} overflow-hidden`}>
        {/* Quick Templates */}
        <div className="p-3 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={14} className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Quick Templates</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {templates?.map((template) => (
              <Button
                key={template?.name}
                variant="ghost"
                size="xs"
                onClick={() => insertTemplate(template?.text)}
                className="text-xs"
              >
                {template?.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Notes Textarea */}
        <div className="p-4">
          <textarea
            ref={textareaRef}
            value={notes}
            onChange={handleNotesChange}
            placeholder="Take notes about this lesson...\n\nTip: Use the quick templates above to structure your notes!"
            className="w-full h-32 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
          />
        </div>

        {/* Bookmarks Section */}
        {isExpanded && (
          <div className="border-t border-border">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Bookmark" size={16} className="text-primary" />
                  <h4 className="text-sm font-medium text-foreground">Bookmarks</h4>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addBookmark}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Bookmark
                </Button>
              </div>

              {bookmarks?.length === 0 ? (
                <div className="text-center py-4">
                  <Icon name="Bookmark" size={24} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No bookmarks yet</p>
                  <p className="text-xs text-muted-foreground">Add bookmarks to mark important sections</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {bookmarks?.map((bookmark) => (
                    <div key={bookmark?.id} className="p-3 border border-border rounded-md bg-muted/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            value={bookmark?.text}
                            onChange={(e) => updateBookmark(bookmark?.id, { text: e?.target?.value })}
                            className="text-sm font-medium text-foreground bg-transparent border-none p-0 focus:outline-none w-full"
                          />
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-muted-foreground">{bookmark?.section}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(bookmark?.timestamp)}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBookmark(bookmark?.id)}
                          className="text-muted-foreground hover:text-error"
                        >
                          <Icon name="X" size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Footer Actions */}
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span>{notes?.length} characters</span>
            <span>{notes?.split('\n')?.length} lines</span>
            <span>{bookmarks?.length} bookmarks</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigator.clipboard?.writeText(notes);
                // Could add toast notification here
              }}
              iconName="Copy"
              iconPosition="left"
            >
              Copy
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const blob = new Blob([notes], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `lesson-notes-${lessonId}.txt`;
                a?.click();
                URL.revokeObjectURL(url);
              }}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesSection;