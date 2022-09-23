import html
import json
import os

import flask
from lxml import etree
import sqlite3
from contextlib import contextmanager

app = flask.Flask(__name__)
bp = flask.Blueprint('api', __name__, url_prefix='/api')


@contextmanager
def get_db():
    try:
        db = sqlite3.connect('base.db')
        db.row_factory = sqlite3.Row
        cur = db.cursor()
        yield cur
    except Exception as e:  # noqa
        # traceback.print_exc()
        pass
    finally:
        db.close()


@contextmanager
def set_dir(path: str):
    init_path = os.getcwd()
    try:
        os.chdir(path)
        yield
    except Exception as e:  # noqa
        pass
    finally:
        os.chdir(init_path)


def init():
    with get_db() as sql:
        sql.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )
        ''')
        sql.execute('''
        INSERT OR IGNORE INTO users (name, password) VALUES ('admin', 'admin@secretP@$$w_*rd')
        ''')
        sql.connection.commit()


@bp.route('/')
def index():
    return 'TestApi'

@bp.post('/ssti')
def ssti():
    try:
        data = flask.request.get_json()
        content = data.get('content')
        name = data.get('name')
        if name is None or content is None:
            raise Exception('Invalid request')
    except Exception as e:  # noqa
        return flask.jsonify({'status': False})
    resp = {'status': False}
    try:
        resp['content'] = html.unescape(
            flask.render_template_string(content, name=name)
        )
        resp['status'] = True
    except Exception: # noqa
        pass
    return flask.jsonify(resp)



@bp.post('/pt1')
def pt():
    try:
        data = flask.request.get_json()
        file = data.get('file')
        if file is None:
            return flask.jsonify({'status': False, 'message': 'No file'})
        file = './' + file
        mode = data.get('mode', 'read')

    except json.JSONDecodeError:
        return flask.jsonify({'status': False, 'message': 'No data'})
    resp = {'status': False}
    with set_dir('./open_files'):
        if mode == 'read':
            content = 'File not found'
            if os.path.exists(file) and os.path.isfile(file):
                with open(file, 'r') as f:
                    content = f.read()[:100]
            resp['content'] = content
            resp['status'] = True
        elif mode == 'list':
            files = []
            if os.path.exists(file) and os.path.isdir(file):
                files = list(map(
                    lambda x: os.path.join(file, x).removeprefix('./'),
                    os.listdir(file)
                ))
            resp['files'] = files
            resp['status'] = True

    return flask.jsonify(resp)


@bp.post('/xml1')
def xml1():
    try:
        parser = etree.XMLParser(resolve_entities=True, no_network=False)
        data = etree.fromstring(flask.request.data, parser=parser)
        data = data.findall('name')
    except SyntaxError as e:
        return 'Error: ' + str(e), 500
    return '\n'.join(f'Hello {name.text}' for name in data)


@bp.get('/xml2')
def xml2():
    if flask.request.remote_addr == '127.0.0.1':
        return 'Hello admin SfeduCTF{flag2}'
    return 'Hello user'


@bp.post('/sql')
def sql1():
    try:
        data = flask.request.get_json()
        name = data.get('name')
        password = data.get('password')
        debug = data.get('debug')
    except json.JSONDecodeError:
        return flask.jsonify({'status': False})
    resp = {}
    query = f"SELECT * FROM users WHERE name='{name}' AND password='{password}'"
    if str(debug) == '1':
        resp['debug'] = query
    success = False
    with get_db() as sql:
        success = len(sql.execute(query).fetchall()) > 0
    resp['status'] = success
    if success:
        resp['message'] = 'Hello admin SfeduCTF{sql_1nj3ction}'
    return flask.jsonify(resp)


@app.after_request
def add_cors(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response


if __name__ == '__main__':
    app.register_blueprint(bp)
    # print('Server started')
    # print('\n'.join(str(i) for i in list(app.url_map.iter_rules())))
    init()
    app.run('0.0.0.0', debug=False, port=80)
