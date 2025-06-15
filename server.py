import http.server
import socketserver
import webbrowser
from threading import Timer
import logging
import socket
import os
import sys

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def get_local_ip():
    try:
        # Get local IP address
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def log_message(self, format, *args):
        logging.info("%s - %s", self.address_string(), format%args)

def open_browser(host, port):
    url = f'http://{host}:{port}'
    try:
        webbrowser.open(url)
        logging.info("Browser opened successfully")
    except Exception as e:
        logging.error(f"Failed to open browser: {e}")

def run_server(host='0.0.0.0', port=8000):
    local_ip = get_local_ip()
    server_address = (host, port)
    
    try:
        with socketserver.TCPServer(server_address, CustomHandler) as httpd:
            if host == '0.0.0.0':
                logging.info(f"Server accessible at:")
                logging.info(f"  Local: http://localhost:{port}")
                logging.info(f"  Network: http://{local_ip}:{port}")
            else:
                logging.info(f"Server running at http://{host}:{port}")
            
            logging.info("Press Ctrl+C to stop the server")
            
            # Open browser after a short delay
            if host in ['localhost', '127.0.0.1', '0.0.0.0']:
                Timer(1.5, open_browser, args=['localhost', port]).start()
            
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                logging.info("\nShutting down server...")
                httpd.server_close()
                
    except Exception as e:
        logging.error(f"Failed to start server: {e}")

if __name__ == '__main__':
    # Ensure we're in the correct directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    run_server() 