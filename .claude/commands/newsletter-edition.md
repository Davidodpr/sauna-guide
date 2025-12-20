# Create Newsletter Edition

Generate a complete newsletter edition and create draft in Beehiiv automatically.

## Step 1: Gather Content from Notion

Query the Content Inbox database (ID: `2cfd0e52-2114-8100-af51-f20ab3def8c7`) for items with:
- Status: "✅ Approved" or "👀 Reviewing"
- Added in the last 7 days
- Sort by Priority (High first)

Use RUBE_MULTI_EXECUTE_TOOL with NOTION_QUERY_DATABASE_WITH_FILTER.

## Step 2: Write Newsletter

Read `src/data/brand-voice.json` and `src/data/newsletter-strategy.json` for structure.

Newsletter sections:
1. **Opening Hook** (2-3 sentences) - Atmospheric, evocative
2. **Main Feature** (300-400 words) - Deep dive from Content Inbox
3. **The Practice** (100-150 words) - One actionable tip
4. **Sauna Spotlight** - Featured destination from `src/data/saunas.json`
5. **Closing** - Invitation to reply, share warmth

Tone requirements (from brand-voice.json):
- Lead with longing, not information
- Use "Step inside" never "Subscribe"
- Short, breathing sentences
- No hype words: hack, optimize, maximize

## Step 3: Create Beehiiv Draft

After writing, use the Beehiiv API to create a draft:

```typescript
import { createPost } from '@/lib/beehiiv'

await createPost({
  title: "Subject line here",
  subtitle: "Preview text",
  body_content: "<html>Newsletter HTML content</html>",
  status: 'draft'
})
```

The draft will appear in Beehiiv dashboard ready for review.

## Step 4: Update Notion

Mark used Content Inbox items as "✨ Published" and link to Newsletter Queue.

## Output

1. Newsletter saved to `src/content/newsletters/{{date}}.md`
2. Draft created in Beehiiv (check dashboard)
3. Notion items updated

Note: Beehiiv Send API requires Enterprise plan. If API fails, output HTML for manual paste.

$ARGUMENTS (optional: theme or specific content to feature)
