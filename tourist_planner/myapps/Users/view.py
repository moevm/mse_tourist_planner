from myapps.Users.models import User
from flask import redirect, request, Blueprint, flash, g, session, url_for, render_template
from myapps.Users.decorator import requires_login

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


@user.route('/login')
def login_form():
    return render_template("Users/login.html")


@user.route('/login/add', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        user = User.objects(login=request.form.get('login')).first()
        print(user)
        if user and user.password == request.form.get('password'):
            session['user_id'] = user.login
            flash('Welcome %s', user.name)
            return redirect(url_for('users.home'))
    return redirect("/users/login")


@user.route('/register')
def register_form():
    return render_template("Users/register.html")


@user.route('/register/add', methods=['POST', 'GET'])
def register():
    print(request)
    print(request.form)
    if request.method == "POST":
        model = User(name=request.form.get("username"), login=request.form.get("login"),
                     password=request.form.get("password"))
        print(request.args.get("login"))
        try:
            model.save()
            session['user_id'] = model.login
            flash('Thanks for registering')
            return redirect(url_for('users.home'))
        except Exception as err:
            print(err)
            pass
    return redirect("/users/register")


