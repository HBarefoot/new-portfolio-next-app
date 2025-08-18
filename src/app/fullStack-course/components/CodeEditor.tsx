'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Check, X } from 'lucide-react';

interface CodeEditorProps {
  language: string;
  value: string;
  readOnly?: boolean;
  onChange: (value: string) => void;
  onRun?: () => void;
  showRunButton?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  value,
  readOnly = false,
  onChange,
  onRun,
  showRunButton = false
}) => {
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    if (!onRun) return;
    
    setIsRunning(true);
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOutput('Code executed successfully! ✅');
      onRun();
    } catch (error) {
      setOutput('Error executing code ❌');
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setOutput('');
    // Reset code to initial state if needed
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {/* Editor Header */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-sm text-gray-400">{language}</span>
        </div>
        
        {showRunButton && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleReset}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded transition-colors disabled:opacity-50"
            >
              <Play className="w-3 h-3" />
              <span>{isRunning ? 'Running...' : 'Run'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Code Area */}
      <div className="relative">
        {readOnly ? (
          <pre className="p-4 text-sm text-green-400 overflow-x-auto min-h-[200px] font-mono">
            <code>{value}</code>
          </pre>
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-4 text-sm text-green-400 bg-transparent resize-none border-none outline-none font-mono min-h-[200px]"
            placeholder="Write your code here..."
            spellCheck={false}
          />
        )}
      </div>

      {/* Output Area */}
      {output && (
        <div className="border-t border-gray-700">
          <div className="bg-gray-800 px-4 py-2">
            <span className="text-sm text-gray-400">Output:</span>
          </div>
          <div className="p-4 text-sm text-gray-300 font-mono">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
