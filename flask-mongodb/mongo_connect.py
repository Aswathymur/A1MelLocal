#!/usr/bin/env python3
#-*- coding: utf-8 -*-

# Import the required Python modules and Flask libraries
from flask import Flask
from flask import render_template
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

# connect to newly created mellocal database with mongoengine
db = connect('mellocal', host='localhost', port=27017)

db.drop_database('mellocal')

class Category(EmbeddedDocument):
	name 		= StringField()

class Business(Document):
	name		= StringField()
	short_url	= StringField()
	description = StringField()
	logo_url	= StringField()
	website		= StringField()
	location	= PointField()
	avg_spend	= IntField()
	category 	= EmbeddedDocumentField(Category)

class Review(EmbeddedDocument):
	business 	= ReferenceField(Business)
	rating		= IntField()
	comment		= StringField()	

class Favourite(EmbeddedDocument):
	business 	= ReferenceField(Business)

class User(Document):
	email 		= EmailField()
	first_name 	= StringField()
	last_name	= StringField()
	username 	= StringField()
	password	= StringField()
	favourites 	= ListField(EmbeddedDocumentField(Favourite))
	reviews 	= ListField(EmbeddedDocumentField(Review))
	business 	= ReferenceField(Business)



# Add some business categories
cafe 			= Category(name='cafe')
restaurant 		= Category(name='restaurant')
bar 			= Category(name='bar')

# Add some businesses
carlton_cafe 	= Business(name='Carlton Cafe', short_url='carltoncoffee', description='Tasty coffee and French pastries baked daily', logo_url='/carlton_cafe.jpg', website='www.carltoncafe.com.au', location=[1, 1], avg_spend='25', category=cafe).save()
amiconi		 	= Business(name='Amiconi Restaurant', short_url='amiconirestaurant', description='Italian pasta and in house wines, fresh bread, outdoor seating.', logo_url='/amiconi_restaurant.jpg', website='www.amiconirestaurant.com.au', location=[-33, 48], avg_spend='48', category=restaurant).save()

# Add some favourites
favourite1		= Favourite(business=carlton_cafe)
favourite2		= Favourite(business=amiconi)

# Add some reviews
review1			= Review(business=carlton_cafe,rating=4,comment='awesome coffee and great decor')	
review2			= Review(business=amiconi,rating=2,comment='karen here, need to speak to manager')	

# Add some users 
eliza 			= User(email='eliza@example.com', first_name='Eliza', last_name='Lawley', username='Jngy', password='abc123', favourites=[favourite1, favourite2], business=amiconi).save()
harry 			= User(email='harry@example.com', first_name='Harry', last_name='Lawley', username='Harry88', password='abc123').save()
laura 			= User(email='laura@example.com', first_name='Laura', last_name='Lawley', username='Laura77', password='abc123', business=carlton_cafe).save()
aswathy 		= User(email='aswathy@example.com', first_name='Aswathy', last_name='Lawley', username='Aswathy66', password='abc123').save()
shanogeeth		= User(email='shanogeeth@example.com', first_name='Shanogeeth', last_name='Lawley', username='Shano55', password='abc123', reviews=[review1]).save()
luke 			= User(email='luke@example.com', first_name='Luke', last_name='Lawley', username='luke44', password='abc123', reviews=[review2]).save()


# Routes
# Flask returning a string
@app.route("/")
def hello_world():

	html_str = "hello world"
	return html_str

@app.route("/users")
def get_users():
	users = User.objects
	return render_template("users.html", len = len(users), Users = users)

@app.route("/businesses")
def get_businesses():
	businesses = Business.objects
	return render_template("businesses.html", len = len(businesses), Businesses = businesses)


if __name__ == '__main__':
	app.run(debug=True)
