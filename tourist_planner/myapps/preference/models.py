from mongoengine import Document
from mongoengine import StringField, IntField, ReferenceField, DateTimeField
import datetime
from myapps.Users.models import User


class Preference(Document):
    start_date = DateTimeField(required=False, default=datetime.datetime.now().date())
    end_date = DateTimeField(required=False, default=datetime.datetime.now().date())
    money = IntField(min_value=0, required=False)
    temp = StringField(max_length=60, required=False)
    climate = StringField(max_length=60, required=False)
    place = StringField(max_length=60, required=True)
    user = ReferenceField(document_type=User, required=True, reverse_delete_rule='CASCADE')

