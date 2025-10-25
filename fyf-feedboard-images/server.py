#!/usr/bin/env python3
"""
Simple HTTP server to serve FYF Feedboard images with direct download links.
This creates a local cloud storage solution for the images.
"""

import http.server
import socketserver
import os
import json
from urllib.parse import unquote

# Server configuration
PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers for web compatibility
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # Handle JSON API endpoint
        if self.path == '/api/images':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            # Generate JSON response with direct download links
            base_url = f"http://localhost:{PORT}"
            images_data = [
                {"title": "Your Life in Weeks", "filename": "FYF_01_Life-in-Weeks.jpg", "url": f"{base_url}/FYF_01_Life-in-Weeks.jpg"},
                {"title": "Four Thousand Weeks", "filename": "FYF_02_FourThousandWeeks.jpg", "url": f"{base_url}/FYF_02_FourThousandWeeks.jpg"},
                {"title": "Frankl Quote", "filename": "FYF_03_Frankl-Quote.jpg", "url": f"{base_url}/FYF_03_Frankl-Quote.jpg"},
                {"title": "Bali Coworking", "filename": "FYF_04_Bali-Coworking.jpg", "url": f"{base_url}/FYF_04_Bali-Coworking.jpg"},
                {"title": "Nomad Podcast", "filename": "FYF_05_NomadPodcast.jpg", "url": f"{base_url}/FYF_05_NomadPodcast.jpg"},
                {"title": "Jenny Odell", "filename": "FYF_06_Jenny-Odell.jpg", "url": f"{base_url}/FYF_06_Jenny-Odell.jpg"},
                {"title": "Cal Newport", "filename": "FYF_07_Cal-Newport.jpg", "url": f"{base_url}/FYF_07_Cal-Newport.jpg"},
                {"title": "Farnam Street Attention", "filename": "FYF_08_FarnamStreet-Attention.jpg", "url": f"{base_url}/FYF_08_FarnamStreet-Attention.jpg"},
                {"title": "FYF Limit Freedom", "filename": "FYF_09_FYF-Limit-Freedom.jpg", "url": f"{base_url}/FYF_09_FYF-Limit-Freedom.jpg"},
                {"title": "Money as Energy", "filename": "FYF_10_Money-as-Energy.jpg", "url": f"{base_url}/FYF_10_Money-as-Energy.jpg"},
                {"title": "Hidden Brain Enough", "filename": "FYF_11_HiddenBrain-Enough.jpg", "url": f"{base_url}/FYF_11_HiddenBrain-Enough.jpg"},
                {"title": "Psychology of Money", "filename": "FYF_12_Psychology-of-Money.jpg", "url": f"{base_url}/FYF_12_Psychology-of-Money.jpg"},
                {"title": "Psyche Meaning", "filename": "FYF_13_Psyche-Meaning.jpg", "url": f"{base_url}/FYF_13_Psyche-Meaning.jpg"},
                {"title": "On Being Purpose", "filename": "FYF_14_OnBeing-Purpose.jpg", "url": f"{base_url}/FYF_14_OnBeing-Purpose.jpg"},
                {"title": "Ikigai Book", "filename": "FYF_15_Ikigai-Book.jpg", "url": f"{base_url}/FYF_15_Ikigai-Book.jpg"},
                {"title": "Show Your Work", "filename": "FYF_16_Show-Your-Work.jpg", "url": f"{base_url}/FYF_16_Show-Your-Work.jpg"},
                {"title": "Art Resistance", "filename": "FYF_17_Art-Resistance.jpg", "url": f"{base_url}/FYF_17_Art-Resistance.jpg"},
                {"title": "Erykah Badu – Didn't Cha Know", "filename": "FYF_18_Erykah-Badu.jpg", "url": f"{base_url}/FYF_18_Erykah-Badu.jpg"}
            ]
            
            response = {"feedboard_images": images_data}
            self.wfile.write(json.dumps(response, indent=2).encode())
            return
        
        # Handle image downloads with proper headers
        if self.path.endswith('.jpg'):
            self.send_response(200)
            self.send_header('Content-Type', 'image/jpeg')
            self.send_header('Content-Disposition', f'attachment; filename="{os.path.basename(self.path)}"')
            self.end_headers()
            
            # Serve the file
            file_path = os.path.join(DIRECTORY, unquote(self.path[1:]))
            if os.path.exists(file_path):
                with open(file_path, 'rb') as f:
                    self.wfile.write(f.read())
            return
        
        # Default behavior for other requests
        super().do_GET()

def start_server():
    """Start the HTTP server."""
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"FYF Feedboard Image Server running on http://localhost:{PORT}")
        print(f"Serving images from: {DIRECTORY}")
        print(f"API endpoint: http://localhost:{PORT}/api/images")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == "__main__":
    start_server()
