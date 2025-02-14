#!/bin/bash

# Upgrade pip first
python -m pip install --upgrade pip

# Install Python dependencies
pip install -r requirements.txt

# Navigate to client directory
cd client

# Install npm dependencies
npm install

# Build the React app
npm run build

# Debug: List contents of build directory
echo "Contents of dist directory:"
ls -la dist/

# Navigate back to root
cd ..

# No need to copy files since app.py is already configured to serve from client/dist 