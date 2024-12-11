#!/bin/bash
set -o pipefail

# Variables
REMOTE="gdrive-cantopia:Cantopia/fluhrer.games-anzahl-spielende/spielende.csv"
LOCAL="./_data/anzahl-spielende-google-drive/spielende.csv"

# Check if the local file exists
if [ ! -f "$LOCAL" ]; then
    echo "Local file does not exist. Downloading from Google Drive..."
    rclone copy "$REMOTE" "$(dirname "$LOCAL")"

    echo "rebuilding fluhrer.games site with current anzahl spielende"
    docker-compose up
    exit 0
fi

# Compare the files
rclone check "$(dirname "$REMOTE")" "$(dirname "$LOCAL")" --one-way
CHECK_STATUS=$?
if [ $CHECK_STATUS -eq 1 ]; then
    echo "spielende.csv are different gdrive vs. locally. Downloading from Google Drive..."
    rclone copy "$REMOTE" "$(dirname "$LOCAL")"

    echo "rebuilding fluhrer.games site with current anzahl spielende"
    docker-compose up
    exit 0
elif [ $CHECK_STATUS -eq 0 ]; then
    echo "spielende.csv files are identical. No action needed."
    exit 0
else
    echo "An error occurred during the rclone check."
    exit 1
fi
