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
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [chatInitialized, setChatInitialized] = useState(false);

  // Initialize chat only after contact form is submitted
  useEffect(() => {
    if (contactInfo && !chatInitialized) {
      createChat({
        webhookUrl: 'https://n8n.henrybarefoot.com/webhook/bbc7802e-32f2-4aa5-b7e9-e13cda48c638/chat',
        webhookConfig: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Pass contact info in headers for n8n to access
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
  }, [contactInfo, chatInitialized]);

  const handleContactSubmit = (info: ContactInfo) => {
    setContactInfo(info);
    setShowContactForm(false);
  };

  return (
    <>
      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactFormModal
          onSubmit={handleContactSubmit}
          onClose={() => setShowContactForm(false)}
        />
      )}

      {/* Custom Chat Button - only show if chat not initialized */}
      {!chatInitialized && (
        <button
          onClick={() => setShowContactForm(true)}
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
    </>
  );
};

interface ContactFormModalProps {
  onSubmit: (info: ContactInfo) => void;
  onClose: () => void;
}

const ContactFormModal = ({ onSubmit, onClose }: ContactFormModalProps) => {
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
    
    // Simulate brief loading for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim() || undefined
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Let's get started!</h2>
              <p className="text-gray-600 mt-1">Start a conversation with Henry's AI assistant</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Your company name"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Starting Chat...
                  </span>
                ) : (
                  'Start Conversation'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Your information will be used to personalize your chat experience. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
