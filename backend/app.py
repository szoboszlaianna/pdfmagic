import os
import tempfile
from flask import Flask, request, jsonify

app = Flask(__name__)

temp_files = {}

@app.route('/upload_files', methods=['POST'])
def upload_files():
    files = request.files.getlist('file')
    for file in files:
        suffix = os.path.splitext(file.filename)[1]
        temp_file = tempfile.NamedTemporaryFile(suffix=suffix, delete=False)
        file.save(temp_file.name)
        temp_files[temp_file.name] = temp_file
    # Process the uploaded files or return a response
    return jsonify({'message': 'Files uploaded successfully'})

if __name__ == '__main__':
    app.run(debug=True)
