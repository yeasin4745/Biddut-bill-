
  const rates = [
   { min: 0, max: 50, rate: 4.63, name: "lifeline" },
   { min: 51, max: 75, rate: 5.26, name: "first" },
   { min: 76, max: 200, rate: 7.20, name: "second" },
   { min: 201, max: 300, rate: 7.59, name: "third" },
   { min: 301, max: 400, rate: 8.02, name: "fourth" },
   { min: 401, max: 600, rate: 12.67, name: "fifth" },
   { min: 601, max: Infinity, rate: 14.61, name: "sixth" }
  ];
  
  // Clear all table values
  function clearTable() {
   const fields = ['lifeUnit', 'lifeTk', 'firstUnit', 'firstTk', 'secondUnit', 'secondTk',
    'thirdUnit', 'thirdTk', 'fourUnit', 'fourTK', 'fiveUnit', 'fiveTk',
    'sixUnit', 'sixTk'
   ];
   
   fields.forEach(field => {
    const element = document.getElementById(field);
    if (element) {
     element.innerHTML = field.includes('Unit') ? '0' : '0.00';
    }
   });
  }
  
  // Calculate bill for given units
  function calculateBill() {
   const inputUnit = document.getElementById('Unit').value;
   const totalUnits = parseFloat(inputUnit);
   
   // Input validation
   if (!totalUnits || totalUnits < 0) {
    alert("Enter unit . ");
    return;
   }
   
   // Clear previous calculations
   clearTable();
   
   let remainingUnits = totalUnits;
   let totalCost = 0;
   
   // Calculate for each tier
   for (let i = 0; i < rates.length; i++) {
    const tier = rates[i];
    
    if (remainingUnits <= 0) break;
    
    // Calculate units for this tier
    let unitsInThisTier;
    if (tier.max === Infinity) {
     unitsInThisTier = remainingUnits;
    } else {
     const maxUnitsForTier = tier.max - tier.min + 1;
     unitsInThisTier = Math.min(remainingUnits, maxUnitsForTier);
    }
    
    // Only process if we have units in this tier
    if (totalUnits >= tier.min) {
     const cost = unitsInThisTier * tier.rate;
     totalCost += cost;
     
     // Update the table based on tier
     updateTableRow(i, unitsInThisTier, cost);
     
     remainingUnits -= unitsInThisTier;
    }
   }
   
   // Update total and summary
   document.getElementById('totalCharge').innerHTML = `<strong>${totalCost.toFixed(2)}</strong>`;
   updateSummary(totalUnits, totalCost);
  }
  
  // Update table row based on tier index
  function updateTableRow(tierIndex, units, cost) {
   const unitFields = ['lifeUnit', 'firstUnit', 'secondUnit', 'thirdUnit', 'fourUnit', 'fiveUnit', 'sixUnit'];
   const costFields = ['lifeTk', 'firstTk', 'secondTk', 'thirdTk', 'fourTK', 'fiveTk', 'sixTk'];
   
   if (tierIndex < unitFields.length) {
    document.getElementById(unitFields[tierIndex]).innerHTML = units.toString();
    document.getElementById(costFields[tierIndex]).innerHTML = cost.toFixed(2);
   }
  }
  
  // Update summary section
  function updateSummary(totalUnits, energyCost) {
   const vat = energyCost * 0.05; // 5% VAT
   const finalTotal = energyCost + vat;
   
   document.getElementById('totalUnits').innerHTML = totalUnits.toString();
   document.getElementById('energyCharge').innerHTML = energyCost.toFixed(2);
   document.getElementById('vat').innerHTML = vat.toFixed(2);
   document.getElementById('finalTotal').innerHTML = finalTotal.toFixed(2);
   
   // Show summary section
   document.getElementById('summary').style.display = 'block';
  }
  
  // Allow Enter key to trigger calculation
  document.getElementById('Unit').addEventListener('keypress', function(event) {
   if (event.key === 'Enter') {
    calculateBill();
   }
  });
