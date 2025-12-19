# Create Newsletter Edition

Generate a complete newsletter edition ready for Beehiiv.

## Process

1. **Gather Content**:
   - Review this week's published articles
   - Check trending topics
   - Pull insights from research agents

2. **Write Edition**:
   - Invoke `content-writer` agent with newsletter template
   - Create compelling subject line options (A/B test)
   - Include:
     - Main story/insight
     - Quick tips section
     - Featured sauna of the week (from listings)
     - Newsletter-exclusive content

3. **Optimize**:
   - Invoke `newsletter-strategist` for engagement tips
   - Add UTM tracking to all links
   - Create preview text

4. **Visual Elements**:
   - Invoke `image-creator` for header image
   - Suggest inline images

## Output Format

Save to `src/content/newsletters/{{date}}.md`:

```markdown
---
subject: "Primary subject line"
subjectAlt: "A/B test alternative"
previewText: "Preview text for inbox"
date: "YYYY-MM-DD"
---

[Newsletter content in email-friendly format]
```

## Beehiiv Integration

After generation:
1. Copy content to Beehiiv editor
2. Schedule for optimal send time (Tuesday/Thursday morning)
3. Set up A/B test for subject lines

$ARGUMENTS (optional: theme or focus for this edition)
