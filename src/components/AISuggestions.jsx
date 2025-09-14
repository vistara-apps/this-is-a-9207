import React, { useState, useEffect } from 'react'
import { Sparkles, RefreshCw, Lightbulb, Zap } from 'lucide-react'
import { useData } from '../context/DataContext'

export function AISuggestions({ sessionId }) {
  const { state, dispatch } = useData()
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  const sessionIdeas = state.brainstormingIdeas.filter(idea => idea.sessionId === sessionId)

  // Mock AI suggestions - in a real app, this would call an AI service
  const generateAISuggestions = async () => {
    setIsGenerating(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const mockSuggestions = [
      {
        id: '1',
        type: 'enhancement',
        title: 'Implement voting system with real-time updates',
        description: 'Add WebSocket integration for live vote counting and participant presence indicators.',
        category: 'technical',
        confidence: 0.89
      },
      {
        id: '2',
        type: 'feature',
        title: 'Add idea clustering and categorization',
        description: 'Use AI to automatically group similar ideas and suggest categories for better organization.',
        category: 'ai-features',
        confidence: 0.76
      },
      {
        id: '3',
        type: 'ux',
        title: 'Implement drag-and-drop idea prioritization',
        description: 'Allow participants to reorder ideas by dragging, with automatic vote recalculation.',
        category: 'ui-ux',
        confidence: 0.82
      },
      {
        id: '4',
        type: 'integration',
        title: 'Connect with project management tools',
        description: 'Automatically create tasks in Jira/Trello from top-voted brainstorming ideas.',
        category: 'business',
        confidence: 0.71
      }
    ]

    setSuggestions(mockSuggestions)
    setIsGenerating(false)
  }

  const applySuggestion = (suggestion) => {
    const idea = {
      ideaId: Date.now().toString(),
      sessionId,
      content: suggestion.description,
      authorId: 'ai-assistant',
      authorName: 'AI Assistant',
      createdAt: new Date().toISOString(),
      votes: 0,
      category: suggestion.category,
      aiSuggestions: [],
      status: 'active'
    }

    dispatch({ type: 'ADD_BRAINSTORMING_IDEA', payload: idea })

    // Remove the applied suggestion
    setSuggestions(suggestions.filter(s => s.id !== suggestion.id))
  }

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'enhancement':
        return <Zap className="h-4 w-4 text-blue-500" />
      case 'feature':
        return <Lightbulb className="h-4 w-4 text-yellow-500" />
      case 'ux':
        return <Sparkles className="h-4 w-4 text-purple-500" />
      case 'integration':
        return <RefreshCw className="h-4 w-4 text-green-500" />
      default:
        return <Sparkles className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent-500" />
          AI Suggestions
        </h3>
        <button
          onClick={generateAISuggestions}
          disabled={isGenerating}
          className="flex items-center gap-2 px-3 py-2 bg-accent-100 text-accent-700 rounded-lg hover:bg-accent-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">
            {isGenerating ? 'Generating...' : 'Generate Ideas'}
          </span>
        </button>
      </div>

      {suggestions.length === 0 ? (
        <div className="text-center py-8">
          <Sparkles className="h-12 w-12 text-accent-500 mx-auto mb-4 opacity-50" />
          <p className="text-text-secondary">
            {isGenerating
              ? 'AI is analyzing your brainstorming session...'
              : 'Click "Generate Ideas" to get AI-powered suggestions based on your current ideas and trends.'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4 hover:border-accent-300 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getSuggestionIcon(suggestion.type)}
                  <h4 className="font-medium text-text-primary">{suggestion.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded-full">
                    {Math.round(suggestion.confidence * 100)}% confidence
                  </span>
                  <button
                    onClick={() => applySuggestion(suggestion)}
                    className="text-xs bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600 transition-colors"
                  >
                    Add to Ideas
                  </button>
                </div>
              </div>
              <p className="text-sm text-text-secondary">{suggestion.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-text-secondary">Category:</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  suggestion.category === 'technical' ? 'bg-blue-100 text-blue-800' :
                  suggestion.category === 'ai-features' ? 'bg-green-100 text-green-800' :
                  suggestion.category === 'ui-ux' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {suggestion.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {sessionIdeas.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-text-secondary">
            💡 AI analyzes {sessionIdeas.length} existing ideas to generate relevant suggestions
          </p>
        </div>
      )}
    </div>
  )
}

