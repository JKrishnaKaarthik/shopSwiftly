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

--to check the tables created
show tables;

--to check the structure of the table
desc users;
desc category;
desc products;
desc cart;

INSERT INTO category (category_id, category_name)
VALUES
    (1, 'electronics'),
    (2, 'consumerGoods');


INSERT INTO
    products
VALUES
    (
        1,
        " Display: 6.67 ' FHD + pOLED (1080x2400) Ultra - narrow bezels Display with 120Hz Refresh rate;

1000nits peak brightness;

Corning Gorilla Glass 5 Display Protection \ n \ Processor :Mediatek Dimensity 6080 6nm Octa - core 5G processor for high performance;

Up to 2.4GHz;

Upto 12GB RAM including 6GB Virtual RAM \ n \ Camera: 108MP 3X in - sensor zoom AI Triple Camera with 8MP Ultra Wide sensor
and 2MP Macro camera | 16MP Front camera \ n \ Battery: 5000 mAh large battery with 33W fast charger in - box
and Type - C connectivity \ n \ Memory,
Storage & SIM: 6GB RAM | 128GB UFS 2.2 | Dual SIM (nano + nano) 5G ",
        " image1.jpg ",
        " Redmi ",
        " Note 13 5G (Arctic White, 6GB RAM, 128GB Storage) | MTK Dimensity 6080 5G | 7.6mm,
Slimmest Note Ever ",
        3.1,
        477,
        " 17,
999 ",
        1
    ),
    (
        2,
        " Meet Galaxy S24 Ultra,
the ultimate form of Galaxy Ultra with a new titanium exterior
and a 17.25cm (
    6.8 ') flat display. It' s an absolute marvel of design.\ n \ The legacy of Galaxy Note is alive
    and well.Write,
    tap
    and navigate with precision your fingers wish they had on the new,
    flat display.\ n \ With the most megapixels on a smartphone
    and AI processing,
    Galaxy S24 Ultra sets the industry standard for image quality every time you hit the shutter.What ' s more,
    the new ProVisual engine recognizes objects — improving colour tone,
    reducing noise
    and bringing out detail.\ n \ A new way to search is here with Circle to Search.While scrolling your fav social network,
    use your S Pen
    or finger to circle something
    and get Google Search results.\ n \ Victory can be yours with the new Snapdragon 8 Gen 3 for Galaxy.Faster processing gives you the power you need for all the gameplay you want.Then,
    manifest graphic effects in real time with ray tracing for hyper - realistic shadows
    and reflections.",
        " image2.jpg ",
        " Samsung ",
        " Galaxy S24 Ultra 5G (Titanium Black, 12GB, 512GB Storage) ",
        0,
        0,
        " 1,
    37,
    900 ",
        1
    ),
    (
        3,
        " FORGED IN TITANIUM — iPhone 15 Pro Max has a strong
    and light aerospace - grade titanium design with a textured matte - glass back.It also features a Ceramic Shield front that's tougher than any smartphone glass.
    And it's splash,
    water,
    and dust resistant.\ n \ ADVANCED DISPLAY — The 6.7 ' Super Retina XDR display with ProMotion ramps up refresh rates to 120Hz
    when you need exceptional graphics performance.Dynamic Island bubbles up alerts
    and Live Notifications.Plus,
    with Always - On display,
    your Lock Screen stays glanceable,
    so you don't have to tap it to stay in the know.\ n \ GAME - CHANGING A17 PRO CHIP — A Pro - class GPU makes mobile games feel so immersive,
    with rich environments
    and realistic characters.A17 Pro is also incredibly efficient
    and helps to deliver amazing all - day battery life.\ n \ POWERFUL PRO CAMERA SYSTEM — Get incredible framing flexibility with 7 pro lenses.Capture super high - resolution photos with more color
    and detail using the 48MP Main camera.
    And take sharper close - ups
    from
        farther away with the 5x Telephoto camera on iPhone 15 Pro Max.\ n \ CUSTOMIZABLE ACTION BUTTON — Action button is a fast track to your favorite feature.Just
    set
        the one you want,
        like Silent mode,
        Camera,
        Voice Memo,
        Shortcut,
        and more.Then press
        and hold to launch the action.",
        " image3.jpg ",
        " Apple ",
        " iPhone 15 Pro Max (256 GB) - White Titanium ",
        4.5,
        139,
        " 1,
        56,
        900 ",
        1
    ),
    (
        4,
        " Fully - automatic front load washing machine with Hygiene Steam / direct - drive technology: Best Wash Quality,
        Energy
        and Water efficient \ n \ Capacity 6.5 kg: Suitable for small families / singles / bachelors & couples \ n \ Energy Star rating: 5 Star best in class efficiency;

Energy consumption - 0.062 KWh / kg / cycle & Water Consumption: 8.25 L / Kg / Cycle (Please refer BEE label for more information) \ n \ Manufacturer Warranty: 2 Years Comprehensive & 10 Years on Motor T & C \ n \ 1000 RPM: higher spin speeds helps in faster drying \ n \ 10 Wash Program: Cotton - designed for normally soiled cotton clothes | Cotton Large - provides optimized washing performance for large amount of laundry | Mix - cleans a variety of different fabrics at the same time | Easy Care - for polyamide,
acrylic
and polyester fabrics | Baby Care - eliminates allergen | Sportswear - \ suitable for sportswear such as jogging clothes | Delicate - suitable for undergarments
and delicate fabrics | Wool - suitable for lacy knickers
or that silk blouse | Quick 30 - Get express wash for lightly soiled clothes,
all in 30 mins * | Rinse + Spin - ideal for cloth diapers
or heavily soiled items \ n \ Stainless steel drum: Built to bring convenience
and durability,
this stainless steel drum makes your washing machine last longer.Not just this,
its stainless steel lifter keep the insides of the washing machine hygienic ",
        " image4.jpg ",
        " LG ",
        " 6.5 Kg 5 Star Inverter Direct Drive Fully Automatic Front Load Washing Machine Appliance (
    FHM1065SDW,
    Steam Wash,
    In - Built Heater,
    Touch Panel,
    White
) ",
        4.4,
        794,
        " 24,
990 ",
        1
    );


--do not use these below insert statement 
INSERT INTO
    cart (product_id, username)
VALUES
    (1, 'JKrishnaKaarthik'),
    (3, 'JKrishnaKaarthik'),
    (4, " krishna1 "),
    (3, " krishna1 ");