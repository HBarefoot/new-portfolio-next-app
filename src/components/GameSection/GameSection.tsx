'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Code, Zap } from 'lucide-react';
import PortfolioQuest from './games/PortfolioQuest/PortfolioQuest';

const GameSection = () => {
  return (
    <section id="game" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Experience
          </h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience my portfolio in a unique way! Navigate through an interactive 2D game 
            that showcases my development skills while exploring my professional journey.
          </p>
        </motion.div>

        {/* Game Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gamepad2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Interactive Gameplay</h3>
            <p className="text-gray-600 dark:text-gray-400">Navigate through portfolio sections using game mechanics</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Achievement System</h3>
            <p className="text-gray-600 dark:text-gray-400">Unlock portfolio insights by completing challenges</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Skills Showcase</h3>
            <p className="text-gray-600 dark:text-gray-400">Experience my technical abilities through gameplay</p>
          </div>
        </motion.div>

        {/* Game Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-gray-900/50 p-8 border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              Portfolio Quest
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">WASD</kbd>
                <span className="ml-2">Move</span>
              </span>
              <span className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">SPACE</kbd>
                <span className="ml-2">Action</span>
              </span>
            </div>
          </div>
          
          {/* Game will be rendered here */}
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-inner">
            <PortfolioQuest />
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <strong>🎮 How to play:</strong> Use WASD or arrow keys to move your character through different portfolio sections. 
              Collect skill tokens, solve challenges, and discover hidden achievements that unlock more details about my experience!
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Enjoyed the Interactive Experience?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              This game demonstrates my ability to create engaging, interactive web experiences using modern 
              technologies like Phaser.js, TypeScript, and React integration.
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
              <Code className="mr-2" size={20} />
              Let's Build Something Interactive
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GameSection;
