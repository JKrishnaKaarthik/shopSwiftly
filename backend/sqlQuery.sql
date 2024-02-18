create database if not exists shopswiftly;

use shopswiftly;

--The below table is to create a user. So we need to create a user from signup page
create table users(
    username varchar(50) primary key,
    password varchar(50) not null,
    firstname varchar(50),
    lastname varchar(50),
    email varchar(50),
    DOB date,
);

--INSERT the category needed for the products
create table category(
    category_id int not null primary key,
    category_name varchar(50) not null
);

--the products table insertion are given below and remaining will be made from node js once we have prepared the data
create table products(
    product_id int auto_increment primary key,
    description text,
    image varchar(200),
    brand varchar(200),
    title text,
    rating decimal(4, 2),
    ratingCount int,
    price varchar(25),
    category_id int,
    foreign key (category_id) references category(category_id) on delete cascade
);

--dont need to write any insert statements can be done from the frontend just go to any product and click on the add to cart button
create table cart(
    cart_id int primary key auto_increment,
    product_id int,
    username varchar(50),
    addTime timestamp default CURRENT_TIMESTAMP,
    foreign key (product_id) references products (product_id) on delete cascade,
    foreign key (username) references users (username) on delete cascade
);

create table orders(
    username varchar(50),
    product_id int,
    orderTime timestamp default CURRENT_TIMESTAMP,
    foreign key (product_id) references products (product_id) on delete cascade,
    foreign key (username) references users (username) on delete cascade
);

--to check the tables created
show tables;

--to check the structure of the table
desc users;

desc category;

desc products;

desc cart;

INSERT INTO
    category (category_id, category_name)
VALUES
    (1, 'electronics'),
    (2, 'clothes');

-- Create the trigger
DELIMITER //
CREATE TRIGGER delete_cart_item
AFTER UPDATE ON cart
FOR EACH ROW
BEGIN
    IF NEW.itemcount = 0 THEN
        DELETE FROM cart WHERE cart_id = NEW.cart_id;
    END IF;
END //
DELIMITER ;


