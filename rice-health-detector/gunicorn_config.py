import os

# Worker configurations
workers = 4
threads = 4
worker_class = 'gthread'
worker_connections = 1000

# Timeout configurations
timeout = 120
keepalive = 2

# Logging
accesslog = '-'
errorlog = '-'
loglevel = 'info'

# Restart configurations
max_requests = 100
max_requests_jitter = 10

# Server configurations
bind = "0.0.0.0:10000" 