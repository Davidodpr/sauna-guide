# Create Content

Generate a new piece of content using the agent team.

## Process

1. **Check Research Data**:
   - Read `src/data/reddit-insights.json`
   - Read `src/data/trend-report.json`
   - Read `src/data/seo-strategy.json`

2. **Select Topic**:
   - If $ARGUMENTS provided, use that topic
   - Otherwise, pick highest-priority topic from research

3. **Generate Content**:
   - Invoke `content-writer` agent
   - Invoke `image-creator` agent for visuals
   - Save article to `src/content/guides/`

4. **Optimize**:
   - Review SEO elements
   - Add internal links
   - Ensure newsletter CTA included

5. **Social Promotion**:
   - Invoke `social-manager` to create social posts
   - Schedule for optimal times

## Output

- Article MDX file
- Image prompts for NanoBanana
- Social media posts

$ARGUMENTS (optional: specific topic to write about)
