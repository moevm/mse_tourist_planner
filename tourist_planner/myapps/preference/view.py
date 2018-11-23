from .models import Preference
from flask import redirect, request, Blueprint, flash, g, session, url_for, render_template
from ..Users.decorator import requires_login
from ..Users.models import User
preference = Blueprint('preference', __name__, url_prefix='/preference')


@preference.before_request
def before_request():
    g.user = None
    if 'user_id' in session:
        g.user = User.objects(login=session['user_id']).first()

@preference.route('/add')
@requires_login
def all_pref():

    return render_template("preference/form.html")

@preference.route('/', methods=['GET', 'POST'])
@requires_login
def add_pref():
    print(request.form)
    return render_template("preference/list.html")
