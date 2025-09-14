import React from 'react'
import { Link } from 'react-router-dom'
import { Brain, Target, FileCode, Zap, TrendingUp, Users, Calendar, CheckCircle } from 'lucide-react'
import { useData } from '../context/DataContext'

export function Dashboard() {
  const { state } = useData()
  
  const stats = [
    {
      name: 'Active Projects',
      value: state.projects.length,
      icon: Target,
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Roadmap Items',
      value: state.roadmapItems.length,
      icon: Calendar,
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: 'Completed Tasks',
      value: state.tasks.filter(t => t.status === 'completed').length,
      icon: CheckCircle,
      change: '+23%',
      changeType: 'positive'
    },
    {
      name: 'AI Confidence',
      value: '87%',
      icon: Brain,
      change: '+5%',
      changeType: 'positive'
    }
  ]

  const features = [
    {
      name: 'AI Feature Validator',
      description: 'Analyze customer feedback and market trends to predict feature impact and adoption.',
      icon: Brain,
      href: '/feature-validator',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Dynamic Roadmap Prioritizer',
      description: 'Use AI to suggest optimal roadmap prioritization based on real-time data.',
      icon: Target,
      href: '/roadmap',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Contextual Code & Docs Hub',
      description: 'AI-powered system that links code commits, issues, and documentation.',
      icon: FileCode,
      href: '/code-docs',
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'AI Task Automator',
      description: 'Define and automate repetitive tasks using natural language prompts.',
      icon: Zap,
      href: '/automation',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-text-primary mb-4">
          Agile Project Management
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          AI enhances the team's speed of work and improves its ability to turn 
          ideas into products that will accelerate the execution of projects, 
          increase efficiency and create the best workflows for each specific project 
          through analysis of team and commercial roadmap execution.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-primary-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-text-secondary">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-text-primary">{stat.value}</p>
                    <span className="ml-2 text-sm font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Link key={feature.name} to={feature.href} className="group">
              <div className="card hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {feature.name}
                    </h3>
                    <p className="text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {state.feedback.slice(-3).map((item) => (
            <div key={item.feedbackId} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <div className="h-2 w-2 bg-accent-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-text-primary">
                  New feedback: "{item.content}"
                </p>
                <p className="text-xs text-text-secondary">
                  From {item.source} • {new Date(item.submittedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}