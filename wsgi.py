from dixionary import app, client, cfg
from threading import Thread
TOKEN = cfg.token
t = Thread(target=client.run, args=(TOKEN,))
t.start()

if __name__ == "__main__":
    app.run(port=8080)
