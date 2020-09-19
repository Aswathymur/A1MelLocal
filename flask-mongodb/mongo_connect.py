#!/usr/bin/env python3
#-*- coding: utf-8 -*-

# Import the required Python modules and Flask libraries
from flask import Flask
from flask_pymongo import PyMongo
from pymongo import MongoClient
from mongoengine import *

# Configure the Flask application to connect with the MongoDB server
app = Flask(__name__)
app.config["MONGO_URI"] 	= "mongodb://localhost:27017/mellocal"
app.config['MONGO_DBNAME'] 	= 'mellocal'

# super secret key - used for generating cookies for users across sessions
app.config['SECRET_KEY'] 	= '!?~?k????<7g?2'

# create a connection to MongoDB (default localhost, port: 27017)
client = MongoClient()

# create the database - if it doesn't exist will create it
db = client['mellocal']

# connect to newly created mellocal database with mongoengine
connect('mellocal', host='localhost', port=27017)

class Category(EmbeddedDocument):
	name 		= StringField()

class Business(EmbeddedDocument):
	name		= StringField()
	short_url	= StringField()
	description = StringField()
	logo_url	= StringField()
	website		= StringField()
	location	= PointField(auto_index=True)
	avg_spend	= IntField()
	category 	= EmbeddedDocumentField(Category)

class Favourite(EmbeddedDocument):
	business 	= EmbeddedDocumentField(Business)

class Review(EmbeddedDocument):
	business 	= EmbeddedDocumentField(Business)

class User(Document):
	email 		= EmailField()
	name 		= StringField()
	username 	= StringField()
	password	= StringField()
	favourites 	= ListField(EmbeddedDocumentField(Favourite))
	reviews 	= ListField(EmbeddedDocumentField(Review))
	business 	= EmbeddedDocumentField(Business)

# Declare an app function that will return some HTML
@app.route("/")
def hello_world():

	# Declare a string for app's frontend
	html_str = "hello world"

	return html_str

if __name__ == '__main__':
	app.run(debug=True)
