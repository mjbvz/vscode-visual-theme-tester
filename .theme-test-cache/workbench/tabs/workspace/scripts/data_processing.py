#!/usr/bin/env python3
"""
Data processing utilities for the Express TypeScript application.
Handles data transformation, validation, and export operations.
"""

import json
import csv
import os
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
import pandas as pd

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class User:
    """User data model"""
    id: int
    name: str
    email: str
    created_at: datetime
    is_active: bool = True
    metadata: Optional[Dict[str, Any]] = None

class DataProcessor:
    """Main data processing class"""
    
    def __init__(self, data_dir: str = "data"):
        self.data_dir = data_dir
        self.ensure_data_directory()
    
    def ensure_data_directory(self) -> None:
        """Create data directory if it doesn't exist"""
        if not os.path.exists(self.data_dir):
            os.makedirs(self.data_dir)
            logger.info(f"Created data directory: {self.data_dir}")
    
    def load_users_from_json(self, filename: str) -> List[User]:
        """Load users from JSON file"""
        filepath = os.path.join(self.data_dir, filename)
        
        try:
            with open(filepath, 'r') as file:
                data = json.load(file)
                users = []
                
                for user_data in data:
                    user = User(
                        id=user_data['id'],
                        name=user_data['name'],
                        email=user_data['email'],
                        created_at=datetime.fromisoformat(user_data['created_at']),
                        is_active=user_data.get('is_active', True),
                        metadata=user_data.get('metadata')
                    )
                    users.append(user)
                
                logger.info(f"Loaded {len(users)} users from {filename}")
                return users
                
        except FileNotFoundError:
            logger.error(f"File not found: {filepath}")
            return []
        except json.JSONDecodeError:
            logger.error(f"Invalid JSON in file: {filepath}")
            return []
    
    def export_to_csv(self, users: List[User], filename: str) -> bool:
        """Export users to CSV file"""
        filepath = os.path.join(self.data_dir, filename)
        
        try:
            with open(filepath, 'w', newline='') as file:
                writer = csv.writer(file)
                
                # Write header
                writer.writerow(['ID', 'Name', 'Email', 'Created At', 'Active'])
                
                # Write data
                for user in users:
                    writer.writerow([
                        user.id,
                        user.name,
                        user.email,
                        user.created_at.isoformat(),
                        user.is_active
                    ])
                
                logger.info(f"Exported {len(users)} users to {filename}")
                return True
                
        except Exception as e:
            logger.error(f"Error exporting to CSV: {e}")
            return False
    
    def filter_active_users(self, users: List[User]) -> List[User]:
        """Filter only active users"""
        active_users = [user for user in users if user.is_active]
        logger.info(f"Filtered {len(active_users)} active users from {len(users)} total")
        return active_users
    
    def get_recent_users(self, users: List[User], days: int = 30) -> List[User]:
        """Get users created within the specified number of days"""
        cutoff_date = datetime.now() - timedelta(days=days)
        recent_users = [user for user in users if user.created_at > cutoff_date]
        logger.info(f"Found {len(recent_users)} users created in the last {days} days")
        return recent_users
    
    def generate_user_stats(self, users: List[User]) -> Dict[str, Any]:
        """Generate statistics about users"""
        if not users:
            return {}
        
        total_users = len(users)
        active_users = len([u for u in users if u.is_active])
        inactive_users = total_users - active_users
        
        # Get creation dates for analysis
        creation_dates = [user.created_at for user in users]
        oldest_user_date = min(creation_dates)
        newest_user_date = max(creation_dates)
        
        stats = {
            'total_users': total_users,
            'active_users': active_users,
            'inactive_users': inactive_users,
            'activity_rate': (active_users / total_users) * 100,
            'oldest_user_created': oldest_user_date.isoformat(),
            'newest_user_created': newest_user_date.isoformat(),
            'date_range_days': (newest_user_date - oldest_user_date).days
        }
        
        logger.info(f"Generated stats for {total_users} users")
        return stats

def main():
    """Main function for command-line usage"""
    processor = DataProcessor()
    
    # Example usage
    sample_users = [
        User(1, "John Doe", "john@example.com", datetime.now() - timedelta(days=10)),
        User(2, "Jane Smith", "jane@example.com", datetime.now() - timedelta(days=5)),
        User(3, "Bob Johnson", "bob@example.com", datetime.now() - timedelta(days=45), False),
    ]
    
    # Export to CSV
    processor.export_to_csv(sample_users, "sample_users.csv")
    
    # Generate and print stats
    stats = processor.generate_user_stats(sample_users)
    print(json.dumps(stats, indent=2))

if __name__ == "__main__":
    main()