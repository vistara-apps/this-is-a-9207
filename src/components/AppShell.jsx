import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  Home,
  Brain,
  Target,
  FileCode,
  Zap,
  Settings,
  User,
  Moon,
  Sun
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Feature Validator', href: '/feature-validator', icon: Brain },
  { name: 'Roadmap', href: '/roadmap', icon: Target },
  { name: 'Code & Docs', href: '/code-docs', icon: FileCode },
  { name: 'Automation', href: '/automation', icon: Zap },
]

export function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-surface-light dark:bg-surface-dark shadow-xl">
          <SidebarContent location={location} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-surface-light dark:bg-surface-dark border-r border-gray-200 dark:border-gray-700">
          <SidebarContent location={location} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="lg:hidden p-2 rounded-md text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="lg:hidden ml-2 text-xl font-bold text-primary-500">
                DevFlow AI
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              <button className="p-2 rounded-md text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark">
                <Settings className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-md text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-background-light dark:bg-background-dark">
          <div className="max-w-7xl mx-auto px-4 py-6 lg:px-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ location, onClose }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-primary-500">DevFlow AI</div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden">
            <X className="h-6 w-6 text-text-secondary-light dark:text-text-secondary-dark" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
          DevFlow AI Platform v1.0
        </div>
      </div>
    </div>
  )
}
