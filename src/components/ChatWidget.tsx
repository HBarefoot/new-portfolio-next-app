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
