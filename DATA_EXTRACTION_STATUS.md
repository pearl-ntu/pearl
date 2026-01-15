# Data Extraction Status

## ✅ Completed

### 1. TOC Feature Restored
- ✅ Added Table of Contents sidebar on the right
- ✅ Publications displayed on the left
- ✅ TOC shows years with publication counts
- ✅ Clickable year links for smooth scrolling
- ✅ Responsive design (TOC moves to top on mobile)
- ✅ Sticky TOC that stays visible while scrolling

## ⏳ In Progress

### 2. Data Extraction from Old WordPress Site

**Location:** `xiaogang_liu/public_html/` (WordPress backup)

**Challenges:**
- SQL file is very large and complex
- WordPress data is in MySQL dump format
- Need to parse INSERT statements with nested quotes

**What We Need to Extract:**
1. **News/Articles** - Blog posts from old site
2. **Research Content** - Research page content
3. **Old Team Members** - Previous lab members
4. **Publications Structure** - Any additional publication data

**Next Steps:**
- Option A: Use a MySQL tool to import the SQL and export data
- Option B: Create a more robust SQL parser
- Option C: Manually extract specific content if you can point to specific pages/files

## 📋 Current Website Structure

- ✅ Publications page with TOC (just completed)
- ✅ People page (current members)
- ✅ News page (needs old news data)
- ✅ Research page (needs old research content)
- ✅ Events page

## 🔍 How to Help

If you can provide:
1. Specific page URLs or titles from the old site you want extracted
2. Or tell me which sections are most important
3. Or if you have any exported data files (JSON, CSV, etc.)

I can focus the extraction on those areas.
