#!/usr/bin/env python3
#-*- coding: utf-8 -*-

# Import the required Python modules and Flask libraries
from flask import Flask
from flask import render_template
from flask_pymongo import PyMongo
from flask_googlemaps import GoogleMaps
from flask_googlemaps import Map
from flask_mongoengine.wtf import model_form
from flask import request
from pymongo import MongoClient
from mongoengine import *


app = Flask(__name__)

# you can set key as config
app.config['GOOGLEMAPS_KEY'] = "AIzaSyCv_3pqivLISWN2zh5gmxDo44ydWIL7ppo"	

GoogleMaps(app)

# Configure the Flask application to connect with the MongoDB server
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
	address 	= StringField()
	short_url	= StringField()
	description = StringField()
	logo_url	= StringField()
	website		= StringField()
	latitude	= DecimalField()
	longitude	= DecimalField()
	avg_spend	= IntField()
	category 	= EmbeddedDocumentField(Category)

	meta = {'indexes': [
		{'fields': ['$name', "$description"],
		'default_language': 'english',
		'weights': {'name': 10, 'description': 2}
		}
	]}

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


def getMarkersFromBusinessObjects(businesses):
	markers = []
	for business in businesses:
		marker 		      = {}
		marker['infobox'] = "<div class='infobox container'><div class='row'><div class='col'><img class='rounded mx-auto d-block logo' src='/static/images/Logo.png' alt='MelLocal Logo' width='72px' height='72px'></div></div><h1>" + business.name + "</h1><br><p>" + business.address + "</p></div>"
		marker['icon']    = "/static/images/place-24px.svg"
		marker['lat']     = float(business.latitude)
		marker['lng']     = float(business.longitude)
		markers.append(marker)
	return markers


# Add some business categories
cafe 			= Category(name='cafe')
restaurant 		= Category(name='restaurant')
bar 			= Category(name='bar')

# Add some businesses
carlton_cafe 	= Business(name='Carlton Cafe', address='23 Lygon Street Carlton', short_url='carltoncoffee', description='Tasty coffee and French pastries baked daily', logo_url='/carlton_cafe.jpg', website='www.carltoncafe.com.au', latitude='-37.817769', longitude='144.972346', avg_spend='25', category=cafe).save()
brunswick_cafe 	= Business(name='Brunswick Cafe', address='23 Lygon Street Brunswick', short_url='brunswickcoffee', description='Tasty coffee and French pastries baked daily in house at our cafe', logo_url='/carlton_cafe.jpg', website='www.carltoncafe.com.au', latitude='-37.862769', longitude='144.972346', avg_spend='25', category=cafe).save()
amiconi		 	= Business(name='Amiconi Restaurant', address='45 Drummond Street, Melbourne', short_url='amiconirestaurant', description='Italian pasta and in house wines, fresh bread, outdoor seating.', logo_url='/amiconi_restaurant.jpg', website='www.amiconirestaurant.com.au', latitude='-37.812767', longitude='144.962346', avg_spend='48', category=restaurant).save()

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

@app.route("/base")
def get_base():
	return render_template("base.html")

# Flask returning a Map
@app.route("/map")
def get_map():
	mymap = Map(
		identifier = "view-side",
		lat = -37.812365,
		lng = 144.962338,
		markers = getMarkersFromBusinessObjects(Business.objects)
	)
	return render_template('map.html', mymap=mymap)

# Search 
@app.route("/search", methods=['GET'])
def search_string():

	# search string
	string = request.args.get('search_term')

	# businesses
	if string == None:
		businesses = Business.objects
	else:
		businesses = Business.objects.search_text(string)
		for business in businesses:
			print(business.name, business.short_url)

	# map
	mymap = Map(
		identifier = "view-side",
		lat = -37.812365,
		lng = 144.962338,
		markers = getMarkersFromBusinessObjects(businesses),
		fit_markers_to_bounds = True
	)

	# render
	return render_template('map.html', mymap=mymap)


def add_user(request):
	user = PostForm(request.POST)
	if request.method == 'POST' and form.validate():
		db.user.insertOne(user)
	return redirect(url_for('/'))
	# change this to success URL

BusinessForm = model_form(Business)

def add_business(request):
	business = PostForm(request.POST)
	if request.method == 'POST' and form.validate():
		db.business.insertOne(business)
	return redirect(url_for('/'))
	# change this to success URL


def add_review(request):
	review = PostForm(request.POST)
	if request.method == 'POST' and form.validate():
		db.review.insertOne(review)
	return redirect(url_for('/'))


if __name__ == '__main__':
	app.run(debug=True)
