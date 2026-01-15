#!/usr/bin/env python3
"""
Add new publications to publications-data.js
Then use add_publication_urls.py to add URLs interactively
"""

import re
import json

# New 2025 publications from user
new_publications = [
    {
        "title": "Red and Robust: Highly Stable Electrofluorochromic Switching in Cyano‐Substituted Aggregation‐Induced Emission‐Active Conjugated Polymers",
        "authors": "BYK Hui, R Tao, KLO Chin, XYD Soo, A Sng, SAA Abedi, KC Chong, ...",
        "journal": "Advanced Optical Materials, e02075",
        "year": 2025,
        "citations": 0
    },
    {
        "title": "Photostable o-Carborane-DAPA Hybrids for On-Site Nitrite Screening: Dual-Mode Detection Achieving Sub-100 nM Sensitivity in Complex Food Matrices",
        "authors": "H Wei, Y Shao, X Wang, Y Luo, M Ji, R Wen, R Huang, X Liu, Y Fang",
        "journal": "Analytical Chemistry 97 (46), 25725-25732",
        "year": 2025,
        "citations": 0
    },
    {
        "title": "Precision Design of Fluorogenic Probes via Orthogonal Tuning of Binding and Photophysics for Isoform-Selective ALDH2 Imaging",
        "authors": "R Tao, Y Chen, T Yang, S Hu, W Lv, X Li, Z Wang, R Zhang, Z Wu, T Hou, ...",
        "journal": "Journal of the American Chemical Society 147 (45), 41768-41778",
        "year": 2025,
        "citations": 0
    },
    {
        "title": "Hetero‐Hydrazone Photoswitches",
        "authors": "D Sosnin, SAA Abedi, M Izadyar, Y Ünal, X Liu, I Aprahamian",
        "journal": "Angewandte Chemie International Edition 64 (44), e202515136",
        "year": 2025,
        "citations": 1
    },
    {
        "title": "Reengineering Cyanine Dyes via Borondifluoro Indolenine: A Tunable Platform for Wash-Free Imaging and Responsive Biosensing",
        "authors": "Z Zhan, J Zhang, T Shen, J Li, L Chai, L Pan, H Yang, T Liu, X Liu, W Mao",
        "journal": "Journal of the American Chemical Society",
        "year": 2025,
        "citations": 6
    },
    {
        "title": "A pH-Resilient Fluorogenic Probe for Stable High-Resolution Imaging of Lysosomal Dynamics",
        "authors": "X Fang, G Jiang, Q Qiao, X Liu, Z Xu",
        "journal": "Dyes and Pigments, 112872",
        "year": 2025,
        "citations": 1
    },
    {
        "title": "Tail-Assisted Excited-State Intramolecular Proton Transfer (ta-ESIPT) Fluorophores: A Universal Ratiometric Platform for Hydration-Sensitive Biomolecular Imaging",
        "authors": "Q Qiao, C Wang, H Wang, Y Ruan, W Liu, J Chen, Z Wu, X Liu, Z Xu",
        "journal": "Journal of the American Chemical Society 147 (18), 15602-15613",
        "year": 2025,
        "citations": 17
    },
    {
        "title": "\"Clicked\" Hydrazone Photoswitches",
        "authors": "D Sosnin, M Izadyar, SAA Abedi, X Liu, I Aprahamian",
        "journal": "Journal of the American Chemical Society 147 (18), 14930-14935",
        "year": 2025,
        "citations": 5
    },
    {
        "title": "Bright and Versatile Azetidinecarboxamide‐Based Fluorophore–Ligand Conjugates for High‐Resolution Cell Imaging",
        "authors": "N Xu, Q Qiao, C Wang, W Zhou, P Bao, J Li, S Wu, X Liu, Z Xu",
        "journal": "Angewandte Chemie International Edition 64 (23), e202505579",
        "year": 2025,
        "citations": 4
    },
    {
        "title": "Activity-based trapping for multiplex imaging illuminates the hidden role of endogenous formaldehyde in proinflammatory signaling",
        "authors": "Y Pan, X Liang, T Shen, T Fan, H Gao, X Liu, X Li",
        "journal": "Cell Biomaterials",
        "year": 2025,
        "citations": 1
    },
    {
        "title": "Solvent-dependent reactivity of azo-BF 2 switches",
        "authors": "Q Qi, H Fu, L Peng, S Patra, X Liu, I Aprahamian",
        "journal": "Chemical Science 16 (37), 17214-17220",
        "year": 2025,
        "citations": 0
    },
    {
        "title": "Unveiling the Power of Dark State Photocages: An Efficient Pathway to Triplet State under Near‐Infrared Light Irradiation",
        "authors": "Q Hu, J Du, SA Abbas Abedi, X Liu, S Long, W Sun, J Fan, X Peng",
        "journal": "Angewandte Chemie International Edition, e202504670",
        "year": 2025,
        "citations": 5
    },
    {
        "title": "Breaking the heavy-atom paradigm: weak-donor-engineered triplet harvesting in BODIPY photosensitizers for immunogenic pyroptosis therapy",
        "authors": "HS Kim, H Rha, M Izadyar, S Chanmungkalakul, H Huang, YY Kang, ...",
        "journal": "Chemical Science 16 (32), 14485-14495",
        "year": 2025,
        "citations": 2
    },
    {
        "title": "Highly stable electrofluorochromic switching of aggregation-induced emission-active conjugated polymers",
        "authors": "R Tao, BYK Hui, KLO Chin, XYD Soo, D Zhang, SAA Abedi, P Bi, X Liu, ...",
        "journal": "Materials Chemistry Frontiers 9 (9), 1410-1420",
        "year": 2025,
        "citations": 4
    },
    {
        "title": "Two‐Color Single‐Molecule Blinking Ratiometricity: A Functional Super‐Resolution Imaging Approach for Resolving Lysosomal pH and Dynamics",
        "authors": "Q Qiao, W Yin, X Wu, S Wu, Y Ruan, N Xu, J Li, ZS Wu, X Liu, Z Xu",
        "journal": "Angewandte Chemie International Edition 64 (21), e202503916",
        "year": 2025,
        "citations": 8
    },
    {
        "title": "Whole‐cell Lysosome SMLM Imaging as Indicators for Functional Diagnostics with a Low‐Phototoxic Spontaneously Blinking Probe",
        "authors": "Q Qiao, A Song, G Jiang, Y Zhou, Y Ruan, W Jia, X Liu, Z Xu",
        "journal": "Angewandte Chemie International Edition 64 (28), e202503177",
        "year": 2025,
        "citations": 6
    },
    {
        "title": "Design strategies for tetrazine fluorogenic probes for bioorthogonal imaging",
        "authors": "A Yu, X He, T Shen, X Yu, W Mao, W Chi, X Liu, H Wu",
        "journal": "Chemical Society Reviews 54 (6), 2984-3016",
        "year": 2025,
        "citations": 38
    },
    {
        "title": "Moisture Tolerance, Thermally Stable and Light Switchable Adhesives Platform Based on Reversible Redshifted [2+ 2] Photocycloaddition",
        "authors": "XY Oh, QV Thi, MML Yu, M Izadyar, SAA Abedi, X Liu, VX Truong",
        "journal": "Advanced Functional Materials, 2421823",
        "year": 2025,
        "citations": 2
    },
    {
        "title": "Unveiling the photophysical mechanistic mysteries of tetrazine-functionalized fluorogenic labels",
        "authors": "T Shen, X Liu",
        "journal": "Chemical Science",
        "year": 2025,
        "citations": 9
    },
    {
        "title": "\"Superimposed\" spectral characteristics of fluorophores arising from cross-conjugation hybridization",
        "authors": "K An, Q Qiao, SAA Abedi, X Liu, Z Xu",
        "journal": "Chinese Chemical Letters 36 (1), 109786",
        "year": 2025,
        "citations": 0
    }
]

