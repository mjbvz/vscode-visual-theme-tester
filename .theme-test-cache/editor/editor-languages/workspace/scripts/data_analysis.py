#!/usr/bin/env python3
"""
Advanced data analysis script for processing sales data
Uses pandas, numpy, and matplotlib for comprehensive analysis
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
import asyncio
import aiohttp

class SalesAnalyzer:
    def __init__(self, data_path: str):
        self.data_path = data_path
        self.df: Optional[pd.DataFrame] = None
        
    async def load_data(self) -> pd.DataFrame:
        """Load sales data from CSV with async processing"""
        try:
            self.df = pd.read_csv(self.data_path)
            self.df['date'] = pd.to_datetime(self.df['date'])
            print(f"✓ Loaded {len(self.df)} sales records")
            return self.df
        except Exception as e:
            raise ValueError(f"Failed to load data: {e}")

    def calculate_metrics(self) -> Dict[str, float]:
        """Calculate key sales metrics"""
        if self.df is None:
            raise ValueError("Data not loaded. Call load_data() first.")
        
        return {
            'total_revenue': self.df['amount'].sum(),
            'avg_order_value': self.df['amount'].mean(),
            'median_order_value': self.df['amount'].median(),
            'conversion_rate': len(self.df[self.df['status'] == 'completed']) / len(self.df) * 100
        }

    def trend_analysis(self, window_days: int = 7) -> pd.DataFrame:
        """Perform rolling window trend analysis"""
        daily_sales = self.df.groupby(self.df['date'].dt.date)['amount'].sum()
        rolling_avg = daily_sales.rolling(window=window_days, center=True).mean()
        
        trend_data = pd.DataFrame({
            'date': daily_sales.index,
            'daily_sales': daily_sales.values,
            'rolling_avg': rolling_avg.values
        })
        
        return trend_data

    def plot_sales_trends(self, save_path: str = 'sales_trends.png'):
        """Generate comprehensive sales trend visualization"""
        fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 10))
        
        # Daily sales trend
        trend_data = self.trend_analysis()
        ax1.plot(trend_data['date'], trend_data['daily_sales'], 
                alpha=0.6, label='Daily Sales', color='skyblue')
        ax1.plot(trend_data['date'], trend_data['rolling_avg'], 
                label='7-Day Moving Average', color='navy', linewidth=2)
        ax1.set_title('Sales Trends Over Time')
        ax1.legend()
        ax1.grid(True, alpha=0.3)
        
        # Sales distribution
        ax2.hist(self.df['amount'], bins=50, alpha=0.7, color='lightcoral')
        ax2.axvline(self.df['amount'].mean(), color='red', linestyle='--', 
                   label=f'Mean: ${self.df["amount"].mean():.2f}')
        ax2.set_title('Sales Amount Distribution')
        ax2.legend()
        ax2.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
        print(f"📊 Chart saved to {save_path}")

if __name__ == "__main__":
    analyzer = SalesAnalyzer('data/sales.csv')
    
    # Run async analysis
    async def main():
        await analyzer.load_data()
        metrics = analyzer.calculate_metrics()
        
        print("\n📈 Sales Metrics:")
        for key, value in metrics.items():
            if 'rate' in key:
                print(f"  {key}: {value:.1f}%")
            else:
                print(f"  {key}: ${value:,.2f}")
        
        analyzer.plot_sales_trends()
    
    asyncio.run(main())