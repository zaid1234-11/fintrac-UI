import { Transaction } from '../types';

export interface StructuredSearch {
  text: string;
  category?: string;
  amountGreaterThan?: number;
  paymentMethod?: string;
  timeframe?: 'last_month' | 'this_month' | 'this_year';
  needsReview?: boolean;
}

export function parseSearchQuery(query: string): StructuredSearch {
  const structured: StructuredSearch = { text: '' };
  const tokens = query.split(/\s+/);
  const textTokens: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].toLowerCase();
    
    if (token.startsWith('>')) {
      const command = token.slice(1);
      
      if (command === 'food' || command === 'shopping' || command === 'transport') {
        structured.category = command;
      } else if (command === 'upi' || command === 'credit') {
        structured.paymentMethod = command;
      } else if (command === 'last') {
        if (tokens[i + 1]?.toLowerCase() === 'month') {
          structured.timeframe = 'last_month';
          i++; // skip 'month'
        }
      } else if (command === 'over' || command === 'above') {
        const amount = parseInt(tokens[i + 1]?.replace(/[^0-9]/g, '') || '0', 10);
        if (amount > 0) {
          structured.amountGreaterThan = amount;
          i++;
        }
      } else if (command === 'needs') {
        if (tokens[i + 1]?.toLowerCase() === 'review') {
          structured.needsReview = true;
          i++;
        }
      } else {
        textTokens.push(tokens[i]); // If it's a > word we don't recognize, treat as text
      }
    } else {
      textTokens.push(tokens[i]);
    }
  }

  structured.text = textTokens.join(' ').trim();
  return structured;
}

export function applySearchFilters(transactions: Transaction[], search: StructuredSearch): Transaction[] {
  return transactions.filter(t => {
    // 1. Text search
    if (search.text) {
      const matchText = search.text.toLowerCase();
      if (!t.merchant.toLowerCase().includes(matchText) && 
          !t.category.toLowerCase().includes(matchText)) {
        return false;
      }
    }
    
    // 2. Category
    if (search.category && !t.category.toLowerCase().includes(search.category)) {
      return false;
    }
    
    // 3. Amount > X
    if (search.amountGreaterThan !== undefined && t.amount <= search.amountGreaterThan) {
      return false;
    }
    
    // 4. Needs Review
    if (search.needsReview && t.reviewStatus !== 'needs_review') {
      return false;
    }
    
    // (Payment method and timeframe logic would be implemented here with real date/source fields)
    
    return true;
  });
}
