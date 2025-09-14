import React from 'react'
import { Users, User, Crown } from 'lucide-react'
import { useData } from '../context/DataContext'

export function ParticipantList({ session }) {
  const { state } = useData()

  // Mock additional participants for demo
  const mockParticipants = [
    { userId: '1', name: 'John Doe', email: 'john@example.com', isOnline: true, role: 'creator' },
    { userId: '2', name: 'Sarah Chen', email: 'sarah@example.com', isOnline: true, role: 'participant' },
    { userId: '3', name: 'Mike Johnson', email: 'mike@example.com', isOnline: false, role: 'participant' },
    { userId: '4', name: 'Emma Wilson', email: 'emma@example.com', isOnline: true, role: 'participant' }
  ]

  const participants = mockParticipants.filter(p => session.participants.includes(p.userId))

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
        <Users className="h-5 w-5" />
        Participants ({participants.length})
      </h3>

      <div className="space-y-3">
        {participants.map((participant) => (
          <div key={participant.userId} className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-600" />
              </div>
              {participant.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-text-primary truncate">
                  {participant.name}
                </p>
                {participant.role === 'creator' && (
                  <Crown className="h-3 w-3 text-yellow-500" />
                )}
              </div>
              <p className="text-xs text-text-secondary truncate">
                {participant.email}
              </p>
            </div>

            <div className="text-xs text-text-secondary">
              {participant.isOnline ? 'Online' : 'Offline'}
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Activity Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live session active</span>
        </div>
        <p className="text-xs text-text-secondary mt-1">
          Last activity: {new Date(session.lastActivity).toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

