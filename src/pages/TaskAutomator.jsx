import React, { useState } from 'react'
import { Zap, Play, Code, FileText, Download, Copy } from 'lucide-react'
import { useData } from '../context/DataContext'

export function TaskAutomator() {
  const { state, dispatch } = useData()
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedScript, setGeneratedScript] = useState(null)
  const [automationHistory, setAutomationHistory] = useState([
    {
      id: '1',
      prompt: 'Create a script to parse log files and extract error messages',
      type: 'shell',
      script: `#!/bin/bash
# Log parser script
grep -E "(ERROR|FATAL)" /var/log/app.log | awk '{print $1, $2, $NF}'`,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      prompt: 'Generate a function to validate email addresses',
      type: 'javascript',
      script: `function validateEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}`,
      createdAt: new Date().toISOString()
    }
  ])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    // Simulate AI script generation
    setTimeout(() => {
      const scriptTypes = ['javascript', 'python', 'shell', 'sql']
      const randomType = scriptTypes[Math.floor(Math.random() * scriptTypes.length)]
      
      const sampleScripts = {
        javascript: `// Generated automation script
function automatedTask() {
  console.log('Executing: ${prompt}');
  // Implementation would be based on the prompt
  return 'Task completed successfully';
}

automatedTask();`,
        python: `#!/usr/bin/env python3
# Generated automation script

def automated_task():
    """
    ${prompt}
    """
    print("Executing automated task...")
    # Implementation would be based on the prompt
    return "Task completed successfully"

if __name__ == "__main__":
    result = automated_task()
    print(result)`,
        shell: `#!/bin/bash
# Generated automation script for: ${prompt}

echo "Starting automated task..."
# Implementation would be based on the prompt
echo "Task completed successfully"`,
        sql: `-- Generated SQL script for: ${prompt}
SELECT 
  *
FROM 
  tasks
WHERE 
  status = 'automated'
ORDER BY 
  created_at DESC;`
      }
      
      const newScript = {
        id: Date.now().toString(),
        prompt,
        type: randomType,
        script: sampleScripts[randomType],
        createdAt: new Date().toISOString()
      }
      
      setGeneratedScript(newScript)
      setAutomationHistory(prev => [newScript, ...prev])
      setIsGenerating(false)
    }, 2000)
  }

  const handleSaveScript = () => {
    if (!generatedScript) return
    
    // Add as a task
    const newTask = {
      taskId: Date.now().toString(),
      projectId: '1',
      title: `Automation: ${generatedScript.prompt.substring(0, 50)}...`,
      description: generatedScript.prompt,
      assigneeId: '1',
      status: 'completed',
      dueDate: new Date().toISOString().split('T')[0],
      linkedCommitIds: []
    }
    
    dispatch({ type: 'ADD_TASK', payload: newTask })
    setPrompt('')
    setGeneratedScript(null)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const getLanguageClass = (type) => {
    const classes = {
      javascript: 'bg-yellow-50 border-yellow-200',
      python: 'bg-green-50 border-green-200',
      shell: 'bg-blue-50 border-blue-200',
      sql: 'bg-purple-50 border-purple-200'
    }
    return classes[type] || 'bg-gray-50 border-gray-200'
  }

  const getLanguageColor = (type) => {
    const colors = {
      javascript: 'text-yellow-700',
      python: 'text-green-700',
      shell: 'text-blue-700',
      sql: 'text-purple-700'
    }
    return colors[type] || 'text-gray-700'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          AI Task Automator
        </h1>
        <p className="text-lg text-text-secondary">
          Define and automate repetitive tasks using natural language prompts
        </p>
      </div>

      {/* Automation Generator */}
      <div className="card">
        <div className="flex items-center mb-4">
          <Zap className="h-6 w-6 text-primary-500 mr-2" />
          <h2 className="text-xl font-semibold text-text-primary">Generate Automation</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Describe the task you want to automate
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Create a script to backup database daily, Generate a function to process CSV files, Write a command to deploy to staging..."
              className="input h-32 resize-none"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Generating...
                </div>
              ) : (
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Generate Script
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Script */}
      {generatedScript && (
        <div className="card animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-text-primary">Generated Script</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => copyToClipboard(generatedScript.script)}
                className="btn-secondary text-sm"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </button>
              <button className="btn-secondary text-sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </button>
              <button
                onClick={handleSaveScript}
                className="btn-primary text-sm"
              >
                Save & Execute
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-text-secondary">Task:</span>
              <span className="text-sm text-text-primary">{generatedScript.prompt}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">Type:</span>
              <span className={`text-sm font-medium ${getLanguageColor(generatedScript.type)}`}>
                {generatedScript.type.toUpperCase()}
              </span>
            </div>
          </div>
          
          <div className={`border rounded-lg p-4 ${getLanguageClass(generatedScript.type)}`}>
            <pre className="text-sm overflow-x-auto">
              <code>{generatedScript.script}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Automation History */}
      <div className="card">
        <h3 className="text-xl font-semibold text-text-primary mb-4">Automation History</h3>
        <div className="space-y-4">
          {automationHistory.map((automation) => (
            <div key={automation.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-text-primary font-medium mb-1">{automation.prompt}</p>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span className={`font-medium ${getLanguageColor(automation.type)}`}>
                      {automation.type.toUpperCase()}
                    </span>
                    <span>•</span>
                    <span>{new Date(automation.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => setGeneratedScript(automation)}
                    className="text-primary-600 hover:text-primary-700 text-sm"
                  >
                    <Code className="h-4 w-4" />
                  </button>
                  <button className="text-accent-600 hover:text-accent-700 text-sm">
                    <Play className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className={`mt-3 border rounded p-3 text-xs ${getLanguageClass(automation.type)}`}>
                <pre className="truncate">
                  <code>{automation.script.split('\n')[0]}...</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Templates */}
      <div className="card">
        <h3 className="text-xl font-semibold text-text-primary mb-4">Quick Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Create a backup script for database',
            'Generate API endpoint tests',
            'Build a log monitoring script',
            'Create deployment automation',
            'Generate data validation function',
            'Build file processing script'
          ].map((template, index) => (
            <button
              key={index}
              onClick={() => setPrompt(template)}
              className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-text-secondary" />
                <span className="text-sm text-text-primary">{template}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">
            {automationHistory.length}
          </div>
          <div className="text-text-secondary">Scripts Generated</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-accent-600">
            {automationHistory.filter(a => 
              new Date(a.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            ).length}
          </div>
          <div className="text-text-secondary">This Week</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {new Set(automationHistory.map(a => a.type)).size}
          </div>
          <div className="text-text-secondary">Languages Used</div>
        </div>
      </div>
    </div>
  )
}