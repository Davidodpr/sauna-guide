# Create New Guide

Create a new sauna guide article using the content-writer agent.

## Process

1. Ask user for:
   - Guide title
   - Target audience (beginner/intermediate/advanced)
   - Key topics to cover

2. Invoke `content-writer` agent to create MDX file at `src/content/guides/<slug>.mdx`

3. Invoke `image-creator` agent for featured image prompt

4. Invoke `seo-strategist` to optimize metadata

## Output

- MDX file with frontmatter
- Image prompt for NanoBanana
- Social media post drafts

$ARGUMENTS (optional: topic for the guide)
