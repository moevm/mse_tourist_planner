from mongoengine import Document
from mongoengine import StringField
from flask_bcrypt import Bcrypt


class User(Document):
    name = StringField(max_length=20, required=True, unique=False)
    login = StringField(max_length=60, required=True, unique=True)
    password = StringField(max_length=60, required=True)

    def get_name(self):
        return self.name

    def hash_password(self):
        self.password = Bcrypt.generate_password_hash(self.password, 4)
        print(self.password)

    def check_password(self, password):
        return Bcrypt.check_password_hash(self.password, password)
