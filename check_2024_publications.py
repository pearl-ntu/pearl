#!/usr/bin/env python3
"""
Check if all 2024 publications are in the data file
"""

import re

# 2024 publications from user's list
user_2024_pubs = [
    "Rational design of an ultrabright quinolinium-fused rhodamine turn-on fluorescent probe for highly sensitive detection of SO2 derivatives: Applications in food safety and",
    "Conformational Folding Activates Photoinduced Electron Transfer",
    "Brightness-constant solvatochromic dye for ratiometric fluorescent imaging of lipid dynamics in developing zebrafish",
    "Using Olive Oil as a Pedagogical Medium to Teach Ultraviolet Spectrophotometry",
    "Construction of wavelength-tunable DSE quinoline salt derivatives by regulating the hybridization form of the nitrogen atom and intramolecular torsion angle",
    "Chromene-derived red-fluorescent probes for sulfite detection in food and living cells based on an integrated ICT&PET platform",
    "Photosensitizer‐Amplified Antimicrobial Materials for Broad‐Spectrum Ablation of Resistant Pathogens in Ocular Infections",
    "Synergistic Inter‐and Intramolecular Aggregation of Dimeric Cyanine Dyes Affords Highly Efficient In Vivo Self‐Delivery and Photothermal Therapy",
    "The dark side of cyclooctatetraene (COT): photophysics in the singlet states of \"self-healing\" dyes",
    "Photoinduced Charge Centralization Quenches the Fluorescence of Conjugation-Fused Tetrazine Labels with Red-to-Near-Infrared Emissions",
    "Strategies to Enhance the Electrochromic Properties of Conjugated Polymers Bearing Pyromellitic Diimide Acceptors",
    "Enhanced Reactivity of Acridinium Perchlorate: Harnessing Redox Mediators for Trace Chloride Activation in Hydrogen Atom Transfer Photocatalysis",
    "Matthew effect: General design strategy of ultra‐fluorogenic nanoprobes with amplified dark–bright states in aggregates",
    "Unlocking Multicolor Emissions in the Crystalline State through Dimerization and Configurational Transformation of a Single Fluorophore",
    "Fluorogenic Rhodamine Probes with Pyrrole Substitution Enables STED and Lifetime Imaging of Lysosomes in Live Cells",
    "Tetrazine‐Isonitrile Bioorthogonal Fluorogenic Reactions Enable Multiplex Labeling and Wash‐Free Bioimaging of Live Cells",
    "1,2-BF2 Shift and Photoisomerization Induced Multichromatic Response",
    "Auxochrome dimethyl-dihydroacridine improves fluorophores for prolonged live-cell super-resolution imaging",
    "Aryl‐Modified Pentamethyl Cyanine Dyes at the C2'Position: A Tunable Platform for Activatable Photosensitizers",
    "A de novo zwitterionic strategy of ultra-stable chemiluminescent probes: highly selective sensing of singlet oxygen in FDA-approved phototherapy",
    "Molecular design and architectonics towards film-based fluorescent sensing",
    "Photoinduced electron transfer endows fluorogenicity in tetrazine-based near-infrared labels"
]

def normalize_title(title):
    """Normalize title for comparison"""
    # Remove quotes, extra spaces, make lowercase
    normalized = re.sub(r'["""\\"]', '', title.lower().strip())
    # Remove trailing ellipsis
    normalized = normalized.rstrip('...')
    return normalized

def load_2024_publications():
    """Load all 2024 publications from the file"""
    with open('publications-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to extract publications from 2024
    pub_pattern = r'\{\s*title:\s*"([^"]+)",\s*authors:\s*"[^"]+",\s*journal:\s*"[^"]+",\s*year:\s*2024'
    
    publications = []
    for match in re.finditer(pub_pattern, content, re.DOTALL):
        title = match.group(1)
        publications.append({
            'title': title,
            'normalized': normalize_title(title)
        })
    
    return publications

def find_matches():
    """Find which publications are missing"""
    file_pubs = load_2024_publications()
    file_titles_normalized = {p['normalized'] for p in file_pubs}
    
    print("\n" + "="*70)
    print("2024 Publications Check")
    print("="*70)
    print(f"\nPublications in file: {len(file_pubs)}")
    print(f"Publications in your list: {len(user_2024_pubs)}\n")
    
    missing = []
    found = []
    
    for user_pub in user_2024_pubs:
        user_normalized = normalize_title(user_pub)
        
        # Try to find match
        matched = False
        for file_pub in file_pubs:
            # Check if normalized titles match or are very similar
            if user_normalized in file_pub['normalized'] or file_pub['normalized'] in user_normalized:
                found.append((user_pub, file_pub['title']))
                matched = True
                break
        
        if not matched:
            missing.append(user_pub)
    
    print("="*70)
    print("FOUND PUBLICATIONS:")
    print("="*70)
    for i, (user_title, file_title) in enumerate(found, 1):
        try:
            print(f"\n{i}. {user_title[:70]}...")
            print(f"   [FOUND] {file_title[:70]}...")
        except UnicodeEncodeError:
            print(f"\n{i}. [Title contains special characters]")
            print(f"   [FOUND]")
    
    print("\n" + "="*70)
    print("MISSING PUBLICATIONS:")
    print("="*70)
    if missing:
        for i, pub in enumerate(missing, 1):
            try:
                print(f"\n{i}. {pub}")
            except UnicodeEncodeError:
                print(f"\n{i}. [Title contains special characters - check manually]")
        print(f"\n\nTotal missing: {len(missing)}")
    else:
        print("\n[OK] All publications are in the file!")
    
    print("\n" + "="*70)
    print("SUMMARY")
    print("="*70)
    print(f"Found: {len(found)}/{len(user_2024_pubs)}")
    print(f"Missing: {len(missing)}/{len(user_2024_pubs)}")
    print(f"Total in file: {len(file_pubs)}")
    print()

if __name__ == '__main__':
    find_matches()
