#!/usr/bin/env python3
#-*- coding: utf-8 -*-

# Import the required Python modules and Flask libraries
from flask import Flask
from flask_pymongo import PyMongo
from pymongo import MongoClient

# Configure the Flask application to connect with the MongoDB server
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/SomeDatabase"
app.config['MONGO_DBNAME'] = 'SomeCollection'
app.config['SECRET_KEY'] = 'secret_key'

# Connect to MongoDB using Flask's PyMongo wrapper
mongo = PyMongo(app)
db = mongo.db
col = mongo.db["Some Collection"]
print ("MongoDB Database:", mongo.db)

# Declare an app function that will return some HTML
@app.route("/")
def connect_mongo():

	# Setup the webpage for app's frontend
	html_str = '''
	<!DOCTYPE html>
	<html lang="en">
	'''

	# Have Flask return some MongoDB information
	html_str = html_str + "# Object Rocket Flask App Tutorial"
	html_str += '<br>'

	html_str = html_str + "## mongo.cx client instance:" + str(mongo.cx)
	html_str += '<br>'

	html_str = html_str + "### " + str(db)
	html_str += '<br>'  

	html_str = html_str + "### " + str(col)
	html_str += '<br>' 

	# Get a MongoDB document using PyMongo's find_one() method
	#html_str = html_str + str(col.find_one()) 

	html_str += "</html>"

	return html_str

if __name__ == '__main__':
	app.run(debug=True)
