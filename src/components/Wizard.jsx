import React from 'react';
import { useProposal } from '../context/ProposalContext';
import { User, Sun, DollarSign, ChevronRight, ChevronLeft } from 'lucide-react';
import './Wizard.css';

const Step1Customer = () => {
  const { customer, updateCustomer } = useProposal();
  
  return (
    <div className="wizard-step animate-fade-in">
      <h2>Customer Details</h2>
      <p className="step-desc">Enter basic client information.</p>
      
      <div className="form-group">
        <label>Client Name</label>
        <input 
          type="text" 
          value={customer.name} 
          onChange={e => updateCustomer('name', e.target.value)} 
          placeholder="e.g. Ramesh Kumar"
        />
      </div>
      
      <div className="form-group">
        <label>Phone Number</label>
        <input 
          type="tel" 
          value={customer.phone} 
          onChange={e => updateCustomer('phone', e.target.value)} 
          placeholder="+91 98765 43210"
        />
      </div>
      
      <div className="form-group">
        <label>Installation Address</label>
        <textarea 
          value={customer.address} 
          onChange={e => updateCustomer('address', e.target.value)} 
          placeholder="Full address for the proposal..."
          rows={3}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Monthly Bill (₹)</label>
          <input 
            type="number" 
            value={customer.monthlyBill} 
            onChange={e => updateCustomer('monthlyBill', Number(e.target.value))} 
          />
        </div>
        <div className="form-group">
          <label>Sanctioned Load (kW)</label>
          <input 
            type="number" 
            value={customer.sanctionedLoad} 
            onChange={e => updateCustomer('sanctionedLoad', Number(e.target.value))} 
          />
        </div>
      </div>
    </div>
  );
};

const Step2System = () => {
  const { system, updateSystem } = useProposal();
  
  return (
    <div className="wizard-step animate-fade-in">
      <h2>System Specifications</h2>
      <p className="step-desc">Configure the solar plant technical details.</p>
      
      <div className="form-group highlight-input">
        <label>System Capacity (kW)</label>
        <input 
          type="number" 
          step="0.5"
          value={system.capacity} 
          onChange={e => updateSystem('capacity', Number(e.target.value))} 
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Panel Brand</label>
          <select value={system.panelBrand} onChange={e => updateSystem('panelBrand', e.target.value)}>
            <option>Waaree</option>
            <option>Adani Solar</option>
            <option>RenewSys</option>
            <option>K.Solare</option>
          </select>
        </div>
        <div className="form-group">
          <label>Wattage (Wp)</label>
          <select value={system.panelWattage} onChange={e => updateSystem('panelWattage', Number(e.target.value))}>
            <option value="540">540W Mono PERC</option>
            <option value="550">550W Mono PERC</option>
            <option value="575">575W TopCon</option>
          </select>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Inverter Brand</label>
          <select value={system.inverterBrand} onChange={e => updateSystem('inverterBrand', e.target.value)}>
            <option>ABB</option>
            <option>Kirloskar Green</option>
            <option>Polycab</option>
            <option>Growatt</option>
            <option>Sungrow</option>
          </select>
        </div>
        <div className="form-group">
          <label>Structure Type</label>
          <select value={system.structureType} onChange={e => updateSystem('structureType', e.target.value)}>
            <option>Standard GI</option>
            <option>Elevated GI</option>
            <option>Aluminium Profile</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const Step3Commercials = () => {
  const { commercials, updateCommercials } = useProposal();
  
  return (
    <div className="wizard-step animate-fade-in">
      <h2>Commercials & Pricing</h2>
      <p className="step-desc">Set pricing and subsidy options.</p>
      
      <div className="form-group highlight-input">
        <label>Price per kW (₹)</label>
        <input 
          type="number" 
          value={commercials.pricePerKw} 
          onChange={e => updateCommercials('pricePerKw', Number(e.target.value))} 
        />
        <small className="help-text">Base price excluding GST.</small>
      </div>
      
      <div className="form-group checkbox-group">
        <label className="toggle-label">
          <input 
            type="checkbox" 
            checked={commercials.includeSubsidy}
            onChange={e => updateCommercials('includeSubsidy', e.target.checked)}
          />
          <span className="toggle-text">
            <strong>Apply PM Surya Ghar Subsidy</strong>
            <span>Automatically calculates and deducts the central CFA subsidy.</span>
          </span>
        </label>
      </div>

      <div className="form-group">
        <label>Installation State</label>
        <select value={commercials.state} onChange={e => updateCommercials('state', e.target.value)}>
          <option value="Maharashtra">Maharashtra (MSEDCL/Tata/Adani)</option>
          {/* Can add more states later, sticking to MH for now as requested */}
        </select>
      </div>
    </div>
  );
};

const Wizard = ({ onPreview }) => {
  const { currentStep, nextStep, prevStep } = useProposal();

  const steps = [
    { num: 1, title: 'Client', icon: <User size={18} /> },
    { num: 2, title: 'System', icon: <Sun size={18} /> },
    { num: 3, title: 'Pricing', icon: <DollarSign size={18} /> }
  ];

  return (
    <div className="wizard-container">
      {/* Stepper Header */}
      <div className="stepper-header">
        {steps.map((step) => (
          <div 
            key={step.num} 
            className={`step-indicator ${currentStep === step.num ? 'active' : ''} ${currentStep > step.num ? 'completed' : ''}`}
          >
            <div className="step-icon">{step.icon}</div>
            <span className="step-title">{step.title}</span>
            {step.num < 3 && <div className="step-line"></div>}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="step-content-area">
        {currentStep === 1 && <Step1Customer />}
        {currentStep === 2 && <Step2System />}
        {currentStep === 3 && <Step3Commercials />}
      </div>

      {/* Navigation Footer */}
      <div className="wizard-footer">
        <button 
          className="btn-outline" 
          onClick={prevStep} 
          disabled={currentStep === 1}
        >
          <ChevronLeft size={18} /> Back
        </button>
        
        {currentStep < 3 ? (
          <button className="btn-primary" onClick={nextStep}>
            Next <ChevronRight size={18} />
          </button>
        ) : (
          <button className="btn-success" onClick={onPreview}>
            Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default Wizard;
