-- Create permissions table
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    action VARCHAR(50) NOT NULL,
    resource VARCHAR(50) NOT NULL,
    description TEXT
);