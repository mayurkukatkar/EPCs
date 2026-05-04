/**
 * Calculates PM Surya Ghar Subsidy based on system capacity
 * @param {number} capacity - System capacity in kW
 * @returns {number} Subsidy amount in INR
 */
export const calculateSubsidy = (capacity) => {
  if (!capacity || capacity <= 0) return 0;
  
  if (capacity <= 2) {
    return capacity * 30000;
  } else if (capacity > 2 && capacity < 3) {
    return 60000 + ((capacity - 2) * 18000);
  } else {
    // Capped at 3kW value (78,000) for standard residential
    return 78000;
  }
};

/**
 * Calculates comprehensive financial metrics for the proposal
 * @param {number} capacity - System capacity in kW
 * @param {number} pricePerKw - Cost per kW in INR
 * @param {number} currentMonthlyBill - Current monthly electricity bill in INR
 * @param {boolean} includeSubsidy - Whether to deduct subsidy
 * @returns {Object} Financial metrics
 */
export const calculateFinancials = (capacity, pricePerKw, currentMonthlyBill, includeSubsidy) => {
  const gstRate = 0.138; // 13.8% composite GST for solar in India
  
  // Gross Cost
  const baseCost = capacity * pricePerKw;
  const gstAmount = baseCost * gstRate;
  const grossCost = baseCost + gstAmount;
  
  // Subsidy
  const subsidyAmount = includeSubsidy ? calculateSubsidy(capacity) : 0;
  
  // Net Cost
  const netCost = grossCost - subsidyAmount;
  
  // Generation (Avg 4.5 units per kW per day in Maharashtra)
  const dailyGeneration = capacity * 4.5;
  const monthlyGeneration = dailyGeneration * 30;
  const annualGeneration = dailyGeneration * 365;
  
  // Savings (Assuming average MSEDCL tariff of ~8.5 INR/unit for calculation if bill not provided)
  // Or derive effective rate from bill:
  const assumedUnitRate = 8.5; 
  // We'll just use unit rate * generation for savings, capped at current bill to be conservative, 
  // or we can show total value generated. Let's show total value generated.
  const monthlySavings = monthlyGeneration * assumedUnitRate;
  const annualSavings = monthlySavings * 12;
  const total25YearSavings = annualSavings * 25; // Without considering tariff inflation (which is ~3-5% yearly)
  
  // ROI & Payback
  const paybackYears = netCost / annualSavings;
  const roiPercentage = (annualSavings / netCost) * 100;
  
  // Environmental Impact (Over 25 years)
  // Approx 0.8 tons of CO2 offset per kW per year
  const co2OffsetTons = capacity * 0.8 * 25;
  // Approx 31 trees equivalent per kW over lifetime
  const treesEquivalent = capacity * 31;
  
  return {
    grossCost,
    gstAmount,
    subsidyAmount,
    netCost,
    monthlyGeneration,
    annualGeneration,
    monthlySavings,
    annualSavings,
    total25YearSavings,
    paybackYears,
    roiPercentage,
    co2OffsetTons,
    treesEquivalent
  };
};

/**
 * Formats currency in Indian Rupee format
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (num, decimals = 1) => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals
  }).format(num);
};
