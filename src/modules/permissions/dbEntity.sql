-- Create permissions table
CREATE TABLE permissions (
    id VARCHAR(255) PRIMARY KEY,
    action VARCHAR(50) NOT NULL,
    resource VARCHAR(50) NOT NULL,
    description TEXT
);