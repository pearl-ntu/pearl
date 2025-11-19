#!/usr/bin/env python3
"""
Parse publications from extracted PDF text
"""
import re
import json

def parse_publications():
    with open("publications_extracted.txt", "r", encoding="utf-8") as f:
        lines = [l.strip() for l in f.readlines()]

    publications = []
    skip_patterns = [
        'TITLE', 'CITED', 'BY', 'YEAR', 'articles', 'available', 'not available',
        'Citations', 'h-index', 'i10-index', 'All Since', 'Based on', 'Xiaogang',
        'Nanyang', 'Fluorescence', 'Photochemistry', 'Physical Chemistry',
        'Fluorescent Dyes', 'Molecular Design'
    ]
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Skip header/metadata lines
        if any(p in line for p in skip_patterns) or not line:
            i += 1
            continue
        
        # Pattern: Title (1-3 lines) -> Authors -> Journal -> Citations Year
        # Title starts with capital, is substantial length
        if line and line[0].isupper() and len(line) > 15:
            # Collect title (may span multiple lines)
            title_lines = [line]
            i += 1
            
            # Continue title if next line also starts with capital and doesn't look like journal
            journal_indicators = ['Journal', 'Angewandte', 'Nature', 'Science', 'Advanced', 
                                 'ACS', 'Sensors', 'Dyes', 'Materials', 'Biosensors', 'Physical',
                                 'Results', 'Bulletin', 'Chinese', 'Green', 'Theranostics',
                                 'Analyst', 'Analytical', 'Dalton', 'Solar', 'Scientific',
                                 'Energy', 'Acta', 'Cell', 'CCS', 'Aggregate', 'Chemistry',
                                 'Bioconjugate', 'B:', 'A:', 'C:', 'IEEE', 'Theranostics']
            
            while (i < len(lines) and lines[i] and 
                   lines[i][0].isupper() and 
                   len(lines[i]) > 10 and
                   not any(ind in lines[i] for ind in journal_indicators) and
                   not re.match(r'^[A-Z][a-z]+,.*', lines[i]) and  # Not authors (has comma)
                   not re.match(r'^\d+\s+\d{4}$', lines[i])):  # Not citations year
                title_lines.append(lines[i])
                i += 1
            
            title = " ".join(title_lines)
            
            # Authors (next line, has commas or dots)
            if i < len(lines) and (',' in lines[i] or '.' in lines[i]):
                authors = lines[i]
                i += 1
                
                # Journal (next line)
                if i < len(lines):
                    journal = lines[i]
                    i += 1
                    
                    # Citations and Year (next line)
                    citations = 0
                    year = None
                    if i < len(lines):
                        citation_line = lines[i]
                        # Extract all numbers
                        numbers = re.findall(r'\d+', citation_line)
                        for num_str in numbers:
                            num = int(num_str)
                            if len(num_str) == 4:  # Year
                                year = num
                            elif num < 1000:  # Citations
                                citations = num
                        i += 1
                    
                    if title and authors and journal and year:
                        publications.append({
                            "title": title,
                            "authors": authors,
                            "journal": journal,
                            "year": year,
                            "citations": citations,
                            "url": "https://scholar.google.com/citations?user=giWn_7cAAAAJ&hl=en"
                        })
            else:
                i += 1
        else:
            i += 1
    
    return publications

if __name__ == "__main__":
    pubs = parse_publications()
    print(f"✅ Parsed {len(pubs)} publications")
    
    # Save to JSON
    with open("publications_parsed.json", "w", encoding="utf-8") as f:
        json.dump(pubs, f, indent=2, ensure_ascii=False)
    
    # Show sample
    print("\nSample publications:")
    for i, pub in enumerate(pubs[:5], 1):
        print(f"\n{i}. {pub['title'][:60]}...")
        print(f"   {pub['year']}, {pub['citations']} citations")

