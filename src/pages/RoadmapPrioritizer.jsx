import React, { useState } from 'react'
import { Target, ArrowUp, ArrowDown, Brain, Plus, Edit } from 'lucide-react'
import { useData } from '../context/DataContext'

export function RoadmapPrioritizer() {
  const { state, dispatch } = useData()
  const [isReordering, setIsReordering] = useState(false)
  const [newItem, setNewItem] = useState({ title: '', description: '', estimatedEffort: 1 })
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAIPrioritization = async () => {
    setIsReordering(true)
    
    // Simulate AI prioritization
    setTimeout(() => {
      const reorderedItems = [...state.roadmapItems].sort((a, b) => {
        // Sort by AI confidence score and impact
        const scoreA = a.aiConfidenceScore + (a.priority === 'high' ? 0.2 : 0)
        const scoreB = b.aiConfidenceScore + (b.priority === 'high' ? 0.2 : 0)
        return scoreB - scoreA
      })
      
      reorderedItems.forEach((item, index) => {
        dispatch({
          type: 'UPDATE_ROADMAP_ITEM',
          payload: { ...item, priority: index < 2 ? 'high' : index < 4 ? 'medium' : 'low' }
        })
      })
      
      setIsReordering(false)
    }, 2000)
  }

  const handleAddItem = () => {
    if (!newItem.title.trim()) return
    
    const item = {
      itemId: Date.now().toString(),
      projectId: '1',
      title: newItem.title,
      description: newItem.description,
      status: 'planning',
      priority: 'medium',
      estimatedEffort: newItem.estimatedEffort,
      aiConfidenceScore: Math.random() * 0.3 + 0.5,
      linkedFeedbackIds: []
    }
    
    dispatch({ type: 'ADD_ROADMAP_ITEM', payload: item })
    setNewItem({ title: '', description: '', estimatedEffort: 1 })
    setShowAddForm(false)
  }

  const updateItemStatus = (itemId, newStatus) => {
    const item = state.roadmapItems.find(item => item.itemId === itemId)
    if (item) {
      dispatch({
        type: 'UPDATE_ROADMAP_ITEM',
        payload: { ...item, status: newStatus }
      })
    }
  }

  const priorityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-yellow-200 bg-yellow-50',
    low: 'border-green-200 bg-green-50'
  }

  const statusColors = {
    planning: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    blocked: 'bg-red-100 text-red-800'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Dynamic Roadmap Prioritizer
          </h1>
          <p className="text-lg text-text-secondary">
            Use AI to optimize roadmap prioritization based on real-time data and strategic goals
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-secondary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </button>
          <button
            onClick={handleAIPrioritization}
            disabled={isReordering}
            className="btn-primary disabled:opacity-50"
          >
            {isReordering ? (
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Optimizing...
              </div>
            ) : (
              <div className="flex items-center">
                <Brain className="h-4 w-4 mr-2" />
                AI Prioritize
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Add Item Form */}
      {showAddForm && (
        <div className="card animate-slide-up">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Add New Roadmap Item</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Title</label>
              <input
                value={newItem.title}
                onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Feature title..."
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Description</label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Feature description..."
                className="input h-24 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Estimated Effort (Story Points)
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={newItem.estimatedEffort}
                onChange={(e) => setNewItem(prev => ({ ...prev, estimatedEffort: parseInt(e.target.value) }))}
                className="input w-32"
              />
            </div>
            <div className="flex space-x-4">
              <button onClick={handleAddItem} className="btn-primary">
                Add to Roadmap
              </button>
              <button 
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Roadmap Items */}
      <div className="space-y-4">
        {state.roadmapItems.map((item, index) => (
          <div 
            key={item.itemId} 
            className={`card border-l-4 ${priorityColors[item.priority]} hover:shadow-lg transition-all`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[item.status]}`}>
                    {item.status.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.priority === 'high' ? 'bg-red-100 text-red-800' :
                    item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.priority} priority
                  </span>
                </div>
                
                <p className="text-text-secondary mb-4">{item.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">AI Confidence:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${item.aiConfidenceScore * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {Math.round(item.aiConfidenceScore * 100)}%
                    </span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-text-secondary">Effort: </span>
                    <span className="font-medium">{item.estimatedEffort} points</span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-text-secondary">Linked Feedback: </span>
                    <span className="font-medium">{item.linkedFeedbackIds.length}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {['planning', 'in-progress', 'completed', 'blocked'].map(status => (
                    <button
                      key={status}
                      onClick={() => updateItemStatus(item.itemId, status)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        item.status === status 
                          ? statusColors[status]
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="ml-4 flex flex-col space-y-2">
                <button className="p-2 text-text-secondary hover:text-text-primary">
                  <Edit className="h-4 w-4" />
                </button>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary-600">#{index + 1}</div>
                  <div className="text-xs text-text-secondary">Priority</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Roadmap Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">
            {state.roadmapItems.filter(item => item.status === 'completed').length}
          </div>
          <div className="text-text-secondary">Completed Items</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-accent-600">
            {state.roadmapItems.reduce((sum, item) => sum + item.estimatedEffort, 0)}
          </div>
          <div className="text-text-secondary">Total Story Points</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {Math.round(state.roadmapItems.reduce((sum, item) => sum + item.aiConfidenceScore, 0) / state.roadmapItems.length * 100)}%
          </div>
          <div className="text-text-secondary">Avg AI Confidence</div>
        </div>
      </div>
    </div>
  )
}