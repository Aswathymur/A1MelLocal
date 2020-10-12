# mellocal


## Environment
This application assumes a functional MongoDB database installation.  
The address of this instance can be configured using the .env file.  
See the Installation section below for more information.  
  
  
## Installation
Clone repository.  
``git clone https://github.com/Aswathymur/A1MelLocal.git MelLocal``  
  
Change to node folder.  
``cd MelLocal/node-react``  

Configure environment file.  
``cp .env.sample .env``  
``nano .env``  
  
Install backend dependencies.  
``npm install``  
  
Change to react folder.  
``cd client``  
  
Install frontend dependencies.  
``npm install``  
  
Fix any security issues.  
``npm audit fix``  
  
Build react frontend.  
``npm run-script build``  
  
Change to parent folder.  
``cd ../``  
  
Start server.  
``npm run start``  
  
  
