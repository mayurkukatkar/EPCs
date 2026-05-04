import React, { createContext, useState, useContext } from 'react';

const ProposalContext = createContext();

export const useProposal = () => useContext(ProposalContext);

const initialCustomerState = {
  name: '',
  phone: '',
  address: '',
  monthlyBill: 2500, // Default in INR
  sanctionedLoad: 3, // Default in kW
};

const initialSystemState = {
  capacity: 3, // kW
  panelBrand: 'Waaree',
  panelWattage: 540,
  inverterBrand: 'ABB',
  inverterCapacity: 3,
  structureType: 'Standard GI',
};

const initialCommercialState = {
  pricePerKw: 55000,
  includeSubsidy: true,
  state: 'Maharashtra', // Default to MH as requested
};

const initialCompanyState = {
  name: 'Ekvarta Energy Solutions',
  tagline: 'The Best Solar Energy For Your Home',
  email: 'energyekvarta@gmail.com',
  phone: '8551800208, 8208079925',
  address: 'Pipla Phata sq., Hudkeshwar rd, Nagpur 440034',
};

export const ProposalProvider = ({ children }) => {
  const [customer, setCustomer] = useState(initialCustomerState);
  const [system, setSystem] = useState(initialSystemState);
  const [commercials, setCommercials] = useState(initialCommercialState);
  const [company, setCompany] = useState(initialCompanyState);
  const [currentStep, setCurrentStep] = useState(1);

  // Helper to update specific context areas
  const updateCustomer = (key, value) => setCustomer(prev => ({ ...prev, [key]: value }));
  const updateSystem = (key, value) => setSystem(prev => ({ ...prev, [key]: value }));
  const updateCommercials = (key, value) => setCommercials(prev => ({ ...prev, [key]: value }));
  const updateCompany = (key, value) => setCompany(prev => ({ ...prev, [key]: value }));

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <ProposalContext.Provider
      value={{
        customer, updateCustomer,
        system, updateSystem,
        commercials, updateCommercials,
        company, updateCompany,
        currentStep, setCurrentStep,
        nextStep, prevStep
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
};
