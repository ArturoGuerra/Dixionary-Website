from dixionary import app, client
from threading import Thread
TOKEN = "MjY3MzQwMzY1MzQ4OTk1MDcy.DFBNtA.cRJkFF7nkBu0zL2-fjAIY61JmFE"
t = Thread(target=client.run, args=(TOKEN,))
t.start()

if __name__ == "__main__":
    app.run(port=8080)
