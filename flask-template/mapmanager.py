import os

from flask import Flask
from flask import render_template
from flask import request

from flask_sqlalchemy import SQLAlchemy

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "mapdatabase.db"))

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_file

db = SQLAlchemy(app)

ratings 			= db.Table('ratings',
	db.Column('business_id', db.Integer, db.ForeignKey('business.id'), primary_key=True),
	db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)

class User(db.Model):
	__tablename__	= 'user'
	id 				= db.Column(db.Integer, primary_key=True)
	email 			= db.Column(db.String(254))
	name 			= db.Column(db.String(255))
	username 		= db.Column(db.String(255))
	password 		= db.Column(db.String(255))

	group_id		= db.Column(db.Integer, db.ForeignKey('group.id'), nullable=False)
	group 			= db.relationship("Group", backref=db.backref('users', lazy=True))

	business_id		= db.Column(db.Integer, db.ForeignKey('business.id'), nullable=True)	
	business 		= db.relationship("Business", backref=db.backref('users', lazy=True))

	def __repr__(self):
		return '<User %r>' % self.username

class Group(db.Model):
	__tablename__	= 'group'
	id 				= db.Column(db.Integer, primary_key=True)
	name 			= db.Column(db.String(50), nullable=False)

	def __repr__(self):
		return '<Group %r>' % self.name
	
class Business(db.Model):
	__tablename__	= 'business'
	id 			 	= db.Column(db.Integer, primary_key=True)
	business_name 	= db.Column(db.String(255))
	short_url		= db.Column(db.String(255))
	description		= db.Column(db.String(255))
	logo_url		= db.Column(db.String(255))
	website			= db.Column(db.String(255))
	latitude		= db.Column(db.String())
	longitude		= db.Column(db.String())
	avg_spend		= db.Column(db.Float())

	category_id 	= db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
	category 		= db.relationship("Category", backref=db.backref('businesses', lazy=True))

	def __repr__(self):
		return '<Business %r>' % self.business_name

class Category(db.Model):
	__tablename__	= 'category'
	id 				= db.Column(db.Integer, primary_key=True)
	name 			= db.Column(db.String(255))

	def __repr__(self):
		return '<Category %r>' % self.name



@app.route("/", methods=["GET", "POST"])
def home():
    if request.form:
        print(request.form)
    return render_template("home.html")

if __name__ == "__main__":
	app.run(debug=True)
