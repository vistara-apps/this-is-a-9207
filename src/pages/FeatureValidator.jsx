import React, { useState } from 'react'
import { Brain, Upload, FileText, TrendingUp, Users, Star } from 'lucide-react'
import { useData } from '../context/DataContext'

export function FeatureValidator() {
  const { state, dispatch } = useData()
  const [feedback, setFeedback] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleAnalyze = async () => {
    if (!feedback.trim()) return
    
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const result = {
        confidence: Math.random() * 0.3 + 0.7, // 70-100%
        impact: Math.random() * 0.4 + 0.6, // 60-100%
        effort: Math.random() * 10 + 1, // 1-10 points
        sentiment: Math.random() * 0.6 + 0.4, // 40-100%
        keywords: ['user experience', 'performance', 'automation', 'AI'],
        recommendations: [
          'High user demand based on sentiment analysis',
          'Aligns with current product strategy',
          'Moderate development effort required',
          'Strong market opportunity identified'
        ]
      }
      
      setAnalysisResult(result)
      setIsAnalyzing(false)
      
      // Add to feedback data
      const newFeedback = {
        feedbackId: Date.now().toString(),
        source: 'manual-input',
        content: feedback,
        submittedAt: new Date().toISOString(),
        sentimentScore: result.sentiment,
        topic: 'feature-validation'
      }
      
      dispatch({ type: 'ADD_FEEDBACK', payload: newFeedback })
    }, 2000)
  }

  const handleAddToRoadmap = () => {
    if (!analysisResult) return
    
    const newItem = {
      itemId: Date.now().toString(),
      projectId: '1',
      title: 'Feature from AI Validation',
      description: feedback.substring(0, 100) + '...',
      status: 'planning',
      priority: analysisResult.impact > 0.8 ? 'high' : 'medium',
      estimatedEffort: Math.round(analysisResult.effort),
      aiConfidenceScore: analysisResult.confidence,
      linkedFeedbackIds: [state.feedback[state.feedback.length - 1]?.feedbackId]
    }
    
    dispatch({ type: 'ADD_ROADMAP_ITEM', payload: newItem })
    setFeedback('')
    setAnalysisResult(null)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          AI Feature Validator
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Analyze customer feedback and market trends to predict feature impact and adoption
        </p>
      </div>

      {/* Analysis Input */}
      <div className="card">
        <div className="flex items-center mb-4">
          <Brain className="h-6 w-6 text-primary-500 mr-2" />
          <h2 className="text-xl font-semibold text-text-primary">Feedback Analysis</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Customer Feedback or Feature Request
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Paste customer feedback, feature requests, or describe a potential feature..."
              className="input h-32 resize-none"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handleAnalyze}
              disabled={!feedback.trim() || isAnalyzing}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Analyzing...
                </div>
              ) : (
                <div className="flex items-center">
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze with AI
                </div>
              )}
            </button>
            
            <button className="btn-secondary">
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="card animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Analysis Results</h3>
            <button
              onClick={handleAddToRoadmap}
              className="btn-primary"
            >
              Add to Roadmap
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">
                {Math.round(analysisResult.confidence * 100)}%
              </div>
              <div className="text-sm text-text-secondary">AI Confidence</div>
            </div>
            
            <div className="text-center p-4 bg-accent-50 rounded-lg">
              <div className="text-2xl font-bold text-accent-600">
                {Math.round(analysisResult.impact * 100)}%
              </div>
              <div className="text-sm text-text-secondary">Predicted Impact</div>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {Math.round(analysisResult.effort)}
              </div>
              <div className="text-sm text-text-secondary">Effort Points</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(analysisResult.sentiment * 100)}%
              </div>
              <div className="text-sm text-text-secondary">Sentiment Score</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-text-primary mb-3">Key Insights</h4>
              <ul className="space-y-2">
                {analysisResult.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-3">Extracted Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {analysisResult.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Feedback */}
      <div className="card">
        <h3 className="text-xl font-semibold text-text-primary mb-4">Recent Feedback</h3>
        <div className="space-y-4">
          {state.feedback.slice(-5).map((item) => (
            <div key={item.feedbackId} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-text-primary mb-2">{item.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span>From: {item.source}</span>
                    <span>•</span>
                    <span>{new Date(item.submittedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Sentiment: {Math.round(item.sentimentScore * 100)}%</span>
                  </div>
                </div>
                <div className="ml-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.sentimentScore > 0.7 
                      ? 'bg-green-100 text-green-800' 
                      : item.sentimentScore > 0.4 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.sentimentScore > 0.7 ? 'Positive' : item.sentimentScore > 0.4 ? 'Neutral' : 'Negative'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}