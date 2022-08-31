
-- create a restaurants table

CREATE TABLE Restaurants(
    id SERIAL NOT NULL PRIMARY KEY,
    restaurant_name VARCHAR(50) NOT NULL,
    restaurant_location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK(
        price_range >= 1
        AND price_range <= 5
    )
);

-- drop the restaurants table
DROP TABLE Restaurants;


-- create reviews table 
CREATE TABLE Reviews(
    review_id SERIAL NOT NULL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
rating INT CHECK (rating >= 1 AND rating <= 5), 
	review TEXT,
restaurant_id INT NOT NULL REFERENCES Restaurants (id) ON DELETE CASCADE
);

-- drop the reviews table
DROP TABLE Reviews;

-- dispaly all restuarants

SELECT * FROM restaurants;

-- dispaly all reviews

SELECT * FROM reviews;

INSERT INTO
    restaurants(
        restaurant_name,
        restaurant_location,
        price_range
    )
VALUES
    ('KFC', 'Tay Ho', 1),
    (
        'KFC',
        'Hoan Kiem',
        2
    ),
    (
        'KFC',
        'Nam Tu Liem',
        3
    ),
    (
        'KFC',
        'Cua Giay',
        5
    );