from email.utils import make_msgid
from re import sub
from flask import Flask, render_template, request
from flask_mail import Mail, Message

app = Flask(__name__)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'rmthomas1998@gmail.com'
app.config['MAIL_PASSWORD'] = 'eyqxwoyxnnoembxr'
app.config['MAIL_DEFAULT_SENDER'] = 'rmthomas1998@gmail.com'
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/email', methods=['POST'])
def email():
    first_name = request.form['first-name']
    last_name = request.form['last-name']
    email = request.form['email']
    message = request.form['message']

    msg = Message('Customer Inquiry', sender='rmthomas1998@gmail.com')
    msg.add_recipient('ryanmthomas01@gmail.com')
    msg.body = message

    mail.send(msg)
    return render_template('email-sent.html')

if __name__ == "__main__":
    app.run(debug=True)

