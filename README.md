
<p style="text-align: center;"><img src="./github-repository-img/yeolmu.png"></img></p>

Yeolmu Market API
======

This is the backend API for the <a href="https://github.com/Resdayn/Yeolmu-market">Yeolmu Market</a> project, which intends to be a clone of Dangeun Market (당근마켓, https://www.daangn.com/). It is basically a second hand online market where user can upload items to sell or give and they can be contacted by other users willing to buy.

## Technologies Used:

* Node Express.js
* JSON Web Token (JWT)
* JOI Form Validation
* Bcrypt for password encryption
* Firebase for image hosting
* Local Containerized MongoDB
* Mongoose for the Users/Items schemas and for interacting with MongoDB
* Docker & Docker-compose

## Current functionalities:

In the current status, the API is able to do the following things:

* Upon server initialization, it automatically connects to a local MongoDB container and adds dummy data for items.
* The ```/api/user``` route deals with the registration, login and autologin (with token validation) of users
* The ```/api/item``` route includes sub routes for uploading items, returning the all the items as soon as the page loads, and for returning items matching a certain user id (currently used for displaying items in the "My Items" section).

## Installation and Running:

Since the ```docker-compose.yaml``` file contains both the application and mongodb it can be run by executing: 
```code
docker-compose up
```

### Ports:

The API is accessible at ```http://localhost:3000``` and
the database is internally accessed by the application at ```mongodb://mongodb:27017/yeolmudb```