#!/bin/sh
set -e

echo "Packing packages..."

pnpm pack --filter @ai-toolkit/create-ai
pnpm pack --filter @ai-toolkit/scripts

# Loop over directories and pack
pwd
for dir in */ ; do
  if [[ ${disallowed[@]} =~ $dir ]]
  then  
    echo "$dir cannot be packaged"
  else
    cd "$CURRENT/$dir"
    if [ -f './package.json' ]; then
      rm -f ./*.tgz
      pnpm pack
      file=$(ls *.tgz)
      mv "$file" "${file%-*}.tgz"
    else
      echo "$dir cannot be packaged"
    fi
  fi
done

echo "All packages have been packed"