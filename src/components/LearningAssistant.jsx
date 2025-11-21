import React, { useState, useRef, useEffect } from 'react';
import Icon from './AppIcon';
import Button from './ui/Button';
import { streamLearningAssistantResponse, getStudySuggestions } from '../services/chatService';

const LearningAssistant = ({ learnerContext = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! I'm your AI learning assistant. I'm here to help you with cybersecurity concepts, programming questions, study strategies, and anything related to your courses. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Quick action suggestions
  const quickActions = [
    {
      id: 'study-help',
      label: 'Get Study Suggestions',
      icon: 'BookOpen',
      action: 'generateStudySuggestions'
    },
    {
      id: 'concept-explain',
      label: 'Explain a Concept',
      icon: 'HelpCircle',
      prompt: 'Can you explain a cybersecurity concept to me?'
    },
    {
      id: 'code-help',
      label: 'Code Help',
      icon: 'Code',
      prompt: 'I need help with my code. Can you assist me?'
    },
    {
      id: 'quiz-prep',
      label: 'Quiz Preparation',
      icon: 'CheckSquare',
      prompt: 'Help me prepare for an upcoming quiz or assignment.'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (messageText = inputValue?.trim()) => {
    if (!messageText || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsStreaming(true);
    setStreamingMessage('');

    try {
      const conversationHistory = messages?.map(msg => ({
        role: msg?.role,
        content: msg?.content
      }));

      let assistantContent = '';
      
      await streamLearningAssistantResponse(
        messageText,
        conversationHistory,
        learnerContext,
        (chunk) => {
          assistantContent += chunk;
          setStreamingMessage(assistantContent);
        }
      );

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setStreamingMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or check your internet connection.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleQuickAction = async (action) => {
    if (action?.action === 'generateStudySuggestions') {
      setIsLoading(true);
      try {
        const suggestions = await getStudySuggestions(learnerContext);
        const suggestionMessage = {
          id: Date.now(),
          role: 'assistant',
          content: `Based on your current progress, here are my study suggestions:\n\n**Priority Topics:**\n${suggestions?.priority_topics?.map(topic => `• ${topic}`)?.join('\n') || 'No specific topics identified'}\n\n**Recommended Actions:**\n${suggestions?.recommended_actions?.map(action => `• ${action}`)?.join('\n') || 'Continue with current studies'}\n\n**Estimated Time:** ${suggestions?.time_estimate || 'Flexible based on your schedule'}\n\n**Difficulty Level:** ${suggestions?.difficulty_level || 'Intermediate'}\n\nWould you like me to elaborate on any of these suggestions?`,
          timestamp: new Date(),
          isStructured: true
        };
        setMessages(prev => [...prev, suggestionMessage]);
      } catch (error) {
        console.error('Error generating study suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    } else if (action?.prompt) {
      await handleSendMessage(action?.prompt);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleAssistant}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
            isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'
          }`}
        >
          {isOpen ? (
            <Icon name="X" size={24} color="white" />
          ) : (
            <Icon name="MessageCircle" size={24} color="white" />
          )}
        </Button>
        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </div>
      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-card border border-border rounded-lg shadow-2xl z-40 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border rounded-t-lg bg-primary text-primary-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Icon name="Bot" size={16} color="white" />
              </div>
              <div>
                <h3 className="font-semibold">AI Learning Assistant</h3>
                <p className="text-xs opacity-90">Ready to help you learn</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAssistant}
              className="text-primary-foreground hover:bg-white hover:bg-opacity-20"
            >
              <Icon name="Minimize2" size={16} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    message?.role === 'user' ?'bg-primary text-primary-foreground'
                      : message?.isError
                      ? 'bg-red-100 text-red-800 border border-red-200' :'bg-muted text-muted-foreground'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message?.content}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {message?.timestamp?.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Streaming Message */}
            {isStreaming && streamingMessage && (
              <div className="flex justify-start">
                <div className="max-w-[85%] p-3 rounded-lg bg-muted text-muted-foreground">
                  <div className="whitespace-pre-wrap text-sm">{streamingMessage}</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse delay-75" />
                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse delay-150" />
                  </div>
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && !isStreaming && (
              <div className="flex justify-start">
                <div className="max-w-[85%] p-3 rounded-lg bg-muted text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages?.length === 1 && (
            <div className="p-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Quick actions to get started:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions?.map((action) => (
                  <Button
                    key={action?.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action)}
                    className="text-xs h-8 justify-start"
                    disabled={isLoading}
                  >
                    <Icon name={action?.icon} size={12} className="mr-1" />
                    {action?.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e?.target?.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about cybersecurity..."
                className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue?.trim() || isLoading}
                size="sm"
                className="px-3"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LearningAssistant;