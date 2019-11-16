#   node-product-variation-sku


> Express WebApplication for filtering procuts and its variation

> for example coffee pods with properties like type,flavor, size, etc...

- Product Variation Sql Architecture for product variants
- Filter API  for getting product by its variation
- routes are dine  via [express-routes-mapper](https://github.com/aichbauer/express-routes-mapper)
- linting via [eslint](https://github.com/eslint/eslint)
- integration tests running with [Jest](https://github.com/facebook/jest)

## Table of Contents

- [Install & Use](#install-and-use)
- [Folder Structure](#folder-structure)
- [DataBase Structure](#database-structure)
## Install and Use

Start by cloning this repository

```sh
# HTTPS
$ git clone https://github.com/abdolrhman/node-product-variation-sku
```

then 

```sh
# cd into project root
$ npm i
# to use mysql
$ npm i mysql2 -S
# start the api
$ npm start
```


## Folder Structure

the project has 4 main directories:

- api - for controllers, models, services, etc.
- config - for routes, database, etc.
- db - this is only a dir for the sqlite db, the default for NODE_ENV development
- test - using [Jest](https://github.com/facebook/jest)


## Test

All test  uses [Jest](https://github.com/facebook/jest) and [supertest](https://github.com/visionmedia/superagent) for integration testing.


## Database Structure

![](https://i.stack.imgur.com/YSOSk.png)

```
CREATE TABLE products 
    (
     product_id int auto_increment primary key, 
     name varchar(20), 
     description varchar(30)

    );

INSERT INTO products
(name)
VALUES
('coffe' ),
('pod');

create table variants (variant_id int auto_increment primary key,
                       variant varchar(50)
                       );
insert into variants (variant)
values ('color'),('material'),('size') ;   
create table variant_value(value_id int auto_increment primary key, 
                           variant_id int ,
                           value varchar(50)
                           );

insert into variant_value (variant_id,value)
values (1 ,'red'),(1 ,'blue'),(1 ,'green'),
        (2 ,'wool'),(2 ,'polyester'),
        (3 ,'small'),(3 ,'medium'),(3 ,'large');



create table product_Variants( product_Variants_id int  auto_increment primary key,
                            product_id int,
                            productVariantName varchar(50),
                            sku varchar(50),
                            price float
                            );




create table product_details(product_detail_id int auto_increment primary key,
                             product_Variants_id int,

                             value_id int
                             );

insert into product_Variants(product_id,productVariantName,sku,price)
values (1,'red-wool' ,'a121',50);

insert into product_details(product_Variants_id , value_id)
values( 1,1),(1,4);

insert into product_Variants(product_id,productVariantName,sku,price)
values (1,'red-polyester' ,'a122',50);

insert into product_details(product_Variants_id , value_id)
values( 2,1),(2,5);
```

### Controller

> Note: those request are asynchronous, we use `async await` syntax.

>Converge Auth


### Models

Are usually automatically tested in the integration tests as the Controller uses the Models.


### npm start

- runs **nodemon watch task** for the all files conected to `.api/api.js`
- sets the **environment variable** `NODE_ENV` to `development`
- opens the db connection for `development`
- starts the server on 127.0.0.1:8000

### npm test

This command:

- runs `npm run lint` ([eslint](http://eslint.org/)) with the [airbnb styleguide](https://github.com/airbnb/javascript) without arrow-parens rule for **better readability**
- sets the **environment variable** `NODE_ENV` to `testing`
- creates the `database.sqlite` for the test
- runs `jest --coverage` for testing with [Jest](https://github.com/facebook/jest) and the coverage
- drops the `database.sqlite` after the test


## Implementation 
made for swenson-he. Task assessment
