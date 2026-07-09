'use client';

import { useState, useEffect } from 'react';
import type { Transaction, MonthlySnapshot } from '../types';
import { parseSearchQuery, applySearchFilters } from '../utils/searchParser';

// Generate mock data for the AI Review Workspace
function generateMockTransactions(count: number): Transaction[] {
  const merchants = [
    { name: 'Amazon', cat: 'Shopping', rec: false, conf: 0.98 },
    { name: 'Netflix', cat: 'Entertainment', rec: true, conf: 0.99 },
    { name: 'Uber', cat: 'Transport', rec: false, conf: 0.85 },
    { name: 'Swiggy', cat: 'Food Delivery', rec: false, conf: 0.92 },
    { name: 'Zomato', cat: 'Food Delivery', rec: false, conf: 0.88 },
    { name: 'FreshToHome', cat: 'Groceries', rec: false, conf: 0.61, rev: true },
    { name: 'Blinkit', cat: 'Groceries', rec: false, conf: 0.95 },
    { name: 'Salary', cat: 'Income', dir: 'inflow', rec: true, conf: 0.99 },
    { name: 'Unknown POS 8842', cat: 'Uncategorized', rec: false, conf: 0.2, rev: true },
    { name: 'Starbucks', cat: 'Food & Dining', rec: false, conf: 0.90 },
  ];

  return Array.from({ length: count }).map((_, i) => {
    const m = merchants[i % merchants.length];
    const isReview = m.rev || Math.random() > 0.95;
    const amount = m.dir === 'inflow' ? 75000 : Math.floor(Math.random() * 2000) + 100;
    
    // Distribute dates over the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - (i % 30));

    return {
      id: `tx_${i}_${Date.now()}`,
      merchant: m.name,
      amount,
      category: isReview ? (Math.random() > 0.5 ? 'Uncategorized' : m.cat) : m.cat,
      direction: (m.dir as 'inflow' | 'outflow') || 'outflow',
      date: date.toISOString(),
      confidence: isReview ? Math.random() * 0.5 + 0.2 : m.conf,
      reviewStatus: isReview ? 'needs_review' : 'auto_categorized',
      recurring: m.rec || false,
      anomalyType: isReview ? (Math.random() > 0.5 ? 'new_merchant' : 'category_conflict') : 'none',
      explanation: isReview 
        ? 'Merchant resembles previous patterns but lacks sufficient history.' 
        : `Matched merchant memory. Seen ${Math.floor(Math.random() * 20) + 5} previous times.`,
      evidence: [{ type: 'sms', content: `Spent ₹${amount} at ${m.name} via UPI.` }],
      merchantMemoryMatched: !isReview,
      correctedByUser: false,
      tags: m.rec ? ['Subscription'] : [],
    };
  });
}

const mockTransactions = generateMockTransactions(1000); // 1000 items for virtualization test

export function useTransactions() {
  const [query, setQuery] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredTransactions = applySearchFilters(transactions, parseSearchQuery(query));

  const snapshot: MonthlySnapshot = {
    spent: transactions.filter(t => t.direction === 'outflow').reduce((acc, t) => acc + t.amount, 0),
    income: transactions.filter(t => t.direction === 'inflow').reduce((acc, t) => acc + t.amount, 0),
    savingsRate: 41, // Mock
    transactionsCount: transactions.length,
    autoCategorizedCount: transactions.filter(t => t.reviewStatus === 'auto_categorized').length,
    needsReviewCount: transactions.filter(t => t.reviewStatus === 'needs_review').length,
  };

  return {
    transactions: filteredTransactions,
    loading,
    query,
    setQuery,
    snapshot,
  };
}
