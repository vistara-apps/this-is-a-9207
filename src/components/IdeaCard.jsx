import React, { useState } from 'react'
import { ThumbsUp, ThumbsDown, MessageSquare, Sparkles, User } from 'lucide-react'

export function IdeaCard({ idea, onVote, currentUserId }) {
  const [showAISuggestions, setShowAISuggestions] = useState(false)

  const categories = {
    general: { name: 'General', color: 'bg-gray-100 text-gray-800' },
    technical: { name: 'Technical', color: 'bg-blue-100 text-blue-800' },
    'ui-ux': { name: 'UI/UX', color: 'bg-purple-100 text-purple-800' },
    'ai-features': { name: 'AI Features', color: 'bg-green-100 text-green-800' },
    business: { name: 'Business', color: 'bg-yellow-100 text-yellow-800' }
  }

  const category = categories[idea.category] || categories.general

  const handleVote = (voteType) => {
    onVote(idea.ideaId, voteType)
  }

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-text-primary">{idea.authorName}</p>
            <p className="text-sm text-text-secondary">
              {new Date(idea.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
          {category.name}
        </span>
      </div>

      <p className="text-text-primary mb-4 leading-relaxed">{idea.content}</p>

      {/* AI Suggestions */}
      {idea.aiSuggestions && idea.aiSuggestions.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setShowAISuggestions(!showAISuggestions)}
            className="flex items-center gap-2 text-sm text-accent-600 hover:text-accent-700 font-medium mb-2"
          >
            <Sparkles className="h-4 w-4" />
            AI Suggestions ({idea.aiSuggestions.length})
          </button>
          {showAISuggestions && (
            <div className="space-y-2 pl-6 border-l-2 border-accent-200">
              {idea.aiSuggestions.map((suggestion, index) => (
                <div key={index} className="text-sm text-text-secondary bg-accent-50 p-2 rounded">
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleVote('up')}
            className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{idea.votes}</span>
          </button>
          <button
            onClick={() => handleVote('down')}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            <ThumbsDown className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <MessageSquare className="h-4 w-4" />
          <span>0 comments</span>
        </div>
      </div>
    </div>
  )
}

