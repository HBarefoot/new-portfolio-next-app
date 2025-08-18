'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Code, 
  BookOpen, 
  Trophy,
  Star,
  Lightbulb,
  Target
} from 'lucide-react';
import CourseNavigation from './CourseNavigation';
import CodeEditor from './CodeEditor';
import Quiz from './Quiz';
import courseData from '../data/courseData';
import type { Lesson } from '../data/courseData';

interface CourseProgress {
  completedLessons: string[];
  currentModule: number;
  currentLesson: number;
  totalXP: number;
  badges: string[];
  streak: number;
}

interface LessonViewerProps {
  moduleId: number;
  lessonId: number;
  progress: CourseProgress;
  onUpdateProgress: (progress: CourseProgress) => void;
  onBackToCourse: () => void;
  courseModules: any[];
}

const LessonViewer: React.FC<LessonViewerProps> = ({
  moduleId,
  lessonId,
  progress,
  onUpdateProgress,
  onBackToCourse,
  courseModules
}) => {
  const [currentExercise, setCurrentExercise] = useState<number | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [userCode, setUserCode] = useState('');

  const module = courseData[moduleId];
  const lesson = module?.lessons[lessonId];
  const totalLessons = module?.lessons.length || 0;

  useEffect(() => {
    if (lesson?.exercises?.[0]?.startingCode) {
      setUserCode(lesson.exercises[0].startingCode);
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Lesson not found</h2>
          <button 
            onClick={onBackToCourse}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  const isLessonCompleted = progress.completedLessons.includes(lesson.id);

  const handleCompleteLesson = () => {
    if (!isLessonCompleted) {
      const newProgress = {
        ...progress,
        completedLessons: [...progress.completedLessons, lesson.id],
        totalXP: progress.totalXP + lesson.xp,
        currentModule: moduleId,
        currentLesson: lessonId + 1 < totalLessons ? lessonId + 1 : lessonId
      };

      // Award badges based on progress
      const newBadges = [...progress.badges];
      if (newProgress.completedLessons.length === 1 && !newBadges.includes('first-lesson')) {
        newBadges.push('first-lesson');
      }

      newProgress.badges = newBadges;
      onUpdateProgress(newProgress);
    }
  };

  const handleNextLesson = () => {
    if (lessonId + 1 < totalLessons) {
      // Stay in the same module, go to next lesson
      const nextLessonId = lessonId + 1;
      const newProgress = {
        ...progress,
        currentModule: moduleId,
        currentLesson: nextLessonId
      };
      onUpdateProgress(newProgress);
      
      // Navigate to next lesson in same module
      window.location.hash = `#${moduleId}-${nextLessonId}`;
      window.location.reload();
    } else if (moduleId + 1 < courseModules.length) {
      // Move to first lesson of next module
      const nextModuleId = moduleId + 1;
      const newProgress = {
        ...progress,
        currentModule: nextModuleId,
        currentLesson: 0
      };
      onUpdateProgress(newProgress);
      
      // Navigate to first lesson of next module
      window.location.hash = `#${nextModuleId}-0`;
      window.location.reload();
    } else {
      // Completed all lessons, show completion message
      alert('🎉 Congratulations! You have completed the Full Stack Developer Course!');
      onBackToCourse();
    }
  };

  const handlePrevLesson = () => {
    if (lessonId > 0) {
      // Go to previous lesson in same module
      const prevLessonId = lessonId - 1;
      const newProgress = {
        ...progress,
        currentModule: moduleId,
        currentLesson: prevLessonId
      };
      onUpdateProgress(newProgress);
      
      window.location.hash = `#${moduleId}-${prevLessonId}`;
      window.location.reload();
    } else if (moduleId > 0) {
      // Go to last lesson of previous module
      const prevModuleId = moduleId - 1;
      const prevModule = courseData[prevModuleId];
      const lastLessonId = prevModule.lessons.length - 1;
      
      const newProgress = {
        ...progress,
        currentModule: prevModuleId,
        currentLesson: lastLessonId
      };
      onUpdateProgress(newProgress);
      
      window.location.hash = `#${prevModuleId}-${lastLessonId}`;
      window.location.reload();
    }
  };

  const renderTextWithInlineCode = (text: string) => {
    // Handle inline code blocks with backticks
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        const code = part.slice(1, -1); // Remove backticks
        return (
          <code 
            key={index} 
            className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono"
          >
            {code}
          </code>
        );
      }
      return part;
    });
  };

  const renderContent = () => {
    const content = lesson.content || '';
    const parts = [];
    let lastIndex = 0;
    
    // First handle code blocks globally
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add content before code block
      if (match.index > lastIndex) {
        const textBefore = content.substring(lastIndex, match.index);
        if (textBefore.trim()) {
          parts.push(...parseTextContent(textBefore.trim(), lastIndex));
        }
      }

      // Add code block
      const language = match[1] || 'text';
      const code = match[2].trim();
      
      // Get language-specific styling
      const getLanguageColor = (lang: string) => {
        switch (lang.toLowerCase()) {
          case 'javascript':
          case 'js':
            return 'text-yellow-300';
          case 'typescript':
          case 'ts':
            return 'text-blue-300';
          case 'css':
            return 'text-purple-300';
          case 'html':
            return 'text-orange-300';
          case 'jsx':
          case 'tsx':
            return 'text-cyan-300';
          case 'json':
            return 'text-green-300';
          case 'bash':
          case 'shell':
          case 'dockerfile':
          case 'yaml':
          case 'yml':
            return 'text-gray-300';
          default:
            return 'text-green-400';
        }
      };
      
      parts.push(
        <div key={`code-${match.index}`} className="bg-gray-900 rounded-lg overflow-hidden mb-4 border border-gray-700">
          <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-4 text-sm text-gray-400 font-medium">{language}</span>
            </div>
          </div>
          <pre className={`p-4 text-sm overflow-x-auto font-mono leading-relaxed ${getLanguageColor(language)}`}>
            <code>{code}</code>
          </pre>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining content after last code block
    if (lastIndex < content.length) {
      const remainingText = content.substring(lastIndex);
      if (remainingText.trim()) {
        parts.push(...parseTextContent(remainingText.trim(), lastIndex));
      }
    }

    return parts;
  };

  const parseTextContent = (text: string, baseIndex: number) => {
    const sections = text.split('\n\n').filter(section => section.trim());
    
    return sections.map((section, index) => {
      const key = `${baseIndex}-${index}`;
      
      if (section.startsWith('#')) {
        const level = section.match(/^#+/)?.[0].length || 1;
        const text = section.replace(/^#+\s*/, '');
        
        if (level === 1) {
          return (
            <h1 key={key} className="text-3xl font-bold text-white mb-4">
              {text}
            </h1>
          );
        } else if (level === 2) {
          return (
            <h2 key={key} className="text-2xl font-bold text-white mb-4">
              {text}
            </h2>
          );
        } else {
          return (
            <h3 key={key} className="text-xl font-bold text-white mb-4">
              {text}
            </h3>
          );
        }
      } else if (section.startsWith('-') || section.startsWith('*')) {
        const items = section.split('\n').filter(item => item.trim());
        return (
          <ul key={key} className="list-disc list-inside text-gray-300 mb-4 space-y-2">
            {items.map((item, i) => (
              <li key={i}>{renderTextWithInlineCode(item.replace(/^[-*]\s*/, ''))}</li>
            ))}
          </ul>
        );
      } else if (/^\d+\./.test(section)) {
        const items = section.split('\n').filter(item => item.trim());
        return (
          <ol key={key} className="list-decimal list-inside text-gray-300 mb-4 space-y-2">
            {items.map((item, i) => (
              <li key={i}>{renderTextWithInlineCode(item.replace(/^\d+\.\s*/, ''))}</li>
            ))}
          </ol>
        );
      }
      
      return (
        <p key={key} className="text-gray-300 mb-4 leading-relaxed">
          {renderTextWithInlineCode(section)}
        </p>
      );
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <CourseNavigation
        currentModule={moduleId}
        currentLesson={lessonId}
        totalModules={courseModules.length}
        totalLessons={totalLessons}
        onNavigate={(modId, lessId) => {
          window.location.hash = `#${modId}-${lessId}`;
          window.location.reload();
        }}
        onHome={onBackToCourse}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
          >
            {/* Lesson Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    lesson.type === 'theory' ? 'bg-blue-500/20' :
                    lesson.type === 'coding' ? 'bg-green-500/20' :
                    lesson.type === 'project' ? 'bg-purple-500/20' : 'bg-orange-500/20'
                  }`}>
                    {lesson.type === 'theory' ? <BookOpen className="w-5 h-5" /> :
                     lesson.type === 'coding' ? <Code className="w-5 h-5" /> :
                     lesson.type === 'project' ? <Trophy className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{lesson.duration}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{lesson.xp} XP</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {isLessonCompleted && (
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
            </div>

            {/* Lesson Content */}
            <div className="prose prose-invert max-w-none mb-8">
              {renderContent()}
            </div>

            {/* Code Examples */}
            {lesson.codeExamples && lesson.codeExamples.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
                {lesson.codeExamples.map((example) => (
                  <div key={example.id} className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-2">{example.title}</h4>
                    <CodeEditor
                      language={example.language}
                      value={example.code}
                      readOnly={!example.interactive}
                      onChange={() => {}}
                    />
                    <p className="text-gray-400 mt-2">{example.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-700">
              <button
                onClick={handlePrevLesson}
                disabled={lessonId === 0 && moduleId === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  lessonId === 0 && moduleId === 0
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-600 hover:bg-gray-500 text-white'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleCompleteLesson}
                disabled={isLessonCompleted}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isLessonCompleted
                    ? 'bg-green-600 text-white cursor-default'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isLessonCompleted ? 'Completed ✅' : 'Complete Lesson'}
              </button>

              <button
                onClick={handleNextLesson}
                disabled={false} // Always allow next, even if going to next module
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors bg-gray-600 hover:bg-gray-500 text-white"
              >
                <span>
                  {lessonId >= totalLessons - 1 && moduleId >= courseModules.length - 1 
                    ? 'Finish Course' 
                    : lessonId >= totalLessons - 1 
                    ? 'Next Module' 
                    : 'Next'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Exercises */}
          {lesson.exercises && lesson.exercises.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Exercises</h3>
              <div className="space-y-3">
                {lesson.exercises.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className="p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
                    onClick={() => setCurrentExercise(index)}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">{exercise.title}</h4>
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                        {exercise.points} pts
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{exercise.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4">Module Progress</h3>
            <div className="space-y-3">
              {module.lessons.map((l, index) => {
                const completed = progress.completedLessons.includes(l.id);
                const current = index === lessonId;
                
                return (
                  <div
                    key={l.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      current ? 'bg-blue-500/20' : ''
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      completed ? 'bg-green-500' : current ? 'bg-blue-500' : 'bg-gray-600'
                    }`}>
                      {completed ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-xs text-white">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm ${
                      current ? 'text-white font-medium' : 'text-gray-400'
                    }`}>
                      {l.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
