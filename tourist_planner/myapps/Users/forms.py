from wtforms import Form, validators
from wtforms.fields import StringField, PasswordField, BooleanField
from wtforms.validators import DataRequired, EqualTo, Email


class LoginForm(Form):
    login = StringField('Email address', [validators.Length(min=4, max=25), Email()])
    password = PasswordField('Password', [validators.DataRequired()])


class RegisterForm(Form):
    username = StringField('NickName',)
    login = StringField('Email Address',)
    password = PasswordField('New Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords must match')
    ])
    confirm = PasswordField('Repeat Password')

