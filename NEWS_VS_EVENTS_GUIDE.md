# News vs Events Guide

## When to Use NEWS:

**News** is for:
- ✅ **Ongoing updates** and announcements
- ✅ **Research achievements** (publications, awards, recognitions)
- ✅ **Group milestones** (new lab, new collaborations)
- ✅ **General announcements** that don't have a specific date
- ✅ **Things that happened** but aren't tied to a specific event date

**Examples:**
- "Prof. Liu joins NTU" (ongoing announcement)
- "Paper published in JACS" (achievement)
- "Student wins award" (achievement)
- "New collaboration announced" (announcement)

**Storage:** `news-data.js` (JavaScript file, dynamically loaded)

---

## When to Use EVENTS:

**Events** is for:
- ✅ **Specific date-based occurrences** (meetings, exams, visits, launches)
- ✅ **One-time happenings** with a clear date
- ✅ **Milestones** that happened on a specific day
- ✅ **Group activities** (lab visits, celebrations, presentations)
- ✅ **Things that happened on a particular date** you want to highlight

**Examples:**
- "PhD student joins on Jan 12, 2026" (specific date)
- "Qualifying exam passed on Nov 12, 2025" (specific date)
- "Lab launch event on Aug 26, 2025" (specific date)
- "Group visit to NTU campus" (specific date)

**Storage:** `events.html` (directly in HTML file)

---

## Quick Decision Guide:

**Ask yourself:**
- Does this have a **specific date** when it happened? → **EVENTS**
- Is this more of a **general announcement** or achievement? → **NEWS**

**Examples:**
- "New student joined this week (Jan 12)" → **EVENTS** ✅
- "We published a paper" → **NEWS** ✅
- "Lab moved to NTU" → **NEWS** ✅
- "Lab launch celebration on Aug 26" → **EVENTS** ✅

---

## How to Add:

### Add to NEWS:
1. Edit `news-data.js`
2. Add new entry to `newsData` array
3. Include: `title`, `date`, `excerpt`, `content`, `slug`, `image` (optional)

### Add to EVENTS:
1. Edit `events.html`
2. Add new `<div class="event-item-large">` block
3. Include: title, date, image (optional), description
4. Place at the top of the events list (newest first)
