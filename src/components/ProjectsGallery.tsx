'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Code, Workflow, Zap, Database } from 'lucide-react';
import Image from 'next/image';

interface GalleryProject {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  features: string[];
  link?: string;
}

const ProjectsGallery = () => {
  const galleryProjects: GalleryProject[] = [
    {
      title: "Yacht Transport AI Platform",
      description: "A comprehensive B2B maritime shipping platform that transforms yacht transportation. Built for Allied Yacht Transport, this production-ready application converts a traditionally manual, multi-day quote process into an instant, AI-powered experience delivering accurate quotes in minutes.",
      image: "/yachttransport.webp",
      category: "Full-Stack Platform",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "OpenAI", "DocuSign", "Mapbox"],
      features: [
        "AI-powered instant quote generation with complex pricing engine",
        "Maritime routing system with real-world sea paths across 15+ international ports",
        "DocuSign integration for automated dual-signature contract workflows",
        "Interactive Mapbox visualization with waypoint generation",
        "OpenAI-powered customer support chat assistant",
        "Comprehensive admin dashboard with CRUD operations and audit logging"
      ],
      link: "https://yachttransport.ai"
    },
    {
      title: "RAG (Retrieval-Augmented Generation) AI Workflow",
      description: "Advanced n8n workflow implementing RAG architecture for intelligent document processing and AI-powered responses. Features real-time data retrieval, vector embeddings, and context-aware AI responses.",
      image: "/rag-project.webp",
      category: "AI Automation",
      technologies: ["n8n", "OpenAI", "Vector Database", "Telegram API", "RAG Architecture"],
      features: [
        "Real-time document processing and embedding",
        "Vector similarity search for context retrieval",
        "AI-powered response generation with RAG",
        "Telegram bot integration for user interaction",
        "Automated workflow triggers and data flow"
      ]
    },
    {
      title: "Social Media Marketing Automation",
      description: "Comprehensive n8n workflow for automated social media content management. Integrates Google Sheets, AI content generation, and multi-platform posting with intelligent scheduling and optimization.",
      image: "/social-media-workflow.webp",
      category: "Marketing Automation",
      technologies: ["n8n", "Google Sheets", "OpenAI", "Social Media APIs", "Content Management"],
      features: [
        "Google Sheets integration for content planning",
        "AI-powered content generation and optimization",
        "Multi-platform social media posting",
        "Automated file processing and compression",
        "Intelligent scheduling and workflow management"
      ]
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AI Automation":
        return <Zap className="w-5 h-5" />;
      case "Marketing Automation":
        return <Database className="w-5 h-5" />;
      case "Full-Stack Platform":
        return <Code className="w-5 h-5" />;
      default:
        return <Workflow className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AI Automation":
        return "from-purple-500 to-blue-600";
      case "Marketing Automation":
        return "from-green-500 to-teal-600";
      case "Full-Stack Platform":
        return "from-amber-500 to-orange-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getTechColor = (tech: string) => {
    const colorMap: { [key: string]: string } = {
      'n8n': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      'OpenAI': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      'Vector Database': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      'Telegram API': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'RAG Architecture': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300',
      'Google Sheets': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      'Social Media APIs': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'Content Management': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
      'Next.js': 'bg-gray-900 dark:bg-gray-700 text-white',
      'TypeScript': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'PostgreSQL': 'bg-blue-200 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200',
      'Prisma': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300',
      'DocuSign': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      'Mapbox': 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300',
    };
    return colorMap[tech] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  };

  return (
    <section id="projects-gallery" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Projects Gallery
          </h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Deep dive into my automation workflows and technical implementations. Explore the architecture and features of complex n8n automations.
          </p>
        </motion.div>

        <div className="space-y-16">
          {galleryProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Project Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800 group cursor-pointer"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(project.category)} text-white text-sm font-medium`}>
                          {getCategoryIcon(project.category)}
                          <span className="ml-2">{project.category}</span>
                        </div>
                        {project.link && (
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                          >
                            <ExternalLink size={20} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div>
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getCategoryColor(project.category)} flex items-center justify-center text-white mr-4`}>
                      {getCategoryIcon(project.category)}
                    </div>
                    <div>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">
                        {project.category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                        viewport={{ once: true }}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getTechColor(tech)} transition-transform hover:scale-105`}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start text-gray-700 dark:text-gray-300"
                      >
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Code className="mr-2" size={20} />
                    Discuss Implementation
                  </motion.button>
                  
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                    >
                      <ExternalLink className="mr-2" size={20} />
                      View Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Custom Automation Solutions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              These workflows represent just a fraction of what's possible with modern automation. 
              Let's discuss how custom n8n workflows can streamline your business processes.
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
              <Workflow className="mr-2" size={20} />
              Start Your Automation Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
