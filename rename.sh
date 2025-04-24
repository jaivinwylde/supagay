#!/bin/bash

# Script to rename all instances of "supabase" to "supagay" in a repository

echo "👉 Starting renaming process: supabase → supagay"

# Clone the repository with depth 1 to save time
echo "🔄 Cloning Supabase repository..."
git clone --depth 1 https://github.com/supabase/supabase.git temp_supabase

# Move into the directory
cd temp_supabase

# Remove the .git directory to disconnect from the original repo
rm -rf .git

# Move up one directory
cd ..

# Rename directories containing "supabase" to "supagay"
echo "🔄 Renaming directories..."
find temp_supabase -depth -type d -name "*[sS]upabase*" | while read dir; do
  new_dir=$(echo "$dir" | sed 's/[sS]upabase/supagay/g')
  mkdir -p "$(dirname "$new_dir")"
  mv "$dir" "$new_dir"
done

# Replace all instances of "supabase" with "supagay" in files
echo "🔄 Replacing text in files..."
find temp_supabase -type f -not -path "*/node_modules/*" -not -path "*/dist/*" -not -path "*/.git/*" | while read file; do
  # Skip binary files
  if file "$file" | grep -q "text"; then
    # Replace with case variations
    sed -i '' 's/Supabase/Supagay/g' "$file"
    sed -i '' 's/supabase/supagay/g' "$file"
    sed -i '' 's/SUPABASE/SUPAGAY/g' "$file"
  fi
done

# Move the renamed content to the current directory
echo "🔄 Moving renamed files..."
cp -R temp_supabase/* .

# Clean up
rm -rf temp_supabase

echo "✅ Renaming complete! All instances of 'supabase' have been replaced with 'supagay'"
echo "🏳️‍🌈 Your Supagay repository is ready!"