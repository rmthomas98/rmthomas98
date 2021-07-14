from enum import unique
from flask import Flask, render_template, request, flash, redirect, url_for, session, jsonify
from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy
from datetime import date, datetime, time, timedelta
from sqlalchemy.orm import defaultload
import os
from werkzeug.exceptions import RequestHeaderFieldsTooLarge, RequestedRangeNotSatisfiable
from werkzeug.wrappers.request import PlainRequest
import json
import stripe

stripe.api_key = "sk_test_51JAxp2F124ucKAQocBFd1Ivxxpj4YRPSHcNVnZWdB5rhpBXegcyNigbf6E4tEuPDsrj7XzX0dh6xKK12QK8M8Qa900TYmxILAG"

# initialize app
app = Flask(__name__)
# Secret Key
app.secret_key = os.urandom(20)
# session time
app.permanent_session_lifetime = timedelta(days=30)
# Add Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
# Initialize the database
db = SQLAlchemy(app)
# create database model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    plan = db.Column(db.String(100), default="free")
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    # constructor
    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

# Mail Configuration
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'rmthomas1998@gmail.com'
app.config['MAIL_PASSWORD'] = 'eyqxwoyxnnoembxr'
app.config['MAIL_DEFAULT_SENDER'] = 'rmthomas1998@gmail.com'
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

# home route
@app.route("/")
def index():
    return render_template('home.html', title = 'SpeedStats')

# pricing route
@app.route("/pricing_page")
def pricing_page():
    return redirect("http://192.168.1.100:5000/#s2")

# sign up route
@app.route("/signup_page")
def signup_page():
    return render_template('signup.html', title = 'Sign Up')

# login page
@app.route("/client_portal")
def client_portal():
    if 'user' in session:
        return redirect(url_for('main_app'))
    else:
        return render_template('client-portal.html', title = 'Client Portal')

# contact route
@app.route("/contact_page")
def contact_page():
    return redirect("http://192.168.1.100:5000/#s4")

# about route 
@app.route("/about_page")
def about_page():
    return redirect("http://192.168.1.100:5000/#s3")

# features route
@app.route("/features_page")
def features_page():
    return redirect("http://192.168.1.100:5000/#s5")

# contact form submission
@app.route('/contact', methods = ["POST", "GET"])
def contact():
    if request.method == "POST":
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        msg = Message('Customer Inquiry', sender="rmthomas1998@gmail.com")
        msg.add_recipient('ryanmthomas01@gmail.com')
        msg.html = f'<p><b>NAME: </b>{name}</p><br><p><b>EMAIL: </b>{email}</p><br><p><b>MESSAGE: </b>{message}</p>'
        mail.send(msg)
        flash('Thank You for reaching out...We will get back with you as soon as possible!')
        return render_template('contact-thanks.html', title = 'SpeedStats - Thank you')


# signup form submission
@app.route("/signup", methods = ["POST", "GET"])
def signup():
    if request.method == "POST":
        fname = request.form['fname']
        lname = request.form['lname']
        email = request.form['email']
        password = request.form['password']
        # check if user exists
        if User.query.filter_by(email=email).first():
            flash('Email already in use...')
            flash('Use a different email')
            flash('or try logging in')
            return render_template('signup.html')
        else:
            # inserting the user into database and rendering login page
            user = User(fname, lname, email, password)
            db.session.add(user)
            db.session.commit()
            flash('Your account has been created!')
            flash('You can now login')
            return render_template('client-portal.html', title="Client Portal")
    else:
        return render_template('signup.html')

# login user and create session
@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        email = request.form['email']
        password = request.form['password']
        check_user = User.query.filter_by(email=email).first()
        # check if user exist and creates session
        if check_user:
            user = check_user
            if user.password == password:
                session.permanent = True
                session['user'] = user.id
                session['first name'] = user.first_name
                session['last name'] = user.last_name
                session["email"] = user.email
                session['plan'] = user.plan
                return redirect(url_for('main_app'))
            else:
                flash('email or password is incorrect')
                return render_template('client-portal.html')
    flash('email or password is incorrect')
    return render_template('client-portal.html')

@app.route("/main_app")
def main_app():
    if 'user' in session:
        user = session["user"]
        first_name = session["first name"]
        last_name = session["last name"]
        email = session["email"]
        plan = session["plan"]

        if plan == 'free':
            return render_template('choose-plan.html', first_name=first_name)
        else:
            return render_template('main-app.html', first_name=first_name)
    return render_template('client-portal.html')

@app.route("/logout")
def logout():
    session.pop('user', None)
    return redirect(url_for('client_portal'))

@app.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        intent = stripe.PaymentIntent.create(
            amount=299,
            currency='usd',
            payment_method_types=['card']
        )
        return jsonify({
          'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403