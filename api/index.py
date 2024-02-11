from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()

        content_len = int(self.headers.get('Content-Length'))
        params = json.loads(self.rfile.read(content_len))
        return_vals = handler.do_stuff(params)
        self.wfile.write(json.dumps(return_vals).encode())

    @staticmethod
    def do_stuff(params):
        return {'stuff': 'stuff'}


if __name__ == '__main__':
    # test static method
    print(handler.do_stuff({'param': 'hello'}))