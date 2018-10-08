# Import flask and template operators
from flask import Flask, render_template, redirect, request
from flask_mongoengine import MongoEngine
from flask_bootstrap import Bootstrap
from myapps.auth.models import User
from flask_wtf import Form
from wtforms.ext.appengine.db import model_form

# Define the WSGI application object
app = Flask(__name__)
Bootstrap(app)
app.config.from_object('config')
app.config['MONGODB_SETTINGS'] = {
    'db': 'project1',
    'host': 'localhost',
    'port': 27017
}
db = MongoEngine(app)


@app.errorhandler(404)
def not_found(error):
    print(error)
    return render_template('404.html'), 404


@app.route('/registrate')
def registrate_form():
    return render_template('auth/signup.html'), 200


@app.route('/')
def home_page():
    users = User.objects.all()
    return render_template("index.html", users=users), 200

@app.route('/user/add', methods = ['POST','GET'])
def registrate():
    print(request)
    print(request.form['name'])
    print(request.form['login'])
    print(request.form['password'])
    model = User(name=request.form['name'], login=request.form["login"], password=request.form["password"])
    try:
        model.save()
        return redirect("/"), 300
    except:
        pass
    return redirect("/unsuccessful"), 300

