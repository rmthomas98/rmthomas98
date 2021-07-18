from enum import unique
from random import seed
from flask import Flask, render_template, request, flash, redirect, url_for, session, jsonify
from flask.wrappers import Response
from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy
from datetime import date, datetime, time, timedelta
import sqlalchemy
from sqlalchemy.orm import defaultload
from stripe.api_resources import customer, line_item, payment_intent, payment_method
from werkzeug.exceptions import RequestHeaderFieldsTooLarge, RequestedRangeNotSatisfiable
from werkzeug.wrappers.request import PlainRequest
import os, json, stripe

# initialize app
app = Flask(__name__)

# stipe keys
app.config['STRIPE_PUBLIC_KEY'] = 'pk_test_51JAxp2F124ucKAQo7KtdCwvLoHXJy7tjvh5nCaPnxnrQKG0zjblM9tm7xVTA4UWSnav1b8UBPR6QglyGvMkTYsRr00i7L4aPdQ'
app.config['STRIPE_SECRET_KEY'] = 'sk_test_51JAxp2F124ucKAQocBFd1Ivxxpj4YRPSHcNVnZWdB5rhpBXegcyNigbf6E4tEuPDsrj7XzX0dh6xKK12QK8M8Qa900TYmxILAG'
app.config['STRIPE_WEBHOOK_SECRET'] = 'whsec_mxOdU4gYHjMzMZLNeb0wkCnEtTOGj2k6'
stripe.api_key = app.config['STRIPE_SECRET_KEY']

# Secret Key
app.secret_key = os.urandom(20)

# session time
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=31)

# Add user Database and customer database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///customers.db'
# Initialize the database
db = SQLAlchemy(app)
# user database
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

# customer database
class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    customer_id = db.Column(db.String(250), nullable=False)
    paid = db.Column(db.String(250), nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    #constructor
    def __init__(self, user_id, customer_id, paid):
        self.user_id = user_id
        self.customer_id = customer_id
        self.paid = paid

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
    if 'user' in session:
        user = session['user']
        print(user)
    return render_template('home.html', title = 'SpeedStats')

# pricing route
@app.route("/pricing_page")
def pricing_page():
    return redirect("http://localhost:5000/#s2")

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
    return redirect("http://localhost:5000/#s4")

# about route 
@app.route("/about_page")
def about_page():
    return redirect("http://localhost:5000/#s3")

# features route
@app.route("/features_page")
def features_page():
    return redirect("http://localhost:5000/#s5")

# thanks for subscribing route
@app.route("/thanks")
def thanks():
    return render_template('thanks.html')

#choose plan route after login and redirect if cancel payment
@app.route("/choose-plan")
def choose_plan():
    if 'user' in session:
        first_name = session.get('first name')
    return render_template('choose-plan.html', first_name=first_name)

# contact form submission
@app.route('/contact', methods = ["POST", "GET"])
def contact():
    if request.method == "POST":
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        # create email 
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
            # login
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

# log out
@app.route("/logout")
def logout():
    session.pop('user', None)
    return redirect(url_for('client_portal'))

# brings user to main application once sign in 
@app.route("/main_app")
def main_app():
    #check if user in session
    try:
        if 'user' in session:
            user = session["user"]
            first_name = session["first name"]
            last_name = session["last name"]
            email = session["email"]
            plan = session["plan"]
            # check if user is customer or not and redirects
            if plan == 'free':
                return render_template('choose-plan.html', first_name=first_name)
            else:
                return render_template('main-app.html', first_name=first_name)
        return render_template('client-portal.html')
    except Exception as e:
        return jsonify({'error': {'message': str(e)}}), 400

# create checkout session
@app.route("/create-checkout-session", methods=["GET", 'POST'])
def create_checkout_session():
    # get price fron input frontend
    price = request.form['priceId']
    # create checkout session
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
            'price': price,
            'quantity': 1
        }],
        mode='subscription',
        success_url='http://127.0.0.1:5000/thanks',
        cancel_url='http://127.0.0.1:5000/choose-plan'
    )
    return redirect(session.url, code=303)


@app.route('/webhook', methods=["POST"])
def webhook_received():
    webhook_secret = app.config['STRIPE_WEBHOOK_SECRET']
    # get data 
    request_data = json.loads(request.data)
    # check webhook secret
    if webhook_secret:
        signature = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(payload=request.data, sig_header=signature,  secret=webhook_secret)
            data = event['data']
        except Exception as e:
            return e

        event_type = event['type']
    else:
        data = request_data['data']
        event_type = request_data['type']
    data_object = data['object']

    customer_id = None
    if 'user' in session:
        user_id = session['user']
    if event_type == 'checkout.session.completed':
        #set customer id
        customer_id = data['object']['customer']
        print(user_id)
    elif event_type == 'invoice.paid':
        # get payment status
        payment_status = data['object']['paid']
        check_customer = Customer.query.filter_by(customer_id=customer_id).first()
        if check_customer:
            check_customer['paid'] = payment_status
            db.session.commit()
        else:
            customer = Customer(user_id, customer_id, payment_status)
            db.session.add(customer)
            db.session.commit()
            # NEED TO GIVE PRIVELAGES TO USE APP

    elif event_type == 'invoice.payment_failed':
        #get payment status
        payment_status = data['object']['paid']
        # find customer in database
        customer = Customer.query.filter_by(customer_id=customer_id).first()
        # set paid to false
        customer['paid'] = payment_status
        # commit to db
        db.session.commit()
        #NEED TO DO SOMETHING ONCE PAYMENT FAILS
        # GIVE AN UPDATE TO MAIN APP TO NOTIFY 
        # TAKE AWAY PRIVELAGES
        # SEND EMAIL NOTIFYING 
    else:
        print('unhandled event type {}'.format(event_type))
    
    return jsonify({'status': 'success'})