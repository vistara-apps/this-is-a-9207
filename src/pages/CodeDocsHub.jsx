import React, { useState } from 'react'
import { FileCode, GitCommit, Link, Search, ExternalLink } from 'lucide-react'
import { useData } from '../context/DataContext'

export function CodeDocsHub() {
  const { state } = useData()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCommit, setSelectedCommit] = useState(null)

  const filteredCommits = state.commits.filter(commit =>
    commit.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    commit.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getLinkedTasks = (commitIds) => {
    return state.tasks.filter(task => 
      task.linkedCommitIds?.some(id => commitIds.includes(id))
    )
  }

  const getTaskForCommit = (commitId) => {
    return state.tasks.find(task => 
      task.linkedCommitIds?.includes(commitId)
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Contextual Code & Docs Hub
        </h1>
        <p className="text-lg text-text-secondary">
          AI-powered system that links code commits, issues, and relevant documentation
        </p>
      </div>

      {/* Search */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search commits, authors, or linked issues..."
              className="input pl-10"
            />
          </div>
          <button className="btn-primary">
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Commits List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Recent Commits</h2>
          
          {filteredCommits.map((commit) => {
            const linkedTask = getTaskForCommit(commit.commitId)
            
            return (
              <div 
                key={commit.commitId}
                className={`card cursor-pointer transition-all ${
                  selectedCommit?.commitId === commit.commitId 
                    ? 'ring-2 ring-primary-500 bg-primary-50' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedCommit(commit)}
              >
                <div className="flex items-start space-x-3">
                  <GitCommit className="h-5 w-5 text-text-secondary mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {commit.message}
                    </p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-text-secondary">
                      <span>{commit.author}</span>
                      <span>•</span>
                      <span>{new Date(commit.commitDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="font-mono">{commit.sha.substring(0, 7)}</span>
                    </div>
                    
                    {linkedTask && (
                      <div className="mt-2 flex items-center space-x-2">
                        <Link className="h-3 w-3 text-accent-500" />
                        <span className="text-xs text-accent-600">
                          Linked to: {linkedTask.title}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Commit Details */}
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            {selectedCommit ? 'Commit Details' : 'Select a Commit'}
          </h2>
          
          {selectedCommit ? (
            <div className="space-y-6">
              {/* Commit Info */}
              <div className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {selectedCommit.message}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                      {selectedCommit.author} • {new Date(selectedCommit.commitDate).toLocaleString()}
                    </p>
                  </div>
                  <button className="btn-secondary text-xs">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View in Repo
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded p-3 font-mono text-sm">
                  <div className="text-text-secondary">Repository:</div>
                  <div className="text-text-primary">{selectedCommit.repository}</div>
                  <div className="text-text-secondary mt-2">SHA:</div>
                  <div className="text-text-primary">{selectedCommit.sha}</div>
                </div>
              </div>

              {/* Linked Tasks */}
              {selectedCommit.linkedTaskIds && selectedCommit.linkedTaskIds.length > 0 && (
                <div className="card">
                  <h4 className="font-semibold text-text-primary mb-3">Linked Tasks</h4>
                  <div className="space-y-3">
                    {selectedCommit.linkedTaskIds.map(taskId => {
                      const task = state.tasks.find(t => t.taskId === taskId)
                      if (!task) return null
                      
                      return (
                        <div key={taskId} className="border rounded p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-medium text-text-primary">{task.title}</h5>
                              <p className="text-sm text-text-secondary mt-1">{task.description}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs">
                                <span className={`px-2 py-1 rounded ${
                                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {task.status}
                                </span>
                                <span className="text-text-secondary">
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* AI Context Analysis */}
              <div className="card">
                <h4 className="font-semibold text-text-primary mb-3">AI Context Analysis</h4>
                <div className="bg-blue-50 rounded p-4">
                  <div className="text-sm text-blue-800">
                    <strong>Code Impact:</strong> This commit appears to implement API integration functionality. 
                    The changes likely affect authentication and data fetching patterns.
                  </div>
                  <div className="text-sm text-blue-700 mt-2">
                    <strong>Related Documentation:</strong> Check API integration guide, authentication docs
                  </div>
                  <div className="text-sm text-blue-700 mt-2">
                    <strong>Testing Recommendations:</strong> Verify API endpoints, test authentication flow
                  </div>
                </div>
              </div>

              {/* Documentation Links */}
              <div className="card">
                <h4 className="font-semibold text-text-primary mb-3">Related Documentation</h4>
                <div className="space-y-2">
                  <a href="#" className="flex items-center text-accent-600 hover:text-accent-700 text-sm">
                    <FileCode className="h-4 w-4 mr-2" />
                    API Integration Guide
                  </a>
                  <a href="#" className="flex items-center text-accent-600 hover:text-accent-700 text-sm">
                    <FileCode className="h-4 w-4 mr-2" />
                    Authentication Documentation
                  </a>
                  <a href="#" className="flex items-center text-accent-600 hover:text-accent-700 text-sm">
                    <FileCode className="h-4 w-4 mr-2" />
                    Testing Guidelines
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center text-text-secondary">
              <FileCode className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a commit from the list to view detailed context and linked resources</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">
            {state.commits.length}
          </div>
          <div className="text-text-secondary">Total Commits</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-accent-600">
            {state.tasks.filter(task => task.linkedCommitIds?.length > 0).length}
          </div>
          <div className="text-text-secondary">Linked Tasks</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {state.commits.filter(commit => 
              new Date(commit.commitDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            ).length}
          </div>
          <div className="text-text-secondary">This Week</div>
        </div>
      </div>
    </div>
  )
}