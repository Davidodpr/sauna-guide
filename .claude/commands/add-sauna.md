# Add Sauna Listing

Add a new sauna to the directory.

## Process

1. Gather sauna details:
   - Name
   - Location (city, country)
   - Type (public/private/hotel/spa)
   - Features
   - Price range
   - Website URL
   - Description

2. Add entry to `src/data/saunas.json`

3. Invoke `image-creator` for sauna images if needed

## Sauna Entry Schema

```json
{
  "id": "unique-slug",
  "name": "Sauna Name",
  "location": {
    "city": "City",
    "country": "Country",
    "coordinates": { "lat": 0, "lng": 0 }
  },
  "type": "public|private|hotel|spa",
  "features": ["traditional", "steam", "infrared"],
  "priceRange": "$|$$|$$$",
  "website": "https://...",
  "description": "Brief description...",
  "images": ["image1.jpg"],
  "rating": 4.5
}
```

$ARGUMENTS (optional: sauna name to add)
