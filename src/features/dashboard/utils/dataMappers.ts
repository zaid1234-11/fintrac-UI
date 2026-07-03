import { format, subMonths, parseISO, isSameMonth } from 'date-fns';

export function mapKPIs(behavioralProfile: any, telemetry: any, transactions: any[]) {
  // Mock savings if real data isn't calculating it yet
  const savingsAmount = 24500; 
  const deltaPercent = 12;

  const healthScore = behavioralProfile?.financial_wellness_score ?? 70;
  
  // Extract friction updates count from telemetry if available
  const frictionCount = telemetry?.metrics?.friction_updates_completed ? 
    Object.keys(telemetry.metrics).length : 4;

  return {
    savings: { amount: savingsAmount, deltaPercent },
    healthScore,
    frictionCount,
  };
}

export function mapSpendingData(transactions: any[]): any[] {
  // Generate last 6 months + next 3 months outline
  const points = [];
  const today = new Date();
  
  // Backwards 6 months
  for (let i = 5; i >= 0; i--) {
    const d = subMonths(today, i);
    const monthStr = format(d, 'MMM');
    
    // Sum transactions for this month (debits only)
    const monthTx = transactions?.filter(t => t.type === 'debit' && isSameMonth(parseISO(t.date), d)) || [];
    const actual = monthTx.reduce((sum, t) => sum + t.amount, 0);
    
    points.push({
      month: monthStr,
      actual: actual > 0 ? actual : (i === 0 ? null : 15000), // Default placeholder if no data for old months
      forecast: null,
      budget: 45000 // Placeholder budget
    });
  }
  
  // Forwards 3 months (mock forecast)
  for (let i = 1; i <= 3; i++) {
    const d = subMonths(today, -i);
    const monthStr = format(d, 'MMM');
    points.push({
      month: monthStr,
      actual: null,
      forecast: 40000 - (i * 1000), // Mock forecast
      budget: 45000
    });
  }

  return points;
}

export function mapCategoryData(transactions: any[]): any[] {
  if (!transactions || transactions.length === 0) {
    return [
      { name: "Groceries", percentage: 40, amount: 12000, healthScore: 80 },
      { name: "Transport", percentage: 20, amount: 6000, healthScore: 65 },
      { name: "Dining", percentage: 40, amount: 12000, healthScore: 40 }
    ];
  }

  const debits = transactions.filter(t => t.type === 'debit');
  const total = debits.reduce((sum, t) => sum + t.amount, 0);

  const categoryMap = debits.reduce((acc: any, t: any) => {
    const catName = t.categories?.name || 'Uncategorized';
    acc[catName] = (acc[catName] || 0) + t.amount;
    return acc;
  }, {});

  const result = Object.keys(categoryMap).map(name => {
    const amount = categoryMap[name];
    const percentage = Math.round((amount / total) * 100);
    // Determine a fake health score based on category for now
    const healthScore = name === 'Groceries' ? 85 : name === 'Dining' ? 45 : 70;
    return { name, percentage, amount, healthScore };
  });

  return result.sort((a, b) => b.amount - a.amount).slice(0, 5); // Top 5
}
