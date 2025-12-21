'use client';

import { motion } from 'framer-motion';
import { Code, Database, Wrench, Globe } from 'lucide-react';
import { Skill } from '@/types';

const Skills = () => {
  const skillCategories: Skill[] = [
    {
      category: "Languages",
      technologies: ["JavaScript", "PHP", "NodeJS", "HTML", "CSS", "SASS", "MySQL"]
    },
    {
      category: "Frameworks & Libraries",
      technologies: ["React", "Next.js", "Bootstrap", "Tailwind"]
    },
    {
      category: "Tools",
      technologies: ["WordPress", "Looker Studio", "BigQuery", "NPM", "Git"]
    },
    {
      category: "Other",
      technologies: ["Salesforce", "REST APIs", "n8n", "VPS", "API Integrations"]
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages":
        return <Code className="w-6 h-6" />;
      case "Frameworks & Libraries":
        return <Globe className="w-6 h-6" />;
      case "Tools":
        return <Wrench className="w-6 h-6" />;
      case "Other":
        return <Database className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Languages":
        return "from-blue-500 to-blue-600";
      case "Frameworks & Libraries":
        return "from-green-500 to-green-600";
      case "Tools":
        return "from-purple-500 to-purple-600";
      case "Other":
        return "from-orange-500 to-orange-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const featuredSkills = [
    { name: "JavaScript", level: 95, color: "bg-yellow-500" },
    { name: "React", level: 90, color: "bg-blue-500" },
    { name: "PHP", level: 88, color: "bg-purple-500" },
    { name: "WordPress", level: 92, color: "bg-blue-600" },
    { name: "Node.js", level: 85, color: "bg-green-500" },
    { name: "Next.js", level: 87, color: "bg-black" },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks that I use to build exceptional digital experiences.
          </p>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skillCategories.map((skillCategory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl dark:shadow-gray-900/30 transition-shadow duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getCategoryColor(skillCategory.category)} flex items-center justify-center text-white mb-4`}>
                {getCategoryIcon(skillCategory.category)}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {skillCategory.category}
              </h3>
              
              <div className="space-y-2">
                {skillCategory.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (index * 0.1) + (techIndex * 0.05) }}
                    viewport={{ once: true }}
                    className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Skills with Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/30"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Proficiency Levels
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {skill.level}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className={`${skill.color} h-3 rounded-full relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Also Experienced With
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {["TypeScript", "MongoDB", "Axios", "Cheerio", "Salesforce Marketing Cloud", "BigQuery", "Looker Studio", "VPS Management", "API Development"].map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/30 dark:hover:to-blue-800/30 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
