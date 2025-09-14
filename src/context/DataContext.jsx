import React, { createContext, useContext, useReducer, useEffect } from 'react'

const DataContext = createContext()

const initialState = {
  user: {
    userId: '1',
    email: 'user@example.com',
    name: 'John Doe',
    teamId: 'team-1',
    subscriptionTier: 'pro'
  },
  projects: [
    {
      projectId: '1',
      name: 'DevFlow AI Platform',
      description: 'AI-powered development platform',
      ownerId: '1',
      createdAt: new Date().toISOString()
    }
  ],
  roadmapItems: [
    {
      itemId: '1',
      projectId: '1',
      title: 'AI Feature Validation',
      description: 'Implement AI-powered feature validation system',
      status: 'in-progress',
      priority: 'high',
      estimatedEffort: 8,
      aiConfidenceScore: 0.85,
      linkedFeedbackIds: ['1', '2']
    },
    {
      itemId: '2',
      projectId: '1',
      title: 'Dynamic Roadmap UI',
      description: 'Build interactive roadmap interface',
      status: 'planning',
      priority: 'medium',
      estimatedEffort: 5,
      aiConfidenceScore: 0.72,
      linkedFeedbackIds: ['3']
    }
  ],
  tasks: [
    {
      taskId: '1',
      projectId: '1',
      title: 'Implement OpenAI integration',
      description: 'Set up OpenAI API for feature analysis',
      assigneeId: '1',
      status: 'completed',
      dueDate: '2024-01-15',
      linkedCommitIds: ['commit-1']
    }
  ],
  feedback: [
    {
      feedbackId: '1',
      source: 'customer-survey',
      content: 'Need better roadmap prioritization tools',
      submittedAt: '2024-01-10',
      sentimentScore: 0.6,
      topic: 'roadmap'
    },
    {
      feedbackId: '2',
      source: 'support-ticket',
      content: 'AI validation would save us so much time',
      submittedAt: '2024-01-12',
      sentimentScore: 0.8,
      topic: 'ai-validation'
    }
  ],
  commits: [
    {
      commitId: 'commit-1',
      repository: 'devflow-ai/platform',
      sha: 'abc123',
      message: 'Add OpenAI integration for feature validation',
      author: 'John Doe',
      commitDate: '2024-01-14',
      linkedTaskIds: ['1']
    }
  ],
  brainstormingSessions: [
    {
      sessionId: '1',
      projectId: '1',
      title: 'Q1 2024 Feature Planning',
      description: 'Brainstorming session for upcoming quarter features',
      status: 'active',
      createdBy: '1',
      createdAt: new Date().toISOString(),
      participants: ['1'],
      lastActivity: new Date().toISOString()
    }
  ],
  brainstormingIdeas: [
    {
      ideaId: '1',
      sessionId: '1',
      content: 'Implement real-time collaborative editing',
      authorId: '1',
      authorName: 'John Doe',
      createdAt: new Date().toISOString(),
      votes: 5,
      category: 'technical',
      aiSuggestions: [
        'Consider using Operational Transforms for conflict resolution',
        'Implement presence indicators for active collaborators'
      ],
      status: 'active'
    },
    {
      ideaId: '2',
      sessionId: '1',
      content: 'Add AI-powered code review suggestions',
      authorId: '1',
      authorName: 'John Doe',
      createdAt: new Date().toISOString(),
      votes: 3,
      category: 'ai-features',
      aiSuggestions: [
        'Integrate with GitHub API for pull request analysis',
        'Use machine learning models for code quality assessment'
      ],
      status: 'active'
    }
  ]
}

function dataReducer(state, action) {
  switch (action.type) {
    case 'ADD_ROADMAP_ITEM':
      return {
        ...state,
        roadmapItems: [...state.roadmapItems, action.payload]
      }
    case 'UPDATE_ROADMAP_ITEM':
      return {
        ...state,
        roadmapItems: state.roadmapItems.map(item =>
          item.itemId === action.payload.itemId ? { ...item, ...action.payload } : item
        )
      }
    case 'ADD_FEEDBACK':
      return {
        ...state,
        feedback: [...state.feedback, action.payload]
      }
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      }
    case 'ADD_BRAINSTORMING_SESSION':
      return {
        ...state,
        brainstormingSessions: [...state.brainstormingSessions, action.payload]
      }
    case 'ADD_BRAINSTORMING_IDEA':
      return {
        ...state,
        brainstormingIdeas: [...state.brainstormingIdeas, action.payload]
      }
    case 'UPDATE_BRAINSTORMING_IDEA':
      return {
        ...state,
        brainstormingIdeas: state.brainstormingIdeas.map(idea =>
          idea.ideaId === action.payload.ideaId ? { ...idea, ...action.payload } : idea
        )
      }
    case 'VOTE_BRAINSTORMING_IDEA':
      return {
        ...state,
        brainstormingIdeas: state.brainstormingIdeas.map(idea =>
          idea.ideaId === action.payload.ideaId
            ? { ...idea, votes: idea.votes + (action.payload.voteType === 'up' ? 1 : -1) }
            : idea
        )
      }
    case 'ADD_PARTICIPANT_TO_SESSION':
      return {
        ...state,
        brainstormingSessions: state.brainstormingSessions.map(session =>
          session.sessionId === action.payload.sessionId
            ? {
                ...session,
                participants: [...new Set([...session.participants, action.payload.userId])],
                lastActivity: new Date().toISOString()
              }
            : session
        )
      }
    default:
      return state
  }
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState)

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}
