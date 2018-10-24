# Import flask and template operators
from flask import Flask, render_template, redirect, request
from flask_mongoengine import MongoEngine
from flask_bootstrap import Bootstrap
from myapps.Users.models import User

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


@app.route('/')
def home_page():
    users = User.objects.all()
    if users:
        return render_template("base.html", users=users), 200
    return render_template("base.html"), 200


from myapps.Users.view import user as userModule
app.register_blueprint(userModule)

from myapps.preference.view import preference as preferenceModule
app.register_blueprint(preferenceModule)