BEGIN;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS house CASCADE;

CREATE TABLE house (
  id SERIAL PRIMARY KEY,
  house_name VARCHAR(100) NOT NULL,
  attributes VARCHAR NOT NULL,
  total_house_points INTEGER DEFAULT 0
);
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  house_name VARCHAR,
  points INTEGER DEFAULT 0
);

INSERT INTO house (house_name, attributes) VALUES
('Gryffindor', 'Brave and bold'),
('Hufflepuff', 'Kind and gentle'),
('Ravenclaw', 'Honest and practical'),
('Slytherin', 'Clever and competitive');

INSERT INTO users (name, house_name, points) VALUES
('Jamie', 'Slytherin', -10),
('Alex', 'Hufflepuff', 500),
('Rosa', 'Hufflepuff', 500),
('Beth', 'Hufflepuff', 500);

COMMIT;
