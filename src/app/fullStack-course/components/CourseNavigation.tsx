'use client';

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface CourseNavigationProps {
  currentModule: number;
  currentLesson: number;
  totalModules: number;
  totalLessons: number;
  onNavigate: (moduleId: number, lessonId: number) => void;
  onHome: () => void;
}

const CourseNavigation: React.FC<CourseNavigationProps> = ({
  currentModule,
  currentLesson,
  totalModules,
  totalLessons,
  onNavigate,
  onHome,
}) => {
  return (
    <nav className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-300">
          <button 
            onClick={onHome}
            className="flex items-center space-x-1 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Course</span>
          </button>
          <ChevronRight className="w-4 h-4" />
          <span>Module {currentModule + 1}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Lesson {currentLesson + 1}</span>
        </div>
        
        <div className="text-sm text-gray-400">
          {currentLesson + 1} of {totalLessons} lessons
        </div>
      </div>
    </nav>
  );
};

export default CourseNavigation;
