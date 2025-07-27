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
      showWelcomeScreen: false, // We'll use custom welcome
      loadPreviousSession: false,
      initialMessages: [
        "👋 Welcome to Henry's AI Assistant!",
        "Before we start, I'd like to get to know you better. Please share your information in this format:",
        "📝 **Name:** Your Full Name\n📧 **Email:** your.email@example.com\n🏢 **Company:** Your Company (optional)",
        "💡 **Example:**\nName: John Smith\nEmail: john@company.com\nCompany: Tech Solutions Inc",
        "Just copy this format and replace with your details! ⬇️"
      ],
      i18n: {
        en: {
          title: "Henry's AI Assistant",
          subtitle: 'Professional portfolio assistant powered by AI',
          footer: 'Built with ❤️ using n8n',
          getStarted: 'Get Started',
          inputPlaceholder: 'Name: [Your Name] | Email: [Your Email] | Company: [Optional]',
          closeButtonTooltip: 'Close chat',
        },
      },
    });
  }, []);

  return null; // The chat widget is rendered by the n8n library
};

export default ChatWidget;
