'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Code, 
  Database, 
  Server, 
  Rocket, 
  Trophy, 
  Play, 
  CheckCircle, 
  Lock,
  Star,
  Users,
  Clock,
  Award
} from 'lucide-react';
import CourseNavigation from './components/CourseNavigation';
import LessonViewer from './components/LessonViewer';
import ProgressTracker from './components/ProgressTracker';
import courseData from './data/courseData';

interface CourseProgress {
  completedLessons: string[];
  currentModule: number;
  currentLesson: number;
  totalXP: number;
  badges: string[];
  streak: number;
}

const FullStackCoursePage = () => {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [progress, setProgress] = useState<CourseProgress>({
    completedLessons: [],
    currentModule: 0,
    currentLesson: 0,
    totalXP: 0,
    badges: [],
    streak: 0
  });

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('fullstack-course-progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    
    // Check URL hash for direct lesson access
    const hash = window.location.hash.slice(1); // Remove #
    if (hash && hash.includes('-')) {
      const [moduleStr, lessonStr] = hash.split('-');
      const moduleId = parseInt(moduleStr);
      const lessonId = parseInt(lessonStr);
      
      if (!isNaN(moduleId) && !isNaN(lessonId)) {
        setSelectedModule(moduleId);
        setSelectedLesson(lessonId);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: CourseProgress) => {
    setProgress(newProgress);
    localStorage.setItem('fullstack-course-progress', JSON.stringify(newProgress));
  };

  const courseModules = courseData.map(module => ({
    id: module.id,
    title: module.title,
    icon: module.id === 0 ? <Code className="w-8 h-8" /> :
          module.id === 1 ? <Server className="w-8 h-8" /> :
          module.id === 2 ? <Database className="w-8 h-8" /> :
          module.id === 3 ? <Rocket className="w-8 h-8" /> :
          <Trophy className="w-8 h-8" />,
    description: module.description,
    lessons: module.lessons.length,
    xp: module.lessons.reduce((total, lesson) => total + lesson.xp, 0),
    color: module.id === 0 ? "from-blue-500 to-cyan-500" :
           module.id === 1 ? "from-green-500 to-emerald-500" :
           module.id === 2 ? "from-purple-500 to-violet-500" :
           module.id === 3 ? "from-orange-500 to-red-500" :
           "from-pink-500 to-rose-500"
  }));

  const totalLessons = courseData.reduce((total, module) => total + module.lessons.length, 0);
  const totalExercises = courseData.reduce((total, module) => 
    total + module.lessons.reduce((lessonTotal, lesson) => 
      lessonTotal + (lesson.exercises?.length || 0), 0), 0);

  const stats = [
    { label: "Total Lessons", value: totalLessons.toString(), icon: <BookOpen className="w-5 h-5" /> },
    { label: "Hands-on Projects", value: "12", icon: <Code className="w-5 h-5" /> },
    { label: "Code Exercises", value: `${totalExercises}+`, icon: <Play className="w-5 h-5" /> }
  ];

  const handleStartLesson = (moduleId: number, lessonId: number = 0) => {
    setSelectedModule(moduleId);
    setSelectedLesson(lessonId);
  };

  const handleBackToCourse = () => {
    setSelectedModule(null);
    setSelectedLesson(null);
    window.location.hash = ''; // Clear the hash
  };

  if (selectedModule !== null) {
    return (
      <LessonViewer
        moduleId={selectedModule}
        lessonId={selectedLesson || 0}
        progress={progress}
        onUpdateProgress={saveProgress}
        onBackToCourse={handleBackToCourse}
        courseModules={courseModules}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Full Stack Developer
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
            Masterclass
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Master modern web development from frontend to backend. Build real applications 
          with React, Node.js, databases, and deployment strategies.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="flex items-center justify-center mb-2 text-blue-400">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <ProgressTracker progress={progress} />
      </motion.div>

      {/* Course Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {courseModules.map((module, index) => {
          const isUnlocked = index === 0 || progress.completedLessons.some(lesson => {
            const [moduleId] = lesson.split('-').map(Number);
            return moduleId === index - 1;
          });
          
          const completedLessons = progress.completedLessons.filter(lesson => {
            const [moduleId] = lesson.split('-').map(Number);
            return moduleId === index;
          }).length;
          
          const progressPercentage = (completedLessons / module.lessons) * 100;

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl p-6 ${
                isUnlocked 
                  ? 'bg-white/10 backdrop-blur-sm hover:bg-white/15 cursor-pointer transform hover:scale-105 transition-all duration-300' 
                  : 'bg-gray-800/50 cursor-not-allowed'
              }`}
              onClick={() => isUnlocked && handleStartLesson(module.id)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-10`} />
              
              {/* Lock Overlay */}
              {!isUnlocked && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Lock className="w-12 h-12 text-gray-400" />
                </div>
              )}

              <div className="relative z-10">
                {/* Module Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${module.color}`}>
                    {module.icon}
                  </div>
                  {completedLessons === module.lessons && (
                    <div className="flex items-center space-x-1 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Complete</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                <p className="text-gray-300 mb-4 text-sm">{module.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm text-gray-400">
                      {completedLessons}/{module.lessons} lessons
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${module.color} transition-all duration-300`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Module Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{module.lessons} lessons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{module.xp} XP</span>
                    </div>
                  </div>
                  {isUnlocked && (
                    <div className="flex items-center space-x-1 text-blue-400">
                      <Play className="w-4 h-4" />
                      <span>Start</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Course Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-8">What You'll Learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Interactive Coding</h3>
            <p className="text-gray-400">
              Learn by doing with hands-on coding exercises, real-time feedback, and interactive challenges.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real Projects</h3>
            <p className="text-gray-400">
              Build 12 complete applications from simple todos to complex social platforms.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Gamified Learning</h3>
            <p className="text-gray-400">
              Earn XP, unlock badges, and track your progress through an engaging learning journey.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FullStackCoursePage;
