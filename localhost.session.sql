DROP TABLE users;

SELECT * FROM users;

-- UPDATE users SET isactive = TRUE WHERE id = 4;
-- SELECT * FROM users WHERE email = 'john@gmail.com';  

-- DELETE from users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL, 
  email VARCHAR(50) NOT NULL, 
  password VARCHAR(250) ,
  mobile VARCHAR(50), 
  otp VARCHAR(250), 
  otpSendOn TIMESTAMP, 
  avatar VARCHAR(250), 
  role VARCHAR(250) DEFAULT 'user', 
  isActive BOOLEAN DEFAULT TRUE
)

INSERT INTO users (name, email,role) VALUES ('akash','akashdhone01@gmail.com','admin')


DELETE FROM users WHERE id = $1;

UPDATE users SET isActive = true WHERE id = $1;

SELECT * FROM users;

