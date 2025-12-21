'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Zap, Database, Globe } from 'lucide-react';
import { Project } from '@/types';

const Projects = () => {
  const projects: Project[] = [
    {
      title: "n8n Automation Platform",
      description: "Self-hosted n8n instance with custom nodes for API integrations. Built complex automation workflows for various clients with VPS deployment and monitoring.",
      technologies: ["n8n", "Node.js", "VPS", "API Integration", "Docker"],
    },
    {
      title: "Looker Studio Dashboards",
      description: "Comprehensive reporting system using Looker Studio and BigQuery for data visualization and business intelligence at Addigy.",
      technologies: ["Looker Studio", "BigQuery", "SQL", "Data Visualization"],
    },
    {
      title: "WordPress Custom Plugins",
      description: "Developed custom WordPress plugins and themes with advanced functionality including API integrations and custom post types.",
      technologies: ["WordPress", "PHP", "JavaScript", "MySQL", "REST API"],
    },
    {
      title: "React Landing Pages",
      description: "Created responsive landing pages and campaign templates using React and modern CSS frameworks for marketing campaigns.",
      technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    },
    {
      title: "Salesforce Email Templates",
      description: "Designed custom email templates in Salesforce Marketing Cloud with automation workflows and customer segmentation.",
      technologies: ["Salesforce", "HTML/CSS", "Marketing Cloud", "Automation"],
    },
    {
      title: "Node.js Automation Tools",
      description: "Built custom automation tools using Node.js, Cheerio, MongoDB, and Axios for data scraping and processing.",
      technologies: ["Node.js", "MongoDB", "Cheerio", "Axios", "JavaScript"],
    }
  ];

  const getProjectIcon = (title: string) => {
    if (title.includes('n8n') || title.includes('Automation')) return <Zap className="w-6 h-6" />;
    if (title.includes('Looker') || title.includes('BigQuery')) return <Database className="w-6 h-6" />;
    if (title.includes('WordPress')) return <Globe className="w-6 h-6" />;
    return <Code className="w-6 h-6" />;
  };

  const getTechColor = (tech: string) => {
    const colorMap: { [key: string]: string } = {
      'React': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'Next.js': 'bg-gray-900 dark:bg-gray-700 text-white',
      'Node.js': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      'WordPress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'PHP': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      'JavaScript': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      'TypeScript': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'Python': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'Tailwind CSS': 'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300',
      'MongoDB': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      'MySQL': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
      'API Integration': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      'Salesforce': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'BigQuery': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'n8n': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      'VPS': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300',
      'Docker': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    };
    return colorMap[tech] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of recent projects demonstrating expertise in modern web technologies and automation solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/30 hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 relative"
            >
              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {getProjectIcon(project.title)}
                  </div>
                  <div className="flex space-x-2">
                    {project.github && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                      >
                        <Github size={20} />
                      </motion.a>
                    )}
                    {project.link && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: (index * 0.1) + (techIndex * 0.05) }}
                      viewport={{ once: true }}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getTechColor(tech)} transition-transform hover:scale-105`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Consistent Bottom Border Animation for ALL cards */}
              <div 
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ transformOrigin: 'left center' }}
              ></div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want to See More?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              These are just a few highlights from my portfolio. I&apos;m always working on new projects and exploring cutting-edge technologies.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Get In Touch
              <ExternalLink className="ml-2" size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
