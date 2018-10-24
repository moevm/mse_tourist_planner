from myapps.Users.models import User
from flask_login import current_user, login_user
from flask import redirect, request, Blueprint, flash, g, session, url_for, render_template
from myapps import app
from myapps.Users.decorator import requires_login
from myapps.Users.forms import LoginForm, RegisterForm
from myapps import db

user = Blueprint('users', __name__, url_prefix='/users')


@user.route('/')
def users():
    users = User.objects.all()
    return render_template('main.html', users=users)


@user.route('/me/')
@requires_login
def home():
    return render_template('Users/profile.html', user=g.user)


@user.before_request
def before_request():
    g.user = None
    if 'user_id' in session:
        g.user = User.objects(login=session['user_id']).first()


@user.route('/logout/')
@requires_login
def logout():
    session['user_id'] = None
    return redirect(url_for('users.home', _external=True))


@user.route('/login/', methods=['GET', 'POST'])
def login():
    form = LoginForm(request.form)
    if request.method == "POST" and form.validate():
        user = User.objects(login=form.login.data).first()
        if user and user.password == form.password.data:
            session['user_id'] = user.login
            flash('Welcome %s', user.name)
            return redirect(url_for('users.home'))
        flash('Wrong email or password')
    return render_template("Users/login.html", form=form)


@user.route('/register/', methods=['POST', 'GET'])
def register():
    form = RegisterForm(request.form)
    if request.method == "POST" and form.validate():
        model = User(name=form.username.data, login=form.login.data, password=form.password.data)
        try:
            model.save()
            session['user_id'] = model.login
            flash('Thanks for registering')
            return redirect(url_for('users.home'))
        except:
            pass
    return render_template("Users/register.html", form=form)


