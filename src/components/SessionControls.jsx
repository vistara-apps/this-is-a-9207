import React, { useState } from 'react'
import { Settings, Share2, Pause, Play, Users, Clock } from 'lucide-react'

export function SessionControls({ session }) {
  const [isPaused, setIsPaused] = useState(false)

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/brainstorming?session=${session.sessionId}`
    navigator.clipboard.writeText(shareUrl)
    // In a real app, you'd show a toast notification here
    alert('Session link copied to clipboard!')
  }

  const toggleSession = () => {
    setIsPaused(!isPaused)
    // In a real app, you'd dispatch an action to update the session status
  }

  return (
    <div className="flex items-center gap-3">
      {/* Share Button */}
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        title="Share session"
      >
        <Share2 className="h-4 w-4" />
        <span className="text-sm font-medium">Share</span>
      </button>

      {/* Pause/Resume Button */}
      <button
        onClick={toggleSession}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          isPaused
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
        }`}
        title={isPaused ? 'Resume session' : 'Pause session'}
      >
        {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        <span className="text-sm font-medium">
          {isPaused ? 'Resume' : 'Pause'}
        </span>
      </button>

      {/* Session Status */}
      <div className="flex items-center gap-2 px-3 py-2 bg-accent-100 text-accent-700 rounded-lg">
        <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">Live</span>
      </div>

      {/* Settings Button */}
      <button
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        title="Session settings"
      >
        <Settings className="h-4 w-4" />
      </button>
    </div>
  )
}

