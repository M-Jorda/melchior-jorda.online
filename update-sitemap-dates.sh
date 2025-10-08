#!/bin/bash

# Script to update lastmod dates in sitemap.xml
# Usage: ./update-sitemap-dates.sh

SITEMAP_FILE="public/sitemap.xml"
CURRENT_DATE=$(date +%Y-%m-%d)

echo "🔄 Updating sitemap.xml with current date: $CURRENT_DATE"

# Check if sitemap exists
if [ ! -f "$SITEMAP_FILE" ]; then
    echo "❌ Error: $SITEMAP_FILE not found!"
    exit 1
fi

# Backup original sitemap
cp "$SITEMAP_FILE" "${SITEMAP_FILE}.backup"
echo "✅ Backup created: ${SITEMAP_FILE}.backup"

# Update all lastmod dates
sed -i "s|<lastmod>[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}</lastmod>|<lastmod>$CURRENT_DATE</lastmod>|g" "$SITEMAP_FILE"

echo "✅ Sitemap dates updated successfully!"
echo "📅 All <lastmod> tags now set to: $CURRENT_DATE"

# Show changes
echo ""
echo "Updated entries:"
grep "<lastmod>" "$SITEMAP_FILE" | head -n 5

echo ""
echo "🎉 Done! Don't forget to:"
echo "   1. Build the project: npm run build"
echo "   2. Deploy to production"
echo "   3. Resubmit sitemap in Google Search Console"
