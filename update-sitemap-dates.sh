#!/bin/bash

# Met à jour les dates lastmod des pages statiques de la SPA dans le sitemap.
# Le sitemap est désormais généré au build (build/blog/site.js) : les dates
# des pages statiques vivent dans STATIC_PAGES (build/blog/config.js), celles
# des articles viennent de leur frontmatter.
# Usage: ./update-sitemap-dates.sh

CONFIG_FILE="build/blog/config.js"
CURRENT_DATE=$(date +%Y-%m-%d)

echo "🔄 Updating static page lastmod dates to: $CURRENT_DATE"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Error: $CONFIG_FILE not found!"
    exit 1
fi

sed -i "s|lastmod: '[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}'|lastmod: '$CURRENT_DATE'|g" "$CONFIG_FILE"

echo "✅ Dates updated:"
grep "lastmod:" "$CONFIG_FILE"

echo ""
echo "🎉 Done! Don't forget to:"
echo "   1. Build the project: npm run build (generates dist/sitemap.xml)"
echo "   2. Deploy to production"
echo "   3. Resubmit sitemap in Google Search Console"
