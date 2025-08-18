'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Flame, Target } from 'lucide-react';

interface CourseProgress {
  completedLessons: string[];
  currentModule: number;
  currentLesson: number;
  totalXP: number;
  badges: string[];
  streak: number;
}

interface ProgressTrackerProps {
  progress: CourseProgress;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  const getBadgeInfo = (badgeName: string) => {
    const badges = {
      'first-lesson': { icon: '🎯', name: 'First Step', color: 'text-blue-400' },
      'frontend-master': { icon: '🎨', name: 'Frontend Master', color: 'text-purple-400' },
      'backend-guru': { icon: '⚡', name: 'Backend Guru', color: 'text-green-400' },
      'database-architect': { icon: '🗄️', name: 'DB Architect', color: 'text-yellow-400' },
      'deployment-expert': { icon: '🚀', name: 'Deploy Expert', color: 'text-red-400' },
      'code-warrior': { icon: '⚔️', name: 'Code Warrior', color: 'text-orange-400' },
      'streak-champion': { icon: '🔥', name: 'Streak Champion', color: 'text-pink-400' },
    };
    return badges[badgeName as keyof typeof badges] || { icon: '🏆', name: badgeName, color: 'text-gray-400' };
  };

  const getXPLevel = (xp: number) => {
    return Math.floor(xp / 100) + 1;
  };

  const getXPForNextLevel = (xp: number) => {
    const currentLevel = getXPLevel(xp);
    return currentLevel * 100;
  };

  const getXPProgress = (xp: number) => {
    const currentLevelXP = (getXPLevel(xp) - 1) * 100;
    const nextLevelXP = getXPLevel(xp) * 100;
    return ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* XP Progress */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-lg font-semibold text-white">Level {getXPLevel(progress.totalXP)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
            <div 
              className="h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
              style={{ width: `${getXPProgress(progress.totalXP)}%` }}
            />
          </div>
          <div className="text-sm text-gray-400">
            {progress.totalXP} / {getXPForNextLevel(progress.totalXP)} XP
          </div>
        </div>

        {/* Lessons Completed */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-lg font-semibold text-white">Progress</span>
          </div>
          <div className="text-2xl font-bold text-green-400 mb-1">
            {progress.completedLessons.length}
          </div>
          <div className="text-sm text-gray-400">Lessons Completed</div>
        </div>

        {/* Streak */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Flame className="w-5 h-5 text-orange-400 mr-2" />
            <span className="text-lg font-semibold text-white">Streak</span>
          </div>
          <div className="text-2xl font-bold text-orange-400 mb-1">
            {progress.streak}
          </div>
          <div className="text-sm text-gray-400">Days</div>
        </div>

        {/* Badges */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Award className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-lg font-semibold text-white">Badges</span>
          </div>
          <div className="flex items-center justify-center space-x-1 mb-1">
            {progress.badges.slice(0, 3).map((badge, index) => {
              const badgeInfo = getBadgeInfo(badge);
              return (
                <span 
                  key={index} 
                  className="text-lg"
                  title={badgeInfo.name}
                >
                  {badgeInfo.icon}
                </span>
              );
            })}
            {progress.badges.length > 3 && (
              <span className="text-sm text-gray-400">+{progress.badges.length - 3}</span>
            )}
          </div>
          <div className="text-sm text-gray-400">{progress.badges.length} Earned</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
