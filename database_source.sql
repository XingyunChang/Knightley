# CREATE DATABASE likeness;
# USE likeness;

# CREATE TABLE templates (
# 	id INT AUTO_INCREMENT PRIMARY KEY,
# 	chart_url VARCHAR(255) NOT NULL,
# 	description VARCHAR(255) NOT NULL,
# 	created_at TIMESTAMP DEFAULT NOW()
# );

# INSERT INTO templates (chart_url, description) VALUES ('Chart 1 URL', 'This is Chart 1');
# INSERT INTO templates (chart_url, description) VALUES ('Chart 2 URL', 'This is Chart 2');
# INSERT INTO templates (chart_url, description) VALUES ('Chart 3 URL', 'This is Chart 3');

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	profession VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	templates1 INT,
	templates2 INT,
	templates3 INT
);


# CREATE TABLE comments(
# 	id INT AUTO_INCREMENT PRIMARY KEY,
# 	comment_text VARCHAR(255) NOT NULL,
# 	user_id INT NOT NULL,
# 	template_id INT NOT NULL,
# 	created_at TIMESTAMP DEFAULT NOW(),
# 	FOREIGN KEY (user_id) REFERENCES users(id),
# 	FOREIGN KEY (template_id) REFERENCES templates(id)
# );

# CREATE TABLE likes (
# 	user_id INT NOT NULL,
# 	template_id INT NOT NULL,
# 	created_at TIMESTAMP DEFAULT NOW(),
# 	FOREIGN KEY (user_id) REFERENCES users(id),
# 	FOREIGN KEY (template_id) REFERENCES templates(id),
# 	PRIMARY KEY(user_id, template_id)
# );