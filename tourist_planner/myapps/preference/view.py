from .models import Preference

from flask import redirect, request, Blueprint, flash, g, session, url_for, render_template
from ..Users.decorator import requires_login
from ..Users.models import User
import json
preference = Blueprint('preference', __name__, url_prefix='/preference')


@preference.before_request
def before_request():
    g.user = None
    if 'user_id' in session:
        g.user = User.objects(login=session['user_id']).first()

@preference.route('/add')
@requires_login
def add_pref():
    return render_template("preference/form.html")


@preference.route('/form_add', methods=['POST', 'GET'])
@requires_login
def pars_form():
    print(request.form)
    other_fields = request.form.get('other_fields')
    field_dict = json.loads(other_fields)
    login = session['user_id']
    if login:
        user = User.objects(login=login).first()
        new_pref = Preference(user=user)
        new_pref.start_date = request.form.get('start_date')
        new_pref.end_date = request.form.get('end_date')
        new_pref.place = request.form.get('city')
        new_pref.hotel_name = field_dict['hotel_name']
        new_pref.hotel_price = field_dict['hotel_price']
        new_pref.hotel_picture = field_dict['hotel_picture']
        new_pref.shared = False
        new_pref.user_list = [user]
        print(new_pref)
        try:
            new_pref.save()
            return redirect("preference/")
        except Exception as ex:
            print(ex)
            pass
    return render_template("404.html")

@preference.route('/', methods=['GET', 'POST'])
@requires_login
def all_pref():
    login = session['user_id']
    #Preference.objects.all().delete()
    user = User.objects(login=login).first()
    preferences_list = Preference.objects.filter(user_list__contains=user)
    return render_template("preference/list.html", preferences=preferences_list)



@preference.route('/share', methods=['GET', 'POST'])
def share():
    r = request.get_json()
    print(r["name"])
    pref = Preference.objects(hotel_name=r["name"]).first()
    print(pref)
    user = User.objects(login=session['user_id'])
    if pref.user == user:
        pref.shared = not pref.shared
    print(pref.shared)
    pref.save()
    return redirect("/")


@preference.route('/free', methods=['GET', 'POST'])
def render():
    print('lolkek')
    pref = Preference.objects(shared=True)
    return render_template("preference/shared.html", preferences=pref)

@requires_login
@preference.route('/sub', methods=['GET', 'POST'])
def share_submit():
    r = request.get_json()
    print(r["name"])
    pref = Preference.objects(hotel_name=r["name"]).first()
    print(pref)
    login = session["user_id"]
    user = User.objects(login=login).first()
    list = pref.user_list
    print(list)
    if user in list:
        list.remove(user)
    else:
        list.append(user)
    print(list)
    pref.user_list = list
    print(pref.shared)
    print(pref.user_list)
    pref.save()
    return render_template("preference/list.html", preferences=pref)

