import React from 'react'
import { Timeline } from './Timeline'
import './App.css'
import trace from './data/trace.json';

const App = () => {
  return (
    <div className="app">
      <div className="header">        
        <span>Span Timeline</span>
      </div>
      <div className="content">
      <Timeline trace={trace} />
      </div>
    </div>
  )
}

export default App
