# CREATE DATABASE likeness;
# USE likeness;

# CREATE TABLE templates (
#       id INT AUTO_INCREMENT PRIMARY KEY,
#       chart_url VARCHAR(255) NOT NULL,
#       chart_title VARCHAR(255) NOT NULL,
#       description VARCHAR(255) NOT NULL,
#       created_at TIMESTAMP DEFAULT NOW()
# );

# INSERT INTO templates (chart_url, chart_title, description) VALUES ('https://i.imgur.com/B9A8Spo.png', 'Stacked Column Graph', 'This is for descript of Stacked Column Graph');
# INSERT INTO templates (chart_url, chart_title, description) VALUES ('https://i.imgur.com/vZVSWgv.png', 'Bar Graph', 'This is for descript of Bar Graph');
# INSERT INTO templates (chart_url, chart_title, description) VALUES ('https://i.imgur.com/Gbu8ye1.png', 'Side Bar Graph', 'This is for descript of Side Bar Graph');
# INSERT INTO templates (chart_url, chart_title, description) VALUES ('https://i.imgur.com/s72bF6o.png', 'Smooth Line Graph', 'This is for descript of Smooth Line Graph');

CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        profession VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE comments(
        id INT AUTO_INCREMENT PRIMARY KEY,
        comment_text VARCHAR(255) NOT NULL,
        user_id INT NOT NULL,
        template_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (template_id) REFERENCES templates(id)
);

CREATE TABLE likes (
        user_id INT NOT NULL,
        template_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (template_id) REFERENCES templates(id),
        PRIMARY KEY(user_id, template_id)
);
