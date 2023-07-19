DROP DATABASE IF EXISTS chat_db;

CREATE DATABASE IF NOT EXISTS chat_db;

USE chat_db;

CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255),
    password VARCHAR(255 ) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS conversation(
    id INT NOT NULL AUTO_INCREMENT,
    message TEXT(32767),
    user_id INT,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (username, password)
VALUES ('GUI', 'a1b2c3d4');

INSERT INTO conversation (user_id, message)
VALUES (1, 'FALA SHARK');