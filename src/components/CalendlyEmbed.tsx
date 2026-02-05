'use client';

import { InlineWidget } from 'react-calendly';
import { motion } from 'framer-motion';

interface CalendlyEmbedProps {
  url: string;
}

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="calendly-embed-container rounded-lg overflow-hidden shadow-lg">
        <InlineWidget
          url={url}
          styles={{
            height: '700px',
            minWidth: '320px',
          }}
        />
      </div>
    </motion.div>
  );
}
