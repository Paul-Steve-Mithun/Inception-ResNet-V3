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

# No need to copy files since app.py is already configured to serve from client/dist 