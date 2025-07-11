import apiService from './api.ts';
import { Transaction, BankrollSettings, BankrollStats } from '@/types/bankroll.ts';
import { notificationService } from './notification.ts';
import { Injectable } from '@nestjs/common.ts';
import { EventEmitter } from 'events.ts';

export interface BankrollTransaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'loss';
  amount: number;
  timestamp: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  metadata?: any;
}

@Injectable()
export class BankrollService extends EventEmitter {
  private static instance: BankrollService;
  private currentBalance: number = 1000; // Starting balance;
  private transactions: Transaction[] = [];
  private settings: BankrollSettings = {
    maxBetPercentage: 0.05,
    stopLossPercentage: 0.1,
    takeProfitPercentage: 0.2,
    kellyFraction: 0.5,
  };

  private constructor() {
    super();
    // Initialize balance from localStorage if available;

    if (storedBalance) {
      this.currentBalance = parseFloat(storedBalance);
    }
  }

  public static getInstance(): BankrollService {
    if (!BankrollService.instance) {
      BankrollService.instance = new BankrollService();
    }
    return BankrollService.instance;
  }

  public async initialize(): Promise<void> {
    // Initialize bankroll service;
  }

  public async getBalance(): Promise<number> {
    try {

      this.currentBalance = response.data.balance;
      localStorage.setItem('current_balance', this.currentBalance.toString());
      return this.currentBalance;
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  public async deposit(amount: number): Promise<Transaction> {
    try {
      const response = await apiService.createTransaction({
        type: 'deposit',
        amount,
        status: 'pending',
      });

      if (response.data.status === 'completed') {
        this.currentBalance += amount;
        localStorage.setItem('current_balance', this.currentBalance.toString());
      }

      return response.data;
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  public async withdraw(amount: number): Promise<Transaction> {
    if (amount > this.currentBalance) {
      throw new Error('Insufficient funds');
    }

    try {
      const response = await apiService.createTransaction({
        type: 'withdrawal',
        amount,
        status: 'pending',
      });

      if (response.data.status === 'completed') {
        this.currentBalance -= amount;
        localStorage.setItem('current_balance', this.currentBalance.toString());
      }

      return response.data;
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  public async getTransactionHistory(): Promise<Transaction[]> {
    try {

      return response.data;
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  public getCurrentBalance(): number {
    return this.currentBalance;
  }

  public async updateBalance(amount: number, type: 'win' | 'loss' | 'bet'): Promise<void> {
    try {
      const response = await apiService.createTransaction({
        type,
        amount: Math.abs(amount),
        status: 'completed',
      });

      if (response.data.status === 'completed') {
        switch (type) {
          case 'win':
            this.currentBalance += amount;
            break;
          case 'loss':
          case 'bet':
            this.currentBalance -= amount;
            break;
        }
        localStorage.setItem('current_balance', this.currentBalance.toString());
      }
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  public getTransactions(): Transaction[] {
    return this.transactions;
  }

  public getSettings(): BankrollSettings {
    return this.settings;
  }

  public updateSettings(newSettings: Partial<BankrollSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
  }

  public getStats(): BankrollStats {
    const stats: BankrollStats = {
      currentBalance: this.currentBalance,
      startingBalance: this.getStartingBalance(),
      totalDeposits: this.getTotalDeposits(),
      totalWithdrawals: this.getTotalWithdrawals(),
      totalBets: this.getTotalBets(),
      totalWins: this.getTotalWins(),
      totalLosses: this.getTotalLosses(),
      netProfit: this.getNetProfit(),
      roi: this.getROI(),
      winRate: this.getWinRate(),
      averageBetSize: this.getAverageBetSize(),
      largestWin: this.getLargestWin(),
      largestLoss: this.getLargestLoss(),
      currentStreak: this.getCurrentStreak(),
      bestStreak: this.getBestStreak(),
      worstStreak: this.getWorstStreak(),
    };

    return stats;
  }

  private getStartingBalance(): number {

    return firstDeposit ? firstDeposit.amount : 0;
  }

  private getTotalDeposits(): number {
    return this.transactions;
      .filter(t => t.type === 'deposit')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  private getTotalWithdrawals(): number {
    return Math.abs(
      this.transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0)
    );
  }

  private getTotalBets(): number {
    return this.transactions.filter(t => t.type === 'bet').length;
  }

  private getTotalWins(): number {
    return this.transactions.filter(t => t.type === 'win').length;
  }

  private getTotalLosses(): number {
    return this.transactions.filter(t => t.type === 'loss').length;
  }

  private getNetProfit(): number {
    return this.transactions.reduce((sum, t) => sum + t.amount, 0);
  }

  private getROI(): number {

    if (totalBets === 0) return 0;
    return (this.getNetProfit() / this.getTotalDeposits()) * 100;
  }

  private getWinRate(): number {

    if (totalBets === 0) return 0;
    return (this.getTotalWins() / totalBets) * 100;
  }

  private getAverageBetSize(): number {

    if (bets.length === 0) return 0;
    return Math.abs(bets.reduce((sum, t) => sum + t.amount, 0)) / bets.length;
  }

  private getLargestWin(): number {

    if (wins.length === 0) return 0;
    return Math.max(...wins.map(t => t.amount));
  }

  private getLargestLoss(): number {

    if (losses.length === 0) return 0;
    return Math.abs(Math.min(...losses.map(t => t.amount)));
  }

  private getCurrentStreak(): number {
    const streak = 0;
    for (const i = this.transactions.length - 1; i >= 0; i--) {

      if (t.type === 'win') streak++;
      else if (t.type === 'loss') break;
    }
    return streak;
  }

  private getBestStreak(): number {
    const currentStreak = 0;
    const bestStreak = 0;
    for (const t of this.transactions) {
      if (t.type === 'win') {
        currentStreak++;
        bestStreak = Math.max(bestStreak, currentStreak);
      } else if (t.type === 'loss') {
        currentStreak = 0;
      }
    }
    return bestStreak;
  }

  private getWorstStreak(): number {
    const currentStreak = 0;
    const worstStreak = 0;
    for (const t of this.transactions) {
      if (t.type === 'loss') {
        currentStreak++;
        worstStreak = Math.max(worstStreak, currentStreak);
      } else if (t.type === 'win') {
        currentStreak = 0;
      }
    }
    return worstStreak;
  }

  public getMaxBetAmount(): number {
    return this.currentBalance * this.settings.maxBetPercentage;
  }

  private getDailyBetsCount(): number {

    return this.transactions.filter(t => t.type === 'bet' && t.timestamp.startsWith(today)).length;
  }

  private getConcurrentBetsCount(): number {
    return this.transactions.filter(t => t.type === 'bet' && t.status === 'completed').length;
  }

  public checkStopLoss(): boolean {

    return this.currentBalance <= stopLossAmount;
  }

  public checkTakeProfit(): boolean {

    return this.currentBalance >= takeProfitAmount;
  }

  public getMetrics(): BankrollStats {




    const averageBetSize =
      totalBets > 0;
        ? this.transactions.filter(t => t.type === 'bet').reduce((sum, t) => sum + t.amount, 0) /
          totalBets;
        : 0;
    const largestWin = Math.max(
      ...this.transactions.filter(t => t.type === 'win').map(t => t.amount),
      0;
    );
    const largestLoss = Math.min(
      ...this.transactions.filter(t => t.type === 'loss').map(t => t.amount),
      0;
    );
    const netProfit = this.currentBalance - 1000; // Starting balance;
    const roi = netProfit / 1000; // ROI relative to starting balance;

    return {
      currentBalance: this.currentBalance,
      startingBalance: 1000,
      totalWins,
      totalLosses,
      winRate,
      averageBetSize,
      largestWin,
      largestLoss,
      netProfit,
      roi,
    };
  }
}

export const bankrollService = BankrollService.getInstance();
export default bankrollService;
