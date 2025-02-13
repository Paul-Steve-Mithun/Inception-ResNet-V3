import os

# Worker configurations
workers = 1
threads = 4
worker_class = 'gthread'
worker_connections = 1000

# Timeout configurations
timeout = 300
keepalive = 2

# Logging
accesslog = '-'
errorlog = '-'
loglevel = 'info'

# Restart configurations
max_requests = 100
max_requests_jitter = 10

# Server configurations
bind = f"0.0.0.0:{os.getenv('PORT', '5000')}" 