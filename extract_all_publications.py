#!/usr/bin/env python3
"""
Comprehensive publication extractor from Google Scholar PDF text
"""
import re
import json

def extract_publications():
    with open("publications_extracted.txt", "r", encoding="utf-8") as f:
        lines = [l.rstrip() for l in f.readlines()]

    publications = []
    i = 0
    
    # Skip header
    while i < len(lines) and "TITLE CITED BY YEAR" not in lines[i]:
        i += 1
    
    if i < len(lines):
        i += 1  # Skip "TITLE CITED BY YEAR"
    
    # Process all lines
    while i < len(lines):
        line = lines[i].strip()
        
        # Skip metadata
        if not line or any(x in line for x in ['TITLE', 'CITED', 'BY', 'YEAR', 'articles', 'available', 'not available', '*', '麻省理', '托⻢斯', 'Citations', 'h-index']):
            i += 1
            continue
        
        # Try to identify a publication entry
        # Pattern 1: Title (capital, substantial) -> Authors -> Journal -> Citations Year
        if line and line[0].isupper() and len(line) > 15:
            title_parts = [line]
            i += 1
            
            # Collect title continuation (lines starting with capital, not journal/authors)
            journal_indicators = [
                'Journal', 'Angewandte', 'Nature', 'Science', 'Advanced', 'ACS', 'Sensors',
                'Dyes', 'Materials', 'Biosensors', 'Physical', 'Results', 'Bulletin', 'Chinese',
                'Green', 'Theranostics', 'Analyst', 'Analytical', 'Dalton', 'Solar', 'Scientific',
                'Energy', 'Acta', 'Cell', 'CCS', 'Aggregate', 'Chemistry', 'Bioconjugate', 'IEEE',
                'Chemical Society', 'Chemical Communications', 'Chemical Science', 'Materials Chemistry',
                'Physical Chemistry', 'The Journal of Physical Chemistry', 'Analytical Chemistry',
                'Sensors and Actuators', 'Journal of Chemical Education', 'Journal of Materials Chemistry',
                'Journal of Photochemistry', 'Biosensors and Bioelectronics', 'Advanced Science',
                'Advanced Materials', 'Advanced Functional Materials', 'Advanced Optical Materials',
                'Advanced Agrochem', 'Nature Communications', 'Nature Methods', 'Nature Chemistry',
                'Nature Synthesis', 'Chemical Society Reviews', 'CCS Chemistry', 'Theranostics',
                'Chemistry–A European Journal', 'Chemistry–An Asian Journal', 'Chemistry of Materials',
                'Chinese Chemical Letters', 'Green Chemical Engineering', 'Sensors & Diagnostics',
                'Chemical Research in Chinese Universities', 'Results in Chemistry',
                'Solar Energy Materials and Solar Cells', 'Scientific reports', 'Energy & Environmental Science',
                'Physical review letters', 'Acta Crystallographica', '清华⼤学教育研究'
            ]
            
            while (i < len(lines) and 
                   lines[i].strip() and 
                   lines[i].strip()[0].isupper() and 
                   len(lines[i].strip()) > 8 and
                   not any(ind in lines[i] for ind in journal_indicators) and
                   not (',' in lines[i] and '.' in lines[i] and len([c for c in lines[i] if c.isupper()]) > 2) and
                   not re.match(r'^\d+\s+\d{4}$', lines[i].strip()) and
                   not re.match(r'^\d{4}$', lines[i].strip()) and
                   not lines[i].strip()[0].isdigit()):
                title_parts.append(lines[i].strip())
                i += 1
            
            title = " ".join(title_parts)
            
            # Authors (has commas or multiple dots with capitals)
            if i < len(lines) and (',' in lines[i] or ('.' in lines[i] and len([c for c in lines[i] if c.isupper()]) > 2)):
                authors = lines[i].strip()
                i += 1
                
                # Journal
                if i < len(lines):
                    journal = lines[i].strip()
                    i += 1
                    
                    # Citations and year
                    citations = 0
                    year = None
                    if i < len(lines):
                        citation_line = lines[i].strip()
                        # Extract all numbers
                        nums = re.findall(r'\d+', citation_line)
                        for n in nums:
                            if len(n) == 4:
                                year = int(n)
                            elif int(n) < 1000:
                                citations = int(n)
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
    pubs = extract_publications()
    
    # Sort by year (descending), then by citations (descending)
    pubs.sort(key=lambda x: (x['year'], -x['citations']), reverse=True)
    
    print(f"✅ Extracted {len(pubs)} publications")
    from collections import Counter
    year_counts = Counter(p['year'] for p in pubs)
    print("\nPublications by year:")
    for y in sorted(year_counts.keys(), reverse=True):
        print(f"  {y}: {year_counts[y]}")
    
    # Generate JavaScript file
    js_content = "// Publications Data from Google Scholar\n"
    js_content += "// Profile: https://scholar.google.com/citations?user=giWn_7cAAAAJ&hl=en\n"
    js_content += "const publicationsData = [\n"
    
    for i, pub in enumerate(pubs):
        js_content += "    {\n"
        js_content += f'        title: "{pub["title"].replace('"', '\\"')}",\n'
        js_content += f'        authors: "{pub["authors"].replace('"', '\\"')}",\n'
        js_content += f'        journal: "{pub["journal"].replace('"', '\\"')}",\n'
        js_content += f'        year: {pub["year"]},\n'
        js_content += f'        citations: {pub["citations"]},\n'
        js_content += f'        url: "{pub["url"]}"\n'
        js_content += "    }"
        if i < len(pubs) - 1:
            js_content += ","
        js_content += "\n"
    
    js_content += "];\n"
    
    with open("publications-data.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"\n✅ Generated publications-data.js with {len(pubs)} publications")
    
    # Save JSON for inspection
    with open("publications_parsed.json", "w", encoding="utf-8") as f:
        json.dump(pubs, f, indent=2, ensure_ascii=False)

