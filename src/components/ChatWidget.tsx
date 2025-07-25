'use client';

import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';
import { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    createChat({
      webhookUrl: 'https://n8n.henrybarefoot.com/webhook/bbc7802e-32f2-4aa5-b7e9-e13cda48c638/chat',
      webhookConfig: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      mode: 'window',
      showWelcomeScreen: true,
      loadPreviousSession: false,
      initialMessages: [
        "Hi there! 👋",
        "I'm Henry's AI assistant. How can I help you today?"
      ],
      // Custom response processing to handle Telegram bot format
      responseMapping: {
        text: (response: any) => {
          // Handle nested Telegram bot response format
          if (response?.result?.text) {
            return response.result.text;
          }
          // Handle direct text response
          if (typeof response === 'string') {
            return response;
          }
          // Handle other common formats
          if (response?.text) {
            return response.text;
          }
          if (response?.message) {
            return response.message;
          }
          // Fallback
          return 'Thanks for your message! Henry will get back to you soon.';
        }
      },
      i18n: {
        en: {
          title: "Henry's AI Assistant",
          subtitle: 'Powered by n8n automation. Ask me anything!',
          footer: 'Built with ❤️ using n8n',
          getStarted: 'Start Conversation',
          inputPlaceholder: 'Ask me anything about Henry...',
          closeButtonTooltip: 'Close chat',
        },
      },
    });
  }, []);

  return null; // The chat widget is rendered by the n8n library
};

export default ChatWidget;