def escape_js_string(s):
    """Escape string for JavaScript"""
    return s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')

def format_publication(pub):
    """Format publication as JavaScript object"""
    title = escape_js_string(pub['title'])
    authors = escape_js_string(pub['authors'])
    journal = escape_js_string(pub['journal'])
    year = pub['year']
    citations = pub['citations']
    url = pub.get('url', '')
    tocImage = pub.get('tocImage', '')
    
    result = f'''    {{
        title: "{title}",
        authors: "{authors}",
        journal: "{journal}",
        year: {year},
        citations: {citations}'''
    
    if url:
        result += f',\n        url: "{url}"'
    
    if tocImage:
        result += f',\n        tocImage: "{tocImage}"'
    
    result += '\n    }'
    return result

def add_publications():
    """Add new publications to publications-data.js"""
    print("\n" + "="*70)
    print("Adding New 2025 Publications")
    print("="*70)
    
    # Read current file
    with open('publications-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check which publications already exist
    existing_titles = set()
    pub_pattern = r'title:\s*"([^"]+)"'
    for match in re.finditer(pub_pattern, content):
        existing_titles.add(match.group(1).lower())
    
    # Filter out duplicates
    to_add = []
    for pub in new_publications:
        if pub['title'].lower() not in existing_titles:
            to_add.append(pub)
        else:
            print(f"[SKIP] Already exists: {pub['title'][:60]}...")
    
    if not to_add:
        print("\nAll publications already exist in the file!")
        return
    
    print(f"\nAdding {len(to_add)} new publications...\n")
    
    # Find insertion point (before closing bracket)
    # Find the last publication entry
    last_pub_match = list(re.finditer(r'\}\s*,?\s*$', content, re.MULTILINE))
    
    if last_pub_match:
        # Insert before the closing bracket
        insert_pos = content.rfind('];')
        if insert_pos == -1:
            insert_pos = content.rfind(']')
        
        if insert_pos > 0:
            # Build new publications string
            new_pubs = ',\n'.join([format_publication(pub) for pub in to_add])
            
            # Insert
            new_content = content[:insert_pos] + ',\n' + new_pubs + '\n' + content[insert_pos:]
            
            # Create backup
            import shutil
            shutil.copy('publications-data.js', 'publications-data.js.backup.before_add')
            
            # Write
            with open('publications-data.js', 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"[OK] Added {len(to_add)} publications!")
            print(f"[OK] Backup created: publications-data.js.backup.before_add")
            print(f"\nNext step: Run 'python add_publication_urls.py' to add URLs interactively\n")
        else:
            print("[ERROR] Could not find insertion point in file")
    else:
        print("[ERROR] Could not find where to insert publications")

if __name__ == '__main__':
    try:
        add_publications()
    except Exception as e:
        print(f"\n[ERROR] {e}")
        import traceback
        traceback.print_exc()
