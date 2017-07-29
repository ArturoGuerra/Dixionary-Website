from dixionary import app, client, config
from threading import Thread
TOKEN = config.token
t = Thread(target=client.run, args=(TOKEN,))
t.start()

if __name__ == "__main__":
    app.run(port=8080)
