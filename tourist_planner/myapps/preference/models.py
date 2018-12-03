from mongoengine import Document
from mongoengine import StringField, IntField, ReferenceField, DateTimeField
import datetime
from myapps.Users.models import User


class Preference(Document):

    start_date = DateTimeField(required=False, default=datetime.datetime.now().date())
    end_date = DateTimeField(required=False, default=datetime.datetime.now().date())
    place = StringField(max_length=60, required=True)
    user = ReferenceField(document_type=User, required=True, reverse_delete_rule='CASCADE')
    hotel_name = StringField(max_length=40, required=True)
    hotel_picture = StringField(max_length=100, required=True)
    hotel_price = IntField(min_value=0, required=True)

