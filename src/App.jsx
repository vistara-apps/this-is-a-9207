import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Dashboard } from './pages/Dashboard'
import { FeatureValidator } from './pages/FeatureValidator'
import { RoadmapPrioritizer } from './pages/RoadmapPrioritizer'
import { CodeDocsHub } from './pages/CodeDocsHub'
import { TaskAutomator } from './pages/TaskAutomator'
import { DataProvider } from './context/DataContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <div className="min-h-screen bg-gradient-to-br from-accent-100 to-primary-100 dark:from-accent-50 dark:to-primary-50">
          <AppShell>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/feature-validator" element={<FeatureValidator />} />
              <Route path="/roadmap" element={<RoadmapPrioritizer />} />
              <Route path="/code-docs" element={<CodeDocsHub />} />
              <Route path="/automation" element={<TaskAutomator />} />
            </Routes>
          </AppShell>
        </div>
      </DataProvider>
    </ThemeProvider>
  )
}

export default App
