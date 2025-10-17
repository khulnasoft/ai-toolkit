#!/bin/bash

# Loop through all packages and run the command `pnpm pack` to create a tarball in /
# This is useful for testing the package locally before publishing to npm.
for d in packages/*; do
    # Check if directory
    [ -d "$d" ] || continue

    # Change to directory
    cd $d

    # Skip if no package.json
    [ ! -f package.json ] && cd ../../ && continue

    # Run command
    echo "$d …"
    pnpm pack --pack-destination ../../

    # Change back to root
    cd ../../
done

# All files include a version number, for example: @ai-toolkit/create-ai-0.1.9.tgz
# Let's rename the file and remove the version number, so the result is something like: @ai-toolkit/create-ai.tgz
for f in *.tgz; do
    mv -- "$f" "${f%-*}.tgz"
done