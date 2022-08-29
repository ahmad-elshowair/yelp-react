
-- create a restaurants table BIGINT
CREATE TABLE restaurants(
  restaurant_id BIGSERIAL NOT NULL,
  restaurant_name VARCHAR(50),
  restaurant_location VARCHAR(50),
  price_range INT,
  CONSTRAINT restaurants_pkey 
    PRIMARY key (restauarnt_id),
  CONSTRAINT restaurants_price_range_check
    CHECK(price_range >= 1 AND price_range <= 5)
);

-- drop the restaurants table
DROP TABLE restaurnats;


-- create reviews table 
CREATE TABLE reviews(
	review_id BIGSERIAL NOT NULL,
  user_name VARCHAR(50) NOT NULL,
	restaurant_id BIGINT NOT NULL,
	rating INT,
	review TEXT,
	CONSTRAINT review_pkey 
		PRIMARY KEY(review_id),
	CONSTRAINT review_restaurant_fkey 
		FOREIGN KEY(restaurant_id) 
			REFERENCES restaurants(id) 
			ON DELETE CASCADE,
	CONSTRAINT review_rating_check
		CHECK(rating >= 1 AND rating <= 5)
);

-- drop the reviews table
DROP TABLE reviews;