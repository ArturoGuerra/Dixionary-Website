import discord
import requests
from flask import *
from models import *
from config import Config
cfg = Config()
client = discord.Client()
app = Flask(__name__)
apikey = cfg.dixionaryapi

class DixionaryVords():
    def __init__(self, vord, word):
        self.word = word
        self.vord = vord

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dixionary')
def dixionary():
    request = requests.get("http://api.dixionary.com/dixionary/vords", data=apikey)
    dixionary_dict = request.json()
    dix = list()
    for vord in dixionary_dict:
        dix.append(DixionaryVords(vord, dixionary_dict[vord]))
    return render_template('dixionary.html', dixionary=dix)

@app.route('/status')
def status():
    return render_template('status.html')

@app.route('/bot')
def bot():
    abort(404)
    return render_template('bot.html')

@app.route('/servers')
def servers():
    abort(404)
    return render_template("servers.html", servers=list(client.servers))

@app.errorhandler(404)
def page_not_found(error):
    return render_template("custom_404.html"), 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
