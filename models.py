import pymysql
from peewee import *
from playhouse.shortcuts import RetryOperationalError
from config import Config
class MyRetryDB(RetryOperationalError, MySQLDatabase):
    pass
cfg = Config()
try:
    my_db = MyRetryDB(
        cfg.dbname,
        host=cfg.dbhost,
        port=3306,
        user=cfg.dbuser,
        password=cfg.dbpasswd,
        charset = 'utf8mb4')
except Exception as e:
    my_db = None

class BaseModel(Model):
    class Meta:
        database = my_db

class Servers(BaseModel):
    serverID = BigIntegerField(null=False, primary_key=True)
    servername = CharField(null=False, max_length=35)
    prefix = CharField(null=False, max_length=2, default='~')
    member_role = BigIntegerField(null=True)
    staff_role = BigIntegerField(null=True)
    spammer_role = BigIntegerField(null=True)
    playlist = CharField(null=True, max_length=50)
class Channels(BaseModel):
    server = ForeignKeyField(Servers, db_column='server', primary_key=True)
    dix = BigIntegerField(null=True)
    log = BigIntegerField(null=True)
    guest = BigIntegerField(null=True)
    announcements = BigIntegerField(null=True)
    voice_channel = BigIntegerField(null=True)
class Users(BaseModel):
    userID = BigIntegerField(null=False, primary_key=True)
    bot = BooleanField(null=False)
class Perms(BaseModel):
    server = ForeignKeyField(Servers, db_column='server')
    user = ForeignKeyField(Users, db_column='user')
    permlevel = IntegerField(null=False, default=0)
    dixstate = IntegerField(null=False, default=0)
    class Meta:
        primary_key = CompositeKey('server', 'user')
class Pluginoverides(BaseModel):
    server = ForeignKeyField(Servers, db_column='server')
    plugin = CharField(null=False)
    class Meta:
        primary_key = CompositeKey('server', 'plugin')
class Overides(BaseModel):
    server = ForeignKeyField(Servers, db_column='server')
    command = CharField(null=False)
    status = BooleanField(null=False)
    level = IntegerField(null=False)
    class Meta:
        primary_key = CompositeKey('server', 'command')
class Calloverides(BaseModel):
    server = ForeignKeyField(Servers, db_column='server')
    command = CharField(null=False)
    active = BooleanField(null=False, default=False)
    class Meta:
        primary_key = CompositeKey('server', 'command')
class Dixionary(BaseModel):
    word = CharField(null=False, primary_key=True)
    vord = CharField(null=False)
class Rewards(BaseModel):
    user = ForeignKeyField(Users, db_column='user')
    server = ForeignKeyField(Servers, db_column='server')
    amount = BigIntegerField(null=False)
    class Meta:
        primary_key = CompositeKey('user', 'server')
class Quotes(BaseModel):
    word = CharField(null=False, primary_key=True)
    phrase = CharField(null=False)
class Memes(BaseModel):
    word = CharField(null=False, primary_key=True)
    meme = CharField(null=False)
class Punishments(BaseModel):
    ID = BigIntegerField(null=False, primary_key=True)
    user = BigIntegerField(null=False)
    server = BigIntegerField(null=False)
    offence = CharField(null=False)
    reason = CharField(null=False)
    staff = BigIntegerField(null=False)
    stafflvl = BigIntegerField(null=False, default=5)
class Playlists(BaseModel):
    playlist = CharField(null=False)
    link = CharField(null=False)
    class Meta:
        primary_key = None
