#!/usr/bin/env python3
import re
import json

with open("publications_extracted.txt", "r", encoding="utf-8") as f:
    lines = [l.strip() for l in f.readlines()]

publications = []
state = "looking"  # looking, title, authors, journal, citations
current = {}

skip = ['TITLE', 'CITED', 'BY', 'YEAR', 'articles', 'available', 'not available',
        'Citations', 'h-index', 'i10-index', 'All Since', 'Based on', 'Xiaogang',
        'Nanyang', 'Fluorescence', 'Photochemistry', 'Physical Chemistry',
        'Fluorescent Dyes', 'Molecular Design', '麻省理', '托⻢斯']

for i, line in enumerate(lines):
    if not line or any(s in line for s in skip):
        continue
    
    # Detect state transitions
    if state == "looking":
        # Start of new publication: line starts with capital, is substantial
        if line[0].isupper() and len(line) > 15 and not line[0].isdigit():
            current = {"title": line, "authors": "", "journal": "", "year": None, "citations": 0}
            state = "title"
    elif state == "title":
        # Continue title if: starts with capital, not journal name, not authors pattern
        if (line[0].isupper() and len(line) > 10 and 
            not any(x in line for x in ['Journal', 'Angewandte', 'Nature', 'Science', 'Advanced', 'ACS', 'Sensors', 'Dyes', 'Materials', 'Biosensors', 'Physical', 'Results', 'Bulletin', 'Chinese', 'Green', 'Theranostics', 'Analyst', 'Analytical', 'Dalton', 'Solar', 'Scientific', 'Energy', 'Acta', 'Cell', 'CCS', 'Aggregate', 'Chemistry', 'Bioconjugate', 'IEEE']) and
            not (',' in line and '.' in line)):  # Not authors
            current["title"] += " " + line
        else:
            state = "authors"
            # This line might be authors or journal
            if ',' in line or ('.' in line and len([c for c in line if c.isupper()]) > 2):
                current["authors"] = line
                state = "journal"
            else:
                current["journal"] = line
                state = "citations"
    elif state == "authors":
        current["authors"] = line
        state = "journal"
    elif state == "journal":
        current["journal"] = line
        state = "citations"
    elif state == "citations":
        # Extract citations and year
        nums = re.findall(r'\d+', line)
        for n in nums:
            if len(n) == 4:
                current["year"] = int(n)
            elif int(n) < 1000:
                current["citations"] = int(n)
        
        # Save publication if complete
        if current.get("title") and current.get("authors") and current.get("journal") and current.get("year") is not None:
            current["url"] = "https://scholar.google.com/citations?user=giWn_7cAAAAJ&hl=en"
            publications.append(current.copy())
        
        state = "looking"
        current = {}

# Save
with open("publications_parsed.json", "w", encoding="utf-8") as f:
    json.dump(publications, f, indent=2, ensure_ascii=False)

print(f"✅ Extracted {len(publications)} publications")
if publications:
    print(f"\nFirst: {publications[0]['title'][:60]}... ({publications[0]['year']})")

