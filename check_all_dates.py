#!/usr/bin/env python3
"""Check all dates in the SQL file to see what years are present"""

import re

with open('xiaogang_liu/xiaogang_liu-wp1.sql', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Find all date patterns in INSERT INTO wp_posts
# Format: 'YYYY-MM-DD HH:MM:SS'
date_pattern = r"'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})'"

# Find all dates
all_dates = re.findall(date_pattern, content)

# Extract years
years = {}
for date_str in all_dates:
    year = date_str[:4]
    if year.isdigit():
        years[year] = years.get(year, 0) + 1

print(f"Total dates found: {len(all_dates)}")
print(f"\nDates by year:")
for year in sorted(years.keys()):
    print(f"  {year}: {years[year]} entries")

# Check for dates after 2019
recent_dates = [d for d in all_dates if d[:4] > '2019']
print(f"\nDates after 2019: {len(recent_dates)}")
if recent_dates:
    print("Sample recent dates:")
    for date in sorted(recent_dates)[-10:]:
        print(f"  {date}")
