import os
import tempfile
from flask import Flask, request, jsonify, send_file
from PyPDF2 import PdfReader, PdfWriter, PdfMerger
import io

app = Flask(__name__)

temp_files = {}

@app.route('/', methods=['GET'])
def root():
    return "OK", 200

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


@app.route('/remove', methods=['POST'])
def remove_pages():
    # check if request contains necessary parameters
    if 'file' not in request.files or 'indexes' not in request.form:
        return "Invalid request parameters", 400

    # retrieve file from request
    file = request.files['file']

    # create PDF reader and writer
    reader = PdfReader(file)
    writer = PdfWriter()

    # retrieve indexes to remove
    indexes = [int(index) for index in request.form.getlist('indexes')]

    # loop through pages and add to writer if not in indexes
    for i in range(len(reader.pages)):
        if i not in indexes:
            writer.add_page(reader.pages[i])

    # create temporary file to save the updated PDF
    temp_file = tempfile.NamedTemporaryFile(suffix='.pdf', delete=False)
    with open(temp_file.name, 'wb') as output_file:
        writer.write(output_file)

    # add the temporary file to the list
    temp_files[temp_file.name] = temp_file

    # return the temporary file for download
    return send_file(temp_file.name, download_name=temp_file.name, as_attachment=True)


@app.route('/reorder', methods=['POST'])
def reorder_pages():
    # check if request contains necessary parameters
    if 'file' not in request.files or 'indexes' not in request.form:
        return "Invalid request parameters", 400

    # retrieve file from request
    file = request.files['file']

    # create PDF reader and writer
    reader = PdfReader(file)
    writer = PdfWriter()

    # retrieve indexes for reordering
    indexes = [int(index) for index in request.form.getlist('indexes')]

    # loop through indexes and add corresponding pages to writer
    for index in indexes:
        if index < 0 or index >= len(reader.pages):
            return "Invalid page index", 400
        writer.add_page(reader.pages[index])

    # create temporary file to save the reordered PDF
    temp_file = tempfile.NamedTemporaryFile(suffix='.pdf', delete=False)
    with open(temp_file.name, 'wb') as output_file:
        writer.write(output_file)

    # add the temporary file to the list
    temp_files[temp_file.name] = temp_file

    # return the temporary file for download
    return send_file(temp_file.name, download_name=temp_file.name, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)
