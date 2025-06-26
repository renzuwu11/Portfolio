from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')

mail = Mail(app)

@app.route("/send-message", methods=["POST"])
def send_message():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"success": False, "error": "Missing fields"}), 400

    try:
        msg = Message(
            subject=f"Portfolio Contact Form: {name}",
            recipients=["renzpaul.fababeir01@gmail.com"],
            body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        )
        mail.send(msg)
        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/")
def home():
    return redirect(url_for("about-me"))

@app.route("/about-me")
def about():
    return render_template("about-me.html", page="about-me")

@app.route("/resume")
def resume():
    return render_template("resume.html", page="resume")

@app.route("/projects")
def projects():
    return render_template("projects.html", page="projects")

@app.route("/contact")
def contact():
    return render_template("contact.html", page="contact")

if __name__ == "__main__":
    app.run(debug=True)
