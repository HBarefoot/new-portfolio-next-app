'use client';

import { motion } from 'framer-motion';
import { LandingPageServicesSection } from '@/types/strapi';
import { Globe, Cpu, Layout, MessageSquare, Wrench, Sparkles } from 'lucide-react';

interface Props {
  section: LandingPageServicesSection;
  calendlyUrl?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  globe: <Globe className="w-8 h-8" />,
  cpu: <Cpu className="w-8 h-8" />,
  layout: <Layout className="w-8 h-8" />,
  'message-square': <MessageSquare className="w-8 h-8" />,
  wrench: <Wrench className="w-8 h-8" />,
  sparkles: <Sparkles className="w-8 h-8" />,
};

export default function LPServicesSection({ section, calendlyUrl }: Props) {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {section.sectionTitle || 'Services'}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6" />
          {section.sectionSubtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {section.sectionSubtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {section.services.map((service, idx) => (
            <motion.div
              key={service.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                service.highlighted
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl'
                  : 'bg-gray-50 dark:bg-gray-800 hover:shadow-lg'
              }`}
            >
              {service.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`mb-4 ${service.highlighted ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}>
                {service.icon && iconMap[service.icon] ? iconMap[service.icon] : <Sparkles className="w-8 h-8" />}
              </div>

              {/* Title */}
              <h3 className={`text-xl font-bold mb-3 ${
                service.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
              }`}>
                {service.title}
              </h3>

              {/* Description */}
              {service.description && (
                <p className={`text-sm mb-4 ${
                  service.highlighted ? 'text-blue-100' : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {service.description}
                </p>
              )}

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fidx) => (
                    <li 
                      key={fidx}
                      className={`text-sm flex items-center gap-2 ${
                        service.highlighted ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        service.highlighted ? 'bg-blue-200' : 'bg-blue-500'
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {/* Price */}
              {service.price && (
                <div className={`mt-auto pt-4 border-t ${
                  service.highlighted ? 'border-blue-400/30' : 'border-gray-200 dark:border-gray-700'
                }`}>
                  <p className={`text-lg font-bold ${
                    service.highlighted ? 'text-white' : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    {service.price}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {calendlyUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <a
              href={calendlyUrl}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
            >
              Schedule a Consultation
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
