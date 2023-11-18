CREATE DATABASE IF NOT EXISTS buzzcars;

CREATE TABLE buzzcars.manufacturer(
manufacturername varchar(20) NOT NULL,
PRIMARY KEY (manufacturername)
) ;

CREATE TABLE buzzcars.users(
userid varchar(20) NOT NULL,
PRIMARY KEY (userid)
) ;

CREATE TABLE buzzcars.customer(
customerid int NOT NULL,
PRIMARY KEY (customerid)
) ;

CREATE TABLE buzzcars.person (
driverlicensenumber  int NOT NULL,
customerid int NOT NULL,
email varchar(25) NULL,
phonenumber int NOT NULL,
firstname varchar(20) NOT NULL,
lastname varchar(20) NOT NULL,
street varchar(25) NOT NULL,
city varchar(20) NOT NULL,
state varchar(20) NOT NULL,
postalcode int NOT NULL,
PRIMARY KEY (driverlicensenumber),
FOREIGN KEY (customerid) REFERENCES customer(customerid)
) ;

CREATE TABLE buzzcars.bussiness (
taxidentificationnumber  int NOT NULL,
customerid int NOT NULL,
email varchar (25) NOT NULL,
bussinessname varchar(25) NOT NULL,
phonenumber int NOT NULL,
primarycontactfirstname varchar(20) NOT NULL,
primarycontactlastname varchar(20) NOT NULL,
street varchar(25) NOT NULL,
city varchar(20) NOT NULL,
state varchar(20) NOT NULL,
postalcode int NOT NULL,
PRIMARY KEY (taxidentificationnumber),
FOREIGN KEY (customerid) REFERENCES customer(customerid)
) ;


CREATE TABLE buzzcars.inventory_clerk (
email varchar(25)  NOT NULL,
userid varchar(20)  NOT NULL,
password varchar(20) NOT NULL,
PRIMARY KEY (email),
FOREIGN KEY (userid) REFERENCES users(userid)
) ;

CREATE TABLE buzzcars.salesperson (
email varchar(25)  NOT NULL,
userid varchar(20)  NOT NULL,
password varchar(20) NOT NULL,
PRIMARY KEY (email),
FOREIGN KEY (userid) REFERENCES users(userid)
) ;

CREATE TABLE buzzcars.manager(
email varchar(25)  NOT NULL,
userid varchar(20)  NOT NULL,
password varchar(20) NOT NULL,
PRIMARY KEY (email),
FOREIGN KEY (userid) REFERENCES users(userid)
) ;

CREATE TABLE buzzcars.owners (
email varchar(25)  NOT NULL,
userid varchar(20)  NOT NULL,
Password varchar(20) NOT NULL,
PRIMARY KEY (email),
FOREIGN KEY (userid) REFERENCES users(userid)
) ;


CREATE TABLE buzzcars.vehicle(
vin varchar(20) NOT NULL,
inventoryclerk_email varchar(25) NOT NULL,
salesperson_email varchar(25)  NULL,
manufacturername varchar(20) NOT NULL,
customeridsoldto int NULL,
customeridboughtfrom int NULL,
modelname varchar(20) NULL,
mileage int NOT NULL,
modelyear int NOT NULL,
vehicletype varchar(20) NOT NULL,
fueltype varchar(20) NOT NULL,
description varchar(50) NULL,
purchasedate Date NOT NULL,
purchaseprice float(8) NOT NULL,
vehicle_condition varchar(10) NOT NULL,
sellingdate Date NULL,
FOREIGN KEY (inventoryclerk_email) REFERENCES inventory_clerk(email),
FOREIGN KEY (salesperson_email) REFERENCES salesperson(email),
FOREIGN KEY (manufacturername) REFERENCES manufacturer(manufacturername),
FOREIGN KEY (customeridsoldto) REFERENCES customer(customerid),
FOREIGN KEY (customeridboughtfrom) REFERENCES customer (customerid),
PRIMARY KEY (vin)
) ;


CREATE TABLE buzzcars.color (
vin varchar(20)  NOT NULL,
color varchar(20) NOT NULL,
PRIMARY KEY (vin, color),
FOREIGN KEY (vin) REFERENCES vehicle(vin)
) ;


CREATE TABLE buzzcars.vendor (
vendorname varchar(20) NOT NULL,
street varchar(25) NOT NULL,
city varchar(20) NOT NULL,
state varchar(20) NOT NULL,
postalcode int NOT NULL,
phonenumber int NOT NULL, 
PRIMARY KEY (vendorname)
) ;

CREATE TABLE buzzcars.part_order (
vin varchar(20) NOT NULL,
partordernumber int NOT NULL,
vendorname varchar(20) NOT NULL,
PRIMARY KEY (vin, partordernumber),
FOREIGN KEY (vendorname) REFERENCES vendor(vendorname)
) ;


CREATE TABLE buzzcars.part (
vin varchar(20) NOT NULL,
partordernumber int NOT NULL,
partnumber varchar(20) NOT NULL,
status varchar(10) NOT NULL,
quantity int NOT NULL,
cost float (8) NOT NULL, -- in USD cents
description varchar(25) NOT NULL,
PRIMARY KEY (partordernumber, partnumber),
FOREIGN KEY (vin, partordernumber) REFERENCES part_order(vin, partordernumber)
) ;