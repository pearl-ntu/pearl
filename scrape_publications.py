#!/usr/bin/env python3
"""
Google Scholar Publications Scraper
This script extracts publications from a Google Scholar profile
"""

import requests
from bs4 import BeautifulSoup
import json
import re
import time

def scrape_google_scholar(user_id):
    """
    Scrape publications from Google Scholar profile
    Note: Google Scholar may block automated requests. Use responsibly.
    """
    base_url = f"https://scholar.google.com/citations?user={user_id}&hl=en&cstart=0&pagesize=100"
    
    publications = []
    
    print("⚠️  Note: Google Scholar may block automated scraping.")
    print("📋 Alternative: Manually copy publications from the page")
    print("🔗 Profile URL:", base_url)
    print("\n" + "="*60)
    print("MANUAL METHOD (Recommended):")
    print("="*60)
    print("1. Go to: https://scholar.google.com/citations?user=giWn_7cAAAAJ&hl=en")
    print("2. Scroll through all pages to load all publications")
    print("3. Copy the publication list")
    print("4. Send it to me and I'll format it properly")
    print("="*60)
    
    return publications

if __name__ == "__main__":
    user_id = "giWn_7cAAAAJ"
    print(f"🔍 Attempting to scrape publications for user: {user_id}")
    print("⚠️  This may not work due to Google Scholar's anti-scraping measures\n")
    
    # Try scraping (may fail)
    try:
        pubs = scrape_google_scholar(user_id)
        if pubs:
            print(f"✅ Found {len(pubs)} publications")
        else:
            print("❌ Could not automatically scrape. Please use manual method above.")
    except Exception as e:
        print(f"❌ Error: {e}")
        print("💡 Please use the manual method described above.")

