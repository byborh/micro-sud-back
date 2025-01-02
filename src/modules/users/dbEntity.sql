-- Create users table
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    firstname VARCHAR(255) DEFAULT NULL,
    lastname VARCHAR(255) DEFAULT NULL,
    pseudo VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telnumber VARCHAR(20) DEFAULT NULL,
    salt VARCHAR(255) NOT NULL
);

-- Create salt table for password encryption
CREATE TABLE salt (
    id VARCHAR(255) PRIMARY KEY,
    userid VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL
);

-- Add foreign key constraint
ALTER TABLE salt
ADD CONSTRAINT fk_userid
FOREIGN KEY (userid) REFERENCES users(id)
ON DELETE CASCADE;