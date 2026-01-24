'use client';

import { motion } from 'framer-motion';
import { Code, Users, Globe, Award } from 'lucide-react';
import type { StrapiAbout } from '@/types/strapi';

interface AboutSectionProps {
  initialData?: StrapiAbout | null;
  locale?: string;
}

const AboutSection = ({ initialData, locale = 'en' }: AboutSectionProps) => {
  // Use server-provided data directly - no client-side fetching needed
  const aboutData = initialData;
  const loading = false; // Data comes from server, no loading state needed

  // Fallback highlights
  const defaultHighlights = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "8+ Years Experience",
      description: "Building responsive websites and web applications"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Leadership",
      description: "Proven ability to lead teams and manage workflows"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Bilingual",
      description: "Fluent in English and Spanish"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Full-Stack",
      description: "Front-end expertise with back-end integration skills"
    }
  ];

  const highlights = aboutData?.highlights?.length ? aboutData.highlights.map((h: any, index: number) => ({
    icon: [<Code className="w-8 h-8" />, <Users className="w-8 h-8" />, <Globe className="w-8 h-8" />, <Award className="w-8 h-8" />][index % 4],
    title: h.title,
    description: h.description
  })) : defaultHighlights;

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {loading ? (
              <div className="space-y-4">
                <div className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded h-6 w-full"></div>
                <div className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded h-6 w-11/12"></div>
                <div className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded h-6 w-full"></div>
                <div className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded h-6 w-10/12"></div>
              </div>
            ) : (
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: aboutData?.bio || `
                  <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    Web Developer with 8+ years of experience building responsive websites and web applications. 
                    Proficient in JavaScript, PHP, React, and WordPress, with strong UI/UX sensibilities and 
                    back-end integration expertise.
                  </p>
                  
                  <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    Proven ability to lead teams, manage workflows, and deliver results in fast-paced environments. 
                    I specialize in creating modern, scalable solutions that bridge the gap between design and functionality.
                  </p>
                  
                  <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    Fluent in English and Spanish, I bring both technical expertise and cross-cultural communication 
                    skills to every project. My passion lies in solving complex problems through clean, efficient code 
                    and innovative thinking.
                  </p>
                ` }}
              />
            )}

            <div className="flex flex-wrap gap-4 mt-8">
              {loading ? (
                <>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full h-8 w-32"></div>
                  ))}
                </>
              ) : aboutData?.tags?.length ? (
                aboutData.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <>
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                    JavaScript Expert
                  </span>
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                    React Specialist
                  </span>
                  <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                    PHP Developer
                  </span>
                  <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm font-medium">
                    WordPress Expert
                  </span>
                  <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm font-medium">
                    Team Lead
                  </span>
                </>
              )}
            </div>
          </motion.div>

          {/* Right Column - Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow duration-300"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {loading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded h-10 w-20 mx-auto mb-2"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded h-4 w-32 mx-auto"></div>
                </div>
              ))}
            </>
          ) : aboutData?.stats?.length ? (
            aboutData.stats.map((stat: any, index: number) => (
              <div key={index}>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))
          ) : (
            <>
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">8+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Technologies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Languages</div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
