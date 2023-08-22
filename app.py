from flask import Flask, jsonify

app = Flask(__name__)

# Sample playlists data
playlists = [
    {'id': 1, 'name': 'My Playlist 1'},
    {'id': 2, 'name': 'My Playlist 2'},
    # ... more playlists
]

@app.route('/api/playlists', methods=['GET'])
def get_playlists():
    return jsonify(playlists)

if __name__ == '__main__':
    app.run(debug=True)
