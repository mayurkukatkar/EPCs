import React from 'react';
import { useProposal } from '../context/ProposalContext';
import { X, Building2, Phone, Mail, Hash, MapPin } from 'lucide-react';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose }) => {
  const { company, updateCompany } = useProposal();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in">
        <div className="modal-header">
          <h2>Company Settings</h2>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <p className="modal-desc">Update your EPC company details. These will appear on the generated proposals.</p>
          
          <div className="form-group">
            <label><Building2 size={14} className="input-icon" /> Company Name</label>
            <input 
              type="text" 
              value={company.name} 
              onChange={e => updateCompany('name', e.target.value)} 
              placeholder="e.g. ProSolar EPC"
            />
          </div>
          
          <div className="form-group">
            <label><Hash size={14} className="input-icon" /> Tagline</label>
            <input 
              type="text" 
              value={company.tagline} 
              onChange={e => updateCompany('tagline', e.target.value)} 
              placeholder="e.g. Empowering with Clean Energy"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label><Phone size={14} className="input-icon" /> Phone Number</label>
              <input 
                type="tel" 
                value={company.phone} 
                onChange={e => updateCompany('phone', e.target.value)} 
                placeholder="+91 800-000-0000"
              />
            </div>
            <div className="form-group">
              <label><Mail size={14} className="input-icon" /> Email Address</label>
              <input 
                type="email" 
                value={company.email} 
                onChange={e => updateCompany('email', e.target.value)} 
                placeholder="contact@company.in"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label><MapPin size={14} className="input-icon" /> Address</label>
            <textarea 
              value={company.address || ''} 
              onChange={e => updateCompany('address', e.target.value)} 
              placeholder="Full company address..."
              rows={2}
            />
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>Save & Close</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
