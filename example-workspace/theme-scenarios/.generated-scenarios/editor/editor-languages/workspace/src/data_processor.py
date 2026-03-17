import pandas as pd
from typing import List, Dict, Optional
import numpy as np

class DataProcessor:
    """Processes and analyzes data from various sources."""
    
    def __init__(self, data_source: str):
        self.data_source = data_source
        self.df: Optional[pd.DataFrame] = None
    
    def load_data(self) -> pd.DataFrame:
        """Load data from the configured source."""
        try:
            self.df = pd.read_csv(self.data_source)
            print(f"Loaded {len(self.df)} records")
            return self.df
        except FileNotFoundError:
            raise ValueError(f"Data source '{self.data_source}' not found")
    
    def clean_data(self) -> pd.DataFrame:
        """Remove duplicates and handle missing values."""
        if self.df is None:
            raise RuntimeError("No data loaded")
        
        # Remove duplicates
        self.df = self.df.drop_duplicates()
        
        # Fill missing numeric values with median
        numeric_cols = self.df.select_dtypes(include=[np.number]).columns
        self.df[numeric_cols] = self.df[numeric_cols].fillna(self.df[numeric_cols].median())
        
        return self.df
    
    def get_summary_stats(self) -> Dict[str, float]:
        """Calculate summary statistics for numeric columns."""
        if self.df is None:
            return {}
        
        return {
            'mean_age': self.df['age'].mean() if 'age' in self.df.columns else 0,
            'total_records': len(self.df),
            'missing_values': self.df.isnull().sum().sum()
        }