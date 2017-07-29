import json
import getpass
class ConfigGenerator():
    def __init__(self):
        self.__config = dict()
        with open("./config/config.sample.json", 'r') as f:
            self.__sample_config = json.load(f)
    def bot_setup(self):
        special = ['token']
        for key in self.__sample_config:
            if key in special:
                special_key = getpass.getpass(prompt=f"{key}: ")
                self.__config[key]  = special_key
            elif isinstance(self.__sample_config[key], list):
                self.__config[key] = list()
                keys = input(f"{key}: ")
                for i in keys.split(' '):
                    self.__config[key].append(i)
            else:
                key_input = input(f"{key}: ")
                self.__config[key] = key_input
        with open("./config/config.json", "w") as f:
            json.dump(self.__config, f)
        return self.__config

#Loads bot config file
class Config():
    def __init__(self):
        self.__config = dict()
        try:
            with open('./config/config.json', 'r') as f:
                self.__config = json.load(f)
        except FileNotFoundError as e:
            self.__config = ConfigGenerator().bot_setup()
        for attr in self.__config:
            setattr(self.__class__, attr, self.__config[attr])
