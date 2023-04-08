import os
import tempfile
from flask import Flask, request, jsonify, send_file
from PyPDF2 import PdfMerger
import io

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

@app.route('/merge-pdf', methods=['POST'])
def merge_pdf():
    # check if request contains files
    if 'files[]' not in request.files:
        return "No files provided", 400

    # retrieve files from request
    files = request.files.getlist('files[]')

    # create PDF merger
    merger = PdfMerger()

    # loop through files and add to merger
    for file in files:
        if file.mimetype != 'application/pdf':
            return "Invalid file type", 400
        merger.append(file)

    # merge files and create response
    output = io.BytesIO()
    merger.write(output)
    output.seek(0)
    return send_file(output, download_name="merged.pdf", as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
