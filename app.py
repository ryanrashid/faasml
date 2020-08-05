from flask import Flask, request, render_template
import os
import requests
import base64

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/inception')
def inception():
    return render_template('incept.html')


@app.route('/pigo')
def pigo():
    return render_template('blur.html')


@app.route('/colidr')
def colidr():
    return render_template('colidr.html')


@app.route('/colorize')
def colorize():
    return render_template('colorize.html')


@app.route('/process', methods=['POST'])
def categorize():
    url = request.form.get('url')
    gateway_hostname = os.getenv("gateway_hostname", "gateway")
    r = requests.get("http://" + gateway_hostname + ".openfaas:8080/function/inception", data=url)
    return r.text


@app.route('/blur', methods=['POST'])
def blur():
    url = request.form.get('url')
    gateway_hostname = os.getenv("gateway_hostname", "gateway")
    r = requests.get("http://" + gateway_hostname + ".openfaas:8080/function/face-blur",
                     data=url)
    data = base64.b64encode(r.content)
    return data


@app.route('/draw', methods=['POST'])
def draw():
    url = request.form.get('url')
    gateway_hostname = os.getenv("gateway_hostname", "gateway")
    r = requests.get("http://" + gateway_hostname +
                     ".openfaas:8080/function/coherent-line-drawing", data=url)
    data = base64.b64encode(r.content)
    return data


@app.route('/color', methods=['POST'])
def color():
    url = request.form.get('url')
    gateway_hostname = os.getenv("gateway_hostname", "gateway")
    r = requests.get("http://" + gateway_hostname +
                     ".openfaas:8080/function/colorise", data=url)
    data = base64.b64encode(r.content)
    return data


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
