'use client';

import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';
import { useEffect, useState } from 'react';

interface ContactInfo {
  name: string;
  email: string;
  company?: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(true);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [chatInitialized, setChatInitialized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize chat after contact form is submitted
  useEffect(() => {
    if (contactInfo && !chatInitialized && !isAnimating) {
      createChat({
        webhookUrl: 'https://n8n.henrybarefoot.com/webhook/bbc7802e-32f2-4aa5-b7e9-e13cda48c638/chat',
        webhookConfig: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Contact-Name': contactInfo.name,
            'X-Contact-Email': contactInfo.email,
            'X-Contact-Company': contactInfo.company || '',
          },
        },
        mode: 'window',
        showWelcomeScreen: true,
        loadPreviousSession: false,
        initialMessages: [
          `Welcome ${contactInfo.name}! 👋`,
          "Thanks for providing your details. I'm Henry's AI assistant and I'm here to help answer any questions about Henry's experience, skills, or projects.",
          "What would you like to know?"
        ],
        i18n: {
          en: {
            title: "Henry's AI Assistant",
            subtitle: `Chat with ${contactInfo.name}`,
            footer: 'Built with ❤️ using n8n',
            getStarted: 'Continue Conversation',
            inputPlaceholder: 'Ask me anything about Henry...',
            closeButtonTooltip: 'Close chat',
          },
        },
      });
      setChatInitialized(true);
    }
  }, [contactInfo, chatInitialized, isAnimating]);

  const handleContactSubmit = async (info: ContactInfo) => {
    setContactInfo(info);
    setIsAnimating(true);
    
    // Start slide animation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setShowContactForm(false);
    setIsAnimating(false);
  };

  const handleChatButtonClick = () => {
    setIsOpen(true);
  };

  const handleCloseWidget = () => {
    setIsOpen(false);
    setShowContactForm(true);
    setContactInfo(null);
    setChatInitialized(false);
    setIsAnimating(false);
  };

  return (
    <>
      {/* Chat Button - Always visible when widget is closed */}
      {!isOpen && (
        <button
          onClick={handleChatButtonClick}
          className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50 group"
          aria-label="Start chat with Henry's AI Assistant"
        >
          <svg
            className="w-6 h-6 transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Contact Form Window - Only shows when opened and before chat */}
      {isOpen && showContactForm && (
        <ContactFormWindow
          onSubmit={handleContactSubmit}
          onClose={handleCloseWidget}
          isAnimating={isAnimating}
        />
      )}
    </>
  );
};

interface ContactFormWindowProps {
  onSubmit: (info: ContactInfo) => void;
  onClose: () => void;
  isAnimating: boolean;
}

const ContactFormWindow = ({ onSubmit, onClose, isAnimating }: ContactFormWindowProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Brief loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim() || undefined
    });
    
    setIsSubmitting(false);
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-500 ease-in-out z-50 ${
        isAnimating ? 'transform translate-x-full opacity-0' : 'transform translate-x-0 opacity-100'
      }`}
      style={{ 
        width: '380px', 
        height: '600px',
        maxHeight: 'calc(100vh - 100px)' 
      }}
    >
      {/* Header - Updated with website colors */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex items-center justify-between pr-8">
          <div>
            <h3 className="text-lg font-semibold">Henry's AI Assistant</h3>
            <p className="text-sm opacity-90">Let's get started!</p>
          </div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-gentle"></div>
        </div>
      </div>

      {/* Form Content - Updated styling */}
      <div className="p-6 h-full flex flex-col bg-gray-50/50">
        <div className="mb-6">
          <h4 className="text-xl font-bold text-gray-900 mb-2">Welcome! 👋</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            I'm here to help answer questions about Henry's experience and skills. 
            Let me know who I'm talking to first!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="space-y-4 flex-1">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company (Optional)
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white"
                placeholder="Your company name"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Starting Chat...
                </span>
              ) : (
                <>
                  Start Conversation
                  <svg className="ml-2 w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Built with ❤️ using n8n
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
