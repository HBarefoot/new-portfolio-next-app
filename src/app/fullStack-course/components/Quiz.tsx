'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number, totalPoints: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | number)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentQuestion];

  const handleAnswer = (answer: string | number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final score
      let finalScore = 0;
      questions.forEach((q, index) => {
        if (userAnswers[index] === q.correctAnswer) {
          finalScore += q.points;
        }
      });
      
      const totalPoints = questions.reduce((total, q) => total + q.points, 0);
      setScore(finalScore);
      setShowResults(true);
      onComplete(finalScore, totalPoints);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    const totalPoints = questions.reduce((total, q) => total + q.points, 0);
    const percentage = (score / totalPoints) * 100;
    
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            percentage >= 80 ? 'bg-green-500/20' : percentage >= 60 ? 'bg-yellow-500/20' : 'bg-red-500/20'
          }`}>
            {percentage >= 80 ? (
              <CheckCircle className="w-8 h-8 text-green-400" />
            ) : percentage >= 60 ? (
              <HelpCircle className="w-8 h-8 text-yellow-400" />
            ) : (
              <XCircle className="w-8 h-8 text-red-400" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h3>
          <div className="text-3xl font-bold text-white mb-2">
            {score} / {totalPoints} points
          </div>
          <div className={`text-lg ${
            percentage >= 80 ? 'text-green-400' : percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {percentage.toFixed(0)}% Score
          </div>
        </div>

        {/* Detailed Results */}
        <div className="space-y-4 mb-6">
          {questions.map((q, index) => {
            const isCorrect = userAnswers[index] === q.correctAnswer;
            return (
              <div key={q.id} className="p-4 bg-white/10 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <XCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-2">{q.question}</h4>
                    <div className="text-sm text-gray-400 mb-2">
                      Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                        {userAnswers[index]}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="text-sm text-gray-400 mb-2">
                        Correct answer: <span className="text-green-400">{q.correctAnswer}</span>
                      </div>
                    )}
                    <p className="text-sm text-gray-300">{q.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={resetQuiz}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      {/* Progress */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Quiz</h3>
        <div className="text-sm text-gray-400">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
        <div 
          className="h-2 bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-xl font-medium text-white mb-4">{question.question}</h4>
        
        <div className="space-y-3">
          {question.type === 'multiple-choice' && question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full p-3 text-left rounded-lg transition-colors border-2 ${
                userAnswers[currentQuestion] === option
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                  : 'border-gray-600 bg-white/5 text-gray-300 hover:border-gray-500'
              }`}
            >
              {option}
            </button>
          ))}

          {question.type === 'true-false' && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer('true')}
                className={`p-3 rounded-lg transition-colors border-2 ${
                  userAnswers[currentQuestion] === 'true'
                    ? 'border-green-500 bg-green-500/20 text-green-400'
                    : 'border-gray-600 bg-white/5 text-gray-300 hover:border-gray-500'
                }`}
              >
                True
              </button>
              <button
                onClick={() => handleAnswer('false')}
                className={`p-3 rounded-lg transition-colors border-2 ${
                  userAnswers[currentQuestion] === 'false'
                    ? 'border-red-500 bg-red-500/20 text-red-400'
                    : 'border-gray-600 bg-white/5 text-gray-300 hover:border-gray-500'
                }`}
              >
                False
              </button>
            </div>
          )}

          {question.type === 'short-answer' && (
            <input
              type="text"
              value={userAnswers[currentQuestion] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your answer..."
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentQuestion === 0
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gray-600 hover:bg-gray-500 text-white'
          }`}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={userAnswers[currentQuestion] === undefined}
          className={`px-4 py-2 rounded-lg transition-colors ${
            userAnswers[currentQuestion] === undefined
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
