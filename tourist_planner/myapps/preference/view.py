from .models import Preference
from .forms import PreferenceForm
from flask import redirect, request, Blueprint, flash, g, session, url_for, render_template
from ..Users.decorator import requires_login
from ..Users.models import User
preference = Blueprint('preference', __name__, url_prefix='/preference')


@preference.before_request
def before_request():
    g.user = None
    if 'user_id' in session:
        g.user = User.objects(login=session['user_id']).first()


@preference.route('/', methods=['GET', 'POST'])
@requires_login
def add_pref():
    form = PreferenceForm(request.form)
    if request.method == "POST" and form.validate():
        if not g.user is None:
            pref = Preference(start_date=form.start_date.data, end_date=form.end_date.data,
                            user=g.user)
            if form.place.data:
                pref.place = form.place.data
            if form.climate.data:
                pref.climate = form.climate.data
            if form.money.data:
                pref.money = form.money.data
            pref.save()
            return redirect('/')
        else:
            flash("Вы должны зарегистрироваться для сохранения")
            return redirect('/user/me')
    return render_template("preference/form.html", form=form)
