import React, { useState, useEffect } from 'react'
import { Lightbulb, Users, Plus, Sparkles, ThumbsUp, MessageSquare, Clock } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useRealtimeCollaboration } from '../hooks/useRealtimeCollaboration'
import { IdeaCard } from '../components/IdeaCard'
import { ParticipantList } from '../components/ParticipantList'
import { SessionControls } from '../components/SessionControls'
import { AISuggestions } from '../components/AISuggestions'

export function Brainstorming() {
  const { state, dispatch } = useData()
  const [activeSession, setActiveSession] = useState(null)
  const [newIdea, setNewIdea] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('general')

  // Initialize real-time collaboration
  const { isConnected, addIdea, voteIdea } = useRealtimeCollaboration(activeSession?.sessionId)

  const categories = [
    { id: 'general', name: 'General', color: 'bg-gray-100 text-gray-800' },
    { id: 'technical', name: 'Technical', color: 'bg-blue-100 text-blue-800' },
    { id: 'ui-ux', name: 'UI/UX', color: 'bg-purple-100 text-purple-800' },
    { id: 'ai-features', name: 'AI Features', color: 'bg-green-100 text-green-800' },
    { id: 'business', name: 'Business', color: 'bg-yellow-100 text-yellow-800' }
  ]

  useEffect(() => {
    // Set the first active session as default
    const defaultSession = state.brainstormingSessions.find(session => session.status === 'active')
    if (defaultSession) {
      setActiveSession(defaultSession)
    }
  }, [state.brainstormingSessions])

  const handleAddIdea = () => {
    if (!newIdea.trim() || !activeSession) return

    const idea = {
      ideaId: Date.now().toString(),
      sessionId: activeSession.sessionId,
      content: newIdea.trim(),
      authorId: state.user.userId,
      authorName: state.user.name,
      createdAt: new Date().toISOString(),
      votes: 0,
      category: selectedCategory,
      aiSuggestions: [],
      status: 'active'
    }

    // Add to local state
    dispatch({ type: 'ADD_BRAINSTORMING_IDEA', payload: idea })

    // Send to real-time collaboration
    if (isConnected) {
      addIdea(idea)
    }

    setNewIdea('')
  }

  const handleVote = (ideaId, voteType) => {
    // Update local state
    dispatch({ type: 'VOTE_BRAINSTORMING_IDEA', payload: { ideaId, voteType } })

    // Send to real-time collaboration
    if (isConnected) {
      voteIdea(ideaId, voteType)
    }
  }

  const currentIdeas = activeSession
    ? state.brainstormingIdeas.filter(idea => idea.sessionId === activeSession.sessionId)
    : []

  const sortedIdeas = currentIdeas.sort((a, b) => b.votes - a.votes)

  if (!activeSession) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Lightbulb className="h-16 w-16 text-accent-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">No Active Session</h2>
          <p className="text-text-secondary">Create or join a brainstorming session to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-accent-500" />
            {activeSession.title}
          </h1>
          <p className="text-text-secondary mt-1">{activeSession.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-text-secondary">
              {isConnected ? 'Real-time collaboration active' : 'Connecting...'}
            </span>
          </div>
        </div>
        <SessionControls session={activeSession} />
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-text-secondary">Participants</p>
              <p className="text-xl font-semibold">{activeSession.participants.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm text-text-secondary">Ideas</p>
              <p className="text-xl font-semibold">{currentIdeas.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <ThumbsUp className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-text-secondary">Total Votes</p>
              <p className="text-xl font-semibold">
                {currentIdeas.reduce((sum, idea) => sum + idea.votes, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-text-secondary">Last Activity</p>
              <p className="text-sm font-semibold">
                {new Date(activeSession.lastActivity).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Add New Idea */}
          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Idea
            </h3>
            <div className="space-y-4">
              <textarea
                value={newIdea}
                onChange={(e) => setNewIdea(e.target.value)}
                placeholder="What's your brilliant idea?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows={3}
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? category.color
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleAddIdea}
                  disabled={!newIdea.trim()}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="h-4 w-4" />
                  Add Idea
                </button>
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <AISuggestions sessionId={activeSession.sessionId} />

          {/* Ideas List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Ideas ({sortedIdeas.length})
            </h3>
            {sortedIdeas.length === 0 ? (
              <div className="card text-center py-12">
                <Lightbulb className="h-12 w-12 text-accent-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-text-primary mb-2">No ideas yet</h4>
                <p className="text-text-secondary">Be the first to share your brilliant idea!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {sortedIdeas.map((idea) => (
                  <IdeaCard
                    key={idea.ideaId}
                    idea={idea}
                    onVote={handleVote}
                    currentUserId={state.user.userId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ParticipantList session={activeSession} />
        </div>
      </div>
    </div>
  )
}
