from datetime import timedelta
from operator import methodcaller
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('home.html', title = 'SpeedStats')

@app.route('/contact', methods = ['POST'])
def contact():
    return 'success'