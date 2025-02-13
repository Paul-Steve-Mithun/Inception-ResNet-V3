import os

workers = 1  # Reduce number of workers
threads = 2  # Use threads instead of processes
timeout = 120  # Increase timeout
worker_class = 'gthread'  # Use threaded workers
max_requests = 1  # Restart workers after each request to free memory 