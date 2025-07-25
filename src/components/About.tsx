'use client';

import { motion } from 'framer-motion';
import { Code, Users, Globe, Award } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "5+ Years Experience",
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

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
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
            <div className="prose prose-lg text-gray-600">
              <p className="text-lg leading-relaxed">
                Web Developer with 5+ years of experience building responsive websites and web applications. 
                Proficient in JavaScript, PHP, React, and WordPress, with strong UI/UX sensibilities and 
                back-end integration expertise.
              </p>
              
              <p className="text-lg leading-relaxed">
                Proven ability to lead teams, manage workflows, and deliver results in fast-paced environments. 
                I specialize in creating modern, scalable solutions that bridge the gap between design and functionality.
              </p>
              
              <p className="text-lg leading-relaxed">
                Fluent in English and Spanish, I bring both technical expertise and cross-cultural communication 
                skills to every project. My passion lies in solving complex problems through clean, efficient code 
                and innovative thinking.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                JavaScript Expert
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                React Specialist
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                PHP Developer
              </span>
              <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                WordPress Expert
              </span>
              <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                Team Lead
              </span>
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
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 text-sm">
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
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
            <div className="text-gray-600 text-sm">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600 text-sm">Projects Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
            <div className="text-gray-600 text-sm">Technologies</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
            <div className="text-gray-600 text-sm">Languages</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
