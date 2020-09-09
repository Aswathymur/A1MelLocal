from mapmanager import db
from mapmanager import User, Group, Category, Business

db.create_all()

# User Account Types
user 		= Group(name='user')
business	= Group(name='business')

db.session.add(user)
db.session.add(business)

# Business Categories
cafe 			= Category(name='Cafe')
fun				= Category(name='Fun')
gallery			= Category(name='Gallery')
museum			= Category(name='Museum')
restaurant		= Category(name='Restaurant')
shopping		= Category(name='Shopping')
culture			= Category(name='Culture')
public_trans	= Category(name='Public Transport')
public_toilet	= Category(name='Public Toilet')
atm				= Category(name='ATM')
pharmacy		= Category(name='Pharmacy')
supermarket		= Category(name='Supermarket')

db.session.add(cafe)
db.session.add(fun)
db.session.add(gallery)
db.session.add(museum)
db.session.add(restaurant)
db.session.add(shopping)
db.session.add(culture)
db.session.add(public_trans)
db.session.add(public_toilet)
db.session.add(atm)
db.session.add(pharmacy)
db.session.add(supermarket)

# Add Businesses - Category - Cafe
carlton_cafe 	= Business(business_name='Carlton Cafe', short_url='carlton_cafe', description='tasty Italian and French treats and freshly ground coffee.', logo_url='/images/carlton_cafe.jpg', website='www.carltoncafe.com.au', latitude='38.5649', longitude='-77.0389', avg_spend='50.00', category=cafe)  
brunswick_cafe 	= Business(business_name='Brunswick Cafe', short_url='brunswick_cafe', description='tasty Vegan treats and freshly ground coffee.', logo_url='/images/brunswick_cafe.jpg', website='www.brunswickcafe.com.au', latitude='38.5649', longitude='-77.0389', avg_spend='50.00', category=cafe)  

db.session.add(carlton_cafe)
db.session.add(brunswick_cafe)

# Add Businesses - Category - Fun
face_painting 	= Business(business_name='Frans Face Painting', short_url='FacePaintingMelb', description='Face paintings for parties and festivals. Available at local stalls.', logo_url='/images/FacePaintingMelb.jpg', website='www.fransfacepaints.com.au', latitude='25.5649', longitude='-67.0389', avg_spend='30.00', category=fun)
horse_riding	= Business(business_name='Yarra Valley Horse Riding', short_url='yarraHorses', description='Enjoy the beautiful Yarra ranges by horseback.', logo_url='/images/yarraHorses.jpg', website='www.rideyarravalley.com.au', latitude='56.5649', longitude='-88.0389', avg_spend='200.00', category=fun)

db.session.add(face_painting)
db.session.add(horse_riding)


# Add Users
eliza 		= User(email='eliza88@gmail.com', name='Eliza Gilbert', username='Jngy', password='hsa(9_+^!j98', group=user)
harry 		= User(email='harry@gmail.com', name='Harry', username='harry', password='hsa(9_+^!j98', group=user)
luke 		= User(email='luke@gmail.com', name='Luke', username='luke', password='hsa(9_+^!j98', group=user)
laura		= User(email='laura@gmail.com', name='Laura', username='Laura_', password='890JKS*&&', group=user)
shanogeeth	= User(email='shanogeeth@gmail.com', name='Shanogeeth', username='Shano', password='8s0)@JSK@))', group=business, business=carlton_cafe)
aswathy		= User(email='aswathy@gmail.com', name='Aswathy', username='Ash~', password='j8((j_&%@!', group=business, business=brunswick_cafe)


db.session.add(eliza)
db.session.add(harry)
db.session.add(luke)
db.session.add(laura)
db.session.add(shanogeeth)
db.session.add(aswathy)

db.session.commit()

print("### Rows Inserted ###")