from wtforms import Form, validators
from wtforms.fields import StringField, DateTimeField, IntegerField


class PreferenceForm(Form):
    start_date = DateTimeField('start', )
    end_date = DateTimeField('end',)
    money = IntegerField('money',)
    climate = StringField('climate',)
    place = StringField('place',)