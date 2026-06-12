# Local preview server with caching disabled so edits always show on reload
import http.server, socketserver

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()

socketserver.ThreadingTCPServer.allow_reuse_address = True
with socketserver.ThreadingTCPServer(('127.0.0.1', 8741), NoCacheHandler) as httpd:
    print('serving on http://127.0.0.1:8741 (no-cache)')
    httpd.serve_forever()
