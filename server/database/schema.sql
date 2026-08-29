USE railway;

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    technologies VARCHAR(500) DEFAULT '',
    image VARCHAR(500) DEFAULT '',
    link VARCHAR(500) DEFAULT '#',
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (title, description, technologies, link, featured)
SELECT 'Crop Price Forecasting System',
       'A data-driven platform that helps farmers understand market trends and forecast crop prices using historical and contextual data.',
       'Python, Machine Learning, React, MySQL',
       '#',
       TRUE
WHERE NOT EXISTS (
    SELECT 1 FROM projects WHERE title = 'Crop Price Forecasting System'
);

INSERT INTO projects (title, description, technologies, link, featured)
SELECT 'Full-Stack Booking System',
       'A responsive booking application with CRUD operations, REST APIs and persistent relational database storage.',
       'React, Node.js, Express, MySQL',
       '#',
       FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM projects WHERE title = 'Full-Stack Booking System'
);

INSERT INTO projects (title, description, technologies, link, featured)
SELECT 'Data Analysis Dashboard',
       'An interactive dashboard for exploring datasets, generating insights and presenting important metrics clearly.',
       'Python, Pandas, JavaScript, MySQL',
       '#',
       FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM projects WHERE title = 'Data Analysis Dashboard'
);
