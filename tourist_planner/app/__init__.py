# Import flask and template operators
from flask import Flask, render_template, redirect, request
from flask_pymongo import PyMongo
from flask_bootstrap import Bootstrap
# Import SQLAlchemy

# Define the WSGI application object
app = Flask(__name__)
Bootstrap(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"

mongo = PyMongo(app)

# Configurations
app.config.from_object('config')


@app.errorhandler(404)
def not_found(error):
    print(error)
    return render_template('404.html'), 404


@app.route('/add', methods=['GET','POST'])
def test():
    name = request.args['name']
    users = mongo.db.users
    users.insert({'name': name})
    return redirect("/", code=302)


@app.route('/')
def home_page():
    users = mongo.db.users.find()
    return render_template("index.html", users=users), 200
