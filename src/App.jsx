import React, { useState } from 'react';
import { useProposal } from './context/ProposalContext';
import Wizard from './components/Wizard';
import Preview from './components/Preview';
import SettingsModal from './components/SettingsModal';
import { Zap, FileText, Edit3, Settings, Eye } from 'lucide-react';
import './App.css';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('wizard'); // 'wizard' or 'preview'
  const { company } = useProposal();

  return (
    <div className="app-container">
      {/* Desktop & Mobile Header */}
      <header className="app-header glass">
        <div className="logo-container">
          <div className="logo-icon">
            <Zap size={20} color="#fff" />
          </div>
          <h1>{company.name || 'Ekvarta Energy'}</h1>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setIsSettingsOpen(true)}>
            <Settings size={16} />
            <span className="btn-label-desktop">Settings</span>
          </button>
        </div>
      </header>

      {/* Desktop Layout */}
      <main className="main-layout">
        <section className={`wizard-section ${activeTab === 'wizard' ? 'mobile-active' : 'mobile-hidden'}`}>
          <Wizard onPreview={() => setActiveTab('preview')} />
        </section>
        
        <section className={`preview-section ${activeTab === 'preview' ? 'mobile-active' : 'mobile-hidden'}`}>
          <Preview />
        </section>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="mobile-tab-bar">
        <button 
          className={`tab-item ${activeTab === 'wizard' ? 'active' : ''}`}
          onClick={() => setActiveTab('wizard')}
        >
          <Edit3 size={20} />
          <span>Create</span>
        </button>
        <button 
          className={`tab-item ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          <Eye size={20} />
          <span>Preview</span>
        </button>
        <button 
          className="tab-item"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </nav>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default App;
