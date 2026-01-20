'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Import chat-specific CSS (loaded only when this component mounts)
import './chat-widget.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Use Next.js API route as proxy to avoid CORS issues
  const WEBHOOK_URL = '/api/chat';

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize with welcome messages
  useEffect(() => {
    if (isMounted && messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: "👋 Welcome to Henry's AI Assistant! I'm a self-hosted model running locally on Henry's infrastructure. I'm here to answer questions about his experience, skills, and projects. What would you like to know?",
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isMounted, messages.length]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedValue,
          sessionId: getSessionId(),
          timestamp: new Date().toISOString(),
        }),
      });

      console.log('Webhook response status:', response.status);

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Webhook response data:', data);

      // Handle different n8n response formats
      let botResponse: string;

      if (typeof data === 'string') {
        // Direct string response
        botResponse = data;
      } else if (data.output) {
        // Standard output field
        botResponse = typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
      } else if (data.response) {
        // Alternative response field
        botResponse = typeof data.response === 'string' ? data.response : JSON.stringify(data.response);
      } else if (data.message) {
        // Message field
        botResponse = typeof data.message === 'string' ? data.message : JSON.stringify(data.message);
      } else if (data.text) {
        // Text field
        botResponse = typeof data.text === 'string' ? data.text : JSON.stringify(data.text);
      } else {
        // Fallback for unexpected formats
        botResponse = "I'm sorry, I couldn't process that request. Please try again.";
      }

      setIsTyping(false);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate or retrieve session ID
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('chat-session-id');
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('chat-session-id', sessionId);
    }
    return sessionId;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Don't render until mounted on client to avoid hydration errors
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-4 bg-primary rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group ring-4 ring-primary/20 ${isOpen ? 'max-sm:hidden' : ''
          }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse border-2 border-background shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 right-0 left-0 z-40 w-full h-[100dvh] pt-16 sm:pt-0 sm:bottom-24 sm:right-6 sm:left-auto sm:w-[400px] sm:h-[600px] sm:max-h-[calc(100vh-200px)] sm:rounded-2xl bg-white dark:bg-gray-900 shadow-2xl flex flex-col overflow-hidden border-t border-gray-200 dark:border-gray-800 sm:border sm:border-gray-200 sm:dark:border-gray-800"
          >
            {/* Chat Header */}
            <div className="bg-primary p-3 sm:p-4 text-primary-foreground flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg">Henry&apos;s AI Assistant</h3>
                  <p className="text-xs text-white/90 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                    Online - Ready to help
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-2 p-2 hover:bg-white/10 rounded-lg transition-colors sm:hidden"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50 dark:bg-gray-950 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent min-h-0"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[90%] rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 ${message.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm shadow-sm border border-gray-200 dark:border-gray-700'
                      }`}
                  >
                    {message.sender === 'bot' ? (
                      <div className="text-sm prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-headings:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-pre:my-2 prose-pre:max-w-full prose-pre:overflow-x-auto prose-code:break-words prose-pre:text-xs">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                    )}
                    <p
                      className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                        }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex gap-1">
                      <motion.span
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ translateY: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        style={{ willChange: 'transform' }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ translateY: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        style={{ willChange: 'transform' }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ translateY: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        style={{ willChange: 'transform' }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isLoading && inputValue.trim()) {
                    sendMessage();
                  }
                }}
                className="flex gap-2 items-end"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  autoComplete="off"
                  className="flex-1 px-3 py-3 sm:px-4 sm:py-2.5 text-base bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="p-3 sm:p-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group flex-shrink-0"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center hidden sm:block">
                Powered by AI • Press Enter to send
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
