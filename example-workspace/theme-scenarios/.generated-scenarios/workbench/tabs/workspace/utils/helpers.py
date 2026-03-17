"""
Utility functions for the tab demo project.
"""

def format_user_name(first_name, last_name):
    """Format a user's full name."""
    return f"{first_name} {last_name}".strip()

def validate_email(email):
    """Basic email validation."""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

class DataProcessor:
    def __init__(self):
        self.data = []
    
    def add_item(self, item):
        self.data.append(item)