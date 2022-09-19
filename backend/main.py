import flask
from lxml import etree
app = flask.Flask(__name__)
@app.route('/')
def index():
    return 'TestApi'

@app.post('/xml1')
def xml1():
    try:
        parser = etree.XMLParser(resolve_entities=True, no_network=False)
        data = etree.fromstring(flask.request.data, parser=parser)
        data = data.findall('name')
    except SyntaxError as e:
        return 'Error: ' + str(e), 500
    return '\n'.join(f'Hello {name.text}' for name in data)

@app.get('/xml2')
def xml2():
    if flask.request.remote_addr == '127.0.0.1':
        return 'Hello admin SfeduCTF{flag2}'
    return 'Hello user'


@app.after_request
def add_cors(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)
