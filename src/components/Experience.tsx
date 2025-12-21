'use client';

import { motion } from 'framer-motion';
import { Building, Calendar, MapPin } from 'lucide-react';
import { Experience } from '@/types';

const ExperienceSection = () => {
  const experiences: Experience[] = [
    {
      company: "ALLIED YACHT",
      period: "2025 - Present",
      responsibilities: [
        "Led end-to-end architecture and development of an AI-powered yacht transport platform, introducing instant pricing, automated scheduling, and digital booking workflows that reduced processing time from days to minutes",
        "Architected complex pricing and routing engines across 15+ international ports with dynamic weight, insurance, and compliance logic, enabling scalable global operations",
        "Established modern development standards using Next.js, TypeScript, and Tailwind CSS, delivering a robust and maintainable codebase"
      ]
    },
    {
      company: "ADDIGY",
      period: "2023 - 2025",
      responsibilities: [
        "Developed comprehensive reports using Looker Studio and BigQuery",
        "Enhanced user interfaces for better UX",
        "Built WordPress features including custom plugins",
        "Created responsive landing pages and campaign templates",
        "Integrated third-party APIs and tools",
        "Ensured cross-browser compatibility and mobile responsiveness"
      ]
    },
    {
      company: "VITAL PHARMACEUTICALS",
      period: "2020 - 2023",
      responsibilities: [
        "Led development team and managed project workflows",
        "Built landing pages using PHP, Node.js, WordPress, JavaScript, React",
        "Integrated third-party platforms with best practices",
        "Supported cross-functional teams in fast-paced environment"
      ]
    },
    {
      company: "AARP",
      period: "2022 - 2022",
      responsibilities: [
        "Designed custom email templates in Salesforce Marketing Cloud",
        "Imported and segmented customer lists",
        "Set up automation workflows and performance metrics"
      ]
    },
    {
      company: "CRYSTAL CRUISES",
      period: "2018 - 2020",
      responsibilities: [
        "Built custom automation tools using Node.js, Cheerio, MongoDB, Axios",
        "Designed responsive HTML emails",
        "Performed weekly website updates"
      ]
    },
    {
      company: "THE IDEA CENTER",
      period: "2017 - 2018",
      responsibilities: [
        "Prepared and delivered lessons focused on HTML5, CSS3, JavaScript, jQuery, and Bootstrap",
        "Conducted one-on-one and group review sessions to reinforce concepts",
        "Assisted students in understanding and applying web development principles",
        "Created learning materials and exercises for web development fundamentals"
      ]
    }
  ];

  const specialProjects = [
    {
      title: "Freelance Automation Consultant",
      description: "Designed automated workflows using n8n",
      details: [
        "Self-hosted n8n instance on cloud VPS",
        "Built custom n8n nodes for API integrations",
        "Created complex automation workflows for various clients"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Over 8 years of experience through innovative companies where I&apos;ve contributed to impactful projects and led development teams.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 transform md:-translate-x-1/2"></div>

          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full transform md:-translate-x-1/2 z-10 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
              </div>

              {/* Content Card */}
              <div className={`ml-12 md:ml-0 md:w-5/12 ${
                index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
              }`}>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-lg dark:shadow-gray-900/30 hover:shadow-xl dark:hover:shadow-gray-900/50 transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2 mr-3">
                        <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {experience.company}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {experience.period}
                        </div>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {experience.responsibilities.map((responsibility, respIndex) => (
                      <motion.li
                        key={respIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (index * 0.2) + (respIndex * 0.1) }}
                        viewport={{ once: true }}
                        className="flex items-start text-gray-700 dark:text-gray-300"
                      >
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{responsibility}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Special Projects
          </h3>

          <div className="grid md:grid-cols-1 gap-8">
            {specialProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-100 dark:border-blue-800"
              >
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
                  {project.description}
                </p>
                <ul className="space-y-2">
                  {project.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Education & Certifications
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-lg dark:shadow-gray-900/30">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                CS50X Miami - Computer Science
              </h4>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">Miami Dade College, 2015-2017</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                CS50x Miami is a course that teaches you how to design and implement solutions to problems. 
                But more than that, it teaches you how to think more critically, more methodically and more 
                algorithmically. It is an adaptation of Harvard University&apos;s CS50 course that provides an 
                introduction to the intellectual enterprises of computer science, and the art of programming 
                for Miami Dade College students and the South Florida community.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-lg dark:shadow-gray-900/30">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Web Development Certifications
              </h4>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">Miami Dade College, 2015-2016</span>
              </div>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• Building Responsive UI with Bootstrap</li>
                <li>• Creating HTML Apps with jQuery</li>
                <li>• Mastering Node.js</li>
                <li>• Advanced CSS3 and HTML5</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
