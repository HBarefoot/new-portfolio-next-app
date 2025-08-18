export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'theory' | 'coding' | 'project' | 'quiz';
  content: string;
  codeExamples?: CodeExample[];
  exercises?: Exercise[];
  quiz?: QuizQuestion[];
  xp: number;
  prerequisites?: string[];
}

export interface CodeExample {
  id: string;
  title: string;
  language: string;
  code: string;
  explanation: string;
  interactive?: boolean;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'coding' | 'multiple-choice' | 'fill-blank' | 'debug';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  solution?: string;
  hints?: string[];
  startingCode?: string;
  expectedOutput?: string;
  testCases?: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  finalProject?: Project;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  technologies: string[];
  features: string[];
  instructions: string[];
  boilerplate?: string;
  solution?: string;
  xp: number;
}

export const courseData: Module[] = [
  {
    id: 0,
    title: "Frontend Fundamentals",
    description: "Master HTML, CSS, JavaScript, and React",
    lessons: [
      {
        id: "0-0",
        title: "Introduction to Web Development",
        duration: "15 min",
        type: "theory",
        xp: 25,
        content: `
# Welcome to Full Stack Development! 🚀

## What is Full Stack Development?

Full stack development refers to the practice of working with both **frontend** (client-side) and **backend** (server-side) technologies to build complete web applications.

### The Full Stack includes:

1. **Frontend** - What users see and interact with
   - HTML (Structure)
   - CSS (Styling)
   - JavaScript (Interactivity)
   - React (Component-based UI)

2. **Backend** - Server logic and data management
   - Node.js (Runtime environment)
   - Express.js (Web framework)
   - APIs (Application Programming Interfaces)

3. **Database** - Data storage and management
   - MongoDB (NoSQL database)
   - PostgreSQL (Relational database)

4. **DevOps & Deployment**
   - Docker (Containerization)
   - AWS (Cloud services)
   - CI/CD (Continuous Integration/Deployment)

## Why Learn Full Stack?

- **Versatility**: Work on any part of an application
- **Career Opportunities**: High demand for full stack developers
- **Complete Understanding**: See the big picture of web development
- **Independence**: Build complete applications from scratch

## Course Structure

This course is divided into 5 modules with hands-on projects:

1. 🎨 **Frontend Fundamentals** - Build beautiful, interactive UIs
2. ⚡ **Backend Development** - Create powerful APIs and server logic
3. 🗄️ **Database Design** - Master data modeling and queries
4. 🚀 **Deployment & DevOps** - Launch applications to production
5. 🏆 **Advanced Topics** - GraphQL, microservices, and architecture

Let's start building! 💪
        `,
        exercises: [
          {
            id: "0-0-1",
            title: "Web Development Knowledge Check",
            description: "Test your understanding of web development concepts",
            type: "multiple-choice",
            difficulty: "easy",
            points: 10
          }
        ]
      },
      {
        id: "0-1",
        title: "HTML5 Fundamentals",
        duration: "25 min",
        type: "coding",
        xp: 50,
        content: `
# HTML5: The Foundation of the Web 🏗️

HTML (HyperText Markup Language) is the standard markup language for creating web pages. HTML5 is the latest version with modern features.

## Basic HTML Structure

Every HTML document has this basic structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
</head>
<body>
    <!-- Your content goes here -->
</body>
</html>
\`\`\`

## Essential HTML Elements

### Text Elements
- \`<h1>\` to \`<h6>\` - Headings
- \`<p>\` - Paragraphs
- \`<span>\` - Inline text
- \`<div>\` - Block container

### Links and Media
- \`<a href="url">\` - Links
- \`<img src="image.jpg" alt="description">\` - Images
- \`<video>\` and \`<audio>\` - Multimedia

### Lists
- \`<ul>\` - Unordered list
- \`<ol>\` - Ordered list
- \`<li>\` - List items

### Forms
- \`<form>\` - Form container
- \`<input>\` - Form inputs
- \`<button>\` - Buttons
- \`<textarea>\` - Multi-line text

## HTML5 Semantic Elements

HTML5 introduced semantic elements for better structure:

\`\`\`html
<header>
    <nav>Navigation</nav>
</header>
<main>
    <article>
        <section>Content section</section>
    </article>
    <aside>Sidebar</aside>
</main>
<footer>Footer content</footer>
\`\`\`

## Accessibility Best Practices

1. Use semantic HTML elements
2. Add \`alt\` attributes to images
3. Use proper heading hierarchy
4. Include \`aria-*\` attributes when needed
5. Ensure keyboard navigation works
        `,
        codeExamples: [
          {
            id: "html-basic",
            title: "Basic HTML Page",
            language: "html",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First HTML Page</title>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Home Section</h2>
            <p>This is the home section of my website.</p>
        </section>
        
        <section id="about">
            <h2>About Me</h2>
            <p>I'm learning web development!</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2025 My Website</p>
    </footer>
</body>
</html>`,
            explanation: "This example shows a complete HTML5 document with semantic elements like header, nav, main, section, and footer.",
            interactive: true
          }
        ],
        exercises: [
          {
            id: "0-1-1",
            title: "Create Your First HTML Page",
            description: "Build a personal webpage with header, navigation, main content, and footer",
            type: "coding",
            difficulty: "easy",
            points: 25,
            startingCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><!-- Add your title here --></title>
</head>
<body>
    <!-- Create your webpage structure here -->
</body>
</html>`,
            hints: [
              "Use semantic HTML5 elements like <header>, <main>, and <footer>",
              "Include a navigation menu with at least 3 links",
              "Add a main section with information about yourself",
              "Don't forget to include proper headings (h1, h2, etc.)"
            ]
          }
        ]
      },
      {
        id: "0-2",
        title: "CSS3 Styling and Layout",
        duration: "30 min",
        type: "coding",
        xp: 60,
        content: `
# CSS3: Bringing Style to the Web 🎨

CSS (Cascading Style Sheets) controls the visual presentation of HTML elements. CSS3 adds powerful new features for modern web design.

## CSS Selectors

\`\`\`css
/* Element selector */
h1 {
    color: blue;
}

/* Class selector */
.highlight {
    background-color: yellow;
}

/* ID selector */
#header {
    font-size: 24px;
}

/* Attribute selector */
input[type="text"] {
    border: 1px solid #ccc;
}
\`\`\`

## The Box Model

Every HTML element is a rectangular box with:
- **Content**: The actual content
- **Padding**: Space inside the element
- **Border**: The element's border
- **Margin**: Space outside the element

\`\`\`css
.box {
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 2px solid #333;
    margin: 10px;
    box-sizing: border-box; /* Include padding and border in width */
}
\`\`\`

## Flexbox Layout

Flexbox makes it easy to create flexible layouts:

\`\`\`css
.container {
    display: flex;
    justify-content: center; /* Horizontal alignment */
    align-items: center;     /* Vertical alignment */
    gap: 20px;              /* Space between items */
}

.item {
    flex: 1;                /* Grow to fill space */
}
\`\`\`

## CSS Grid

CSS Grid provides powerful 2D layouts:

\`\`\`css
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 20px;
    height: 100vh;
}

.header { grid-area: 1 / 1 / 2 / 4; }
.sidebar { grid-area: 2 / 1 / 3 / 2; }
.main { grid-area: 2 / 2 / 3 / 3; }
.footer { grid-area: 3 / 1 / 4 / 4; }
\`\`\`

## Responsive Design

Make your sites work on all devices:

\`\`\`css
/* Mobile first */
.container {
    width: 100%;
    padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        max-width: 750px;
        margin: 0 auto;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        padding: 20px;
    }
}
\`\`\`
        `,
        codeExamples: [
          {
            id: "css-flexbox",
            title: "Flexbox Navigation",
            language: "css",
            code: `.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #333;
}

.nav-brand {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
}

.nav-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
}

.nav-links a:hover {
    color: #4a90e2;
}`,
            explanation: "This example shows how to create a responsive navigation bar using Flexbox for perfect alignment and spacing.",
            interactive: true
          }
        ],
        exercises: [
          {
            id: "0-2-1",
            title: "Style a Card Component",
            description: "Create a beautiful card component using CSS3 features including shadows, borders, and hover effects",
            type: "coding",
            difficulty: "medium",
            points: 35,
            startingCode: `.card {
    /* Add your styles here */
}

.card-header {
    /* Style the header */
}

.card-content {
    /* Style the content area */
}

.card:hover {
    /* Add hover effects */
}`,
            hints: [
              "Use box-shadow for depth: box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)",
              "Add border-radius for rounded corners",
              "Use transition for smooth hover effects",
              "Consider using flexbox for internal layout"
            ]
          }
        ]
      },
      {
        id: "0-3",
        title: "JavaScript Fundamentals",
        duration: "35 min",
        type: "coding",
        xp: 75,
        content: `
# JavaScript: Bringing Interactivity to the Web ⚡

JavaScript is the programming language that makes web pages interactive. It runs in the browser and can manipulate HTML and CSS.

## Variables and Data Types

\`\`\`javascript
// Variables
let name = "John";           // String
const age = 25;              // Number
let isStudent = true;        // Boolean
let hobbies = ["coding", "reading"]; // Array
let person = {               // Object
    name: "John",
    age: 25
};

// Template literals
let greeting = \`Hello, \${name}! You are \${age} years old.\`;
\`\`\`

## Functions

\`\`\`javascript
// Function declaration
function greet(name) {
    return \`Hello, \${name}!\`;
}

// Arrow function
const multiply = (a, b) => a * b;

// Function with default parameters
const createUser = (name, role = "user") => ({
    name,
    role,
    id: Math.random()
});
\`\`\`

## DOM Manipulation

\`\`\`javascript
// Select elements
const button = document.getElementById('myButton');
const items = document.querySelectorAll('.item');

// Modify content
button.textContent = 'Click me!';
button.innerHTML = '<span>Click me!</span>';

// Add event listeners
button.addEventListener('click', () => {
    alert('Button clicked!');
});

// Create new elements
const newDiv = document.createElement('div');
newDiv.className = 'card';
newDiv.textContent = 'New card';
document.body.appendChild(newDiv);
\`\`\`

## Arrays and Objects

\`\`\`javascript
// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Object destructuring
const user = { name: 'Alice', age: 30, city: 'New York' };
const { name, age } = user;

// Spread operator
const newUser = { ...user, age: 31 };
const allNumbers = [...numbers, 6, 7, 8];
\`\`\`

## Asynchronous JavaScript

\`\`\`javascript
// Promises
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// Async/await
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
\`\`\`
        `,
        exercises: [
          {
            id: "0-3-1",
            title: "Interactive Todo List",
            description: "Build a todo list that allows adding, removing, and marking tasks as complete",
            type: "coding",
            difficulty: "medium",
            points: 50,
            startingCode: `// Complete the todo list functionality
let todos = [];

function addTodo(text) {
    // Add a new todo item
}

function removeTodo(id) {
    // Remove todo by id
}

function toggleTodo(id) {
    // Toggle completed status
}

function renderTodos() {
    // Update the display
}`,
            hints: [
              "Each todo should have an id, text, and completed status",
              "Use Array.push() to add new todos",
              "Use Array.filter() to remove todos",
              "Use Array.map() to update todos",
              "Remember to call renderTodos() after each change"
            ]
          }
        ]
      },
      {
        id: "0-4",
        title: "Introduction to React",
        duration: "40 min",
        type: "coding",
        xp: 80,
        content: `
# React: Building Modern User Interfaces ⚛️

React is a JavaScript library for building user interfaces using a component-based approach. It makes creating interactive UIs simple and efficient.

## Components and JSX

\`\`\`jsx
// Functional component
function Welcome({ name }) {
    return <h1>Hello, {name}!</h1>;
}

// Component with multiple elements
function Card({ title, content }) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}

// Using components
function App() {
    return (
        <div>
            <Welcome name="Alice" />
            <Card title="My Card" content="This is my card content." />
        </div>
    );
}
\`\`\`

## State Management with useState

\`\`\`jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
}
\`\`\`

## Handling Forms

\`\`\`jsx
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Send data to server
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
            />
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
            />
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
            />
            <button type="submit">Send</button>
        </form>
    );
}
\`\`\`

## useEffect Hook

\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(\`/api/users/\${userId}\`)
            .then(response => response.json())
            .then(userData => {
                setUser(userData);
                setLoading(false);
            });
    }, [userId]); // Re-run when userId changes

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
}
\`\`\`

## Conditional Rendering and Lists

\`\`\`jsx
function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Build a project', completed: false }
    ]);

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <div>
            <h2>My Todos</h2>
            {todos.length === 0 ? (
                <p>No todos yet!</p>
            ) : (
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            <span 
                                style={{ 
                                    textDecoration: todo.completed ? 'line-through' : 'none' 
                                }}
                                onClick={() => toggleTodo(todo.id)}
                            >
                                {todo.text}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
\`\`\`
        `,
        exercises: [
          {
            id: "0-4-1",
            title: "Build a Weather App Component",
            description: "Create a React component that fetches and displays weather data",
            type: "coding",
            difficulty: "hard",
            points: 60,
            startingCode: `import { useState, useEffect } from 'react';

function WeatherApp() {
    // Add your state here
    
    // Add useEffect for fetching data
    
    // Add event handlers
    
    return (
        <div className="weather-app">
            {/* Add your JSX here */}
        </div>
    );
}

export default WeatherApp;`,
            hints: [
              "Use useState for weather data, loading, and error states",
              "Use useEffect to fetch weather data on component mount",
              "Handle loading and error states in your JSX",
              "Display temperature, description, and location",
              "Add a search function to get weather for different cities"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1,
    title: "Backend Development",
    description: "Build APIs with Node.js, Express, and TypeScript",
    lessons: [
      {
        id: "1-0",
        title: "Node.js Fundamentals",
        duration: "25 min",
        type: "theory",
        xp: 50,
        content: `
# Node.js: JavaScript on the Server 🚀

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server side.

## What is Node.js?

Node.js enables:
- **Server-side JavaScript**: Run JS outside the browser
- **Non-blocking I/O**: Handle many requests efficiently  
- **NPM Ecosystem**: Access to millions of packages
- **Cross-platform**: Works on Windows, macOS, Linux

## Core Modules

Node.js comes with built-in modules:

\`\`\`javascript
// File system operations
const fs = require('fs');

// Create HTTP servers
const http = require('http');

// Work with file paths
const path = require('path');

// Operating system utilities
const os = require('os');

// URL parsing
const url = require('url');
\`\`\`

## Creating a Basic Server

\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello from Node.js!</h1>');
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
\`\`\`

## File Operations

\`\`\`javascript
const fs = require('fs');

// Read file asynchronously
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});

// Write file
const content = 'Hello from Node.js!';
fs.writeFile('output.txt', content, (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully!');
});
\`\`\`

## NPM (Node Package Manager)

NPM is the package manager for Node.js:

\`\`\`bash
# Initialize a new project
npm init -y

# Install packages
npm install express
npm install --save-dev nodemon

# Install globally
npm install -g npm-check-updates

# Run scripts
npm start
npm run dev
\`\`\`

## CommonJS vs ES Modules

\`\`\`javascript
// CommonJS (traditional)
const express = require('express');
module.exports = myFunction;

// ES Modules (modern)
import express from 'express';
export default myFunction;
export { namedFunction };
\`\`\`
        `,
        exercises: [
          {
            id: "1-0-1",
            title: "File System Explorer",
            description: "Create a Node.js script that lists files in a directory and reads their contents",
            type: "coding",
            difficulty: "medium",
            points: 40,
            startingCode: `const fs = require('fs');
const path = require('path');

// List all files in current directory
function listFiles(dirPath) {
    // Your code here
}

// Read file content
function readFileContent(filePath) {
    // Your code here
}

// Main function
function main() {
    // Your code here
}

main();`,
            hints: [
              "Use fs.readdir() to list directory contents",
              "Use fs.readFile() to read file contents",
              "Handle errors with try/catch or error callbacks",
              "Use path.join() to create file paths"
            ]
          }
        ]
      },
      {
        id: "1-1", 
        title: "Express.js Framework",
        duration: "35 min",
        type: "coding",
        xp: 70,
        content: `
# Express.js: Web Framework for Node.js 🌐

Express.js is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications.

## Setting Up Express

\`\`\`javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Express!' });
});

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Routing

\`\`\`javascript
// GET route
app.get('/users', (req, res) => {
    res.json({ users: [] });
});

// POST route
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    // Create user logic here
    res.status(201).json({ 
        message: 'User created',
        user: { name, email }
    });
});

// Route parameters
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ userId });
});

// Query parameters
app.get('/search', (req, res) => {
    const { q, limit } = req.query;
    res.json({ query: q, limit: limit || 10 });
});
\`\`\`

## Middleware

\`\`\`javascript
// Custom middleware
const logger = (req, res, next) => {
    console.log(\`\${req.method} \${req.url} - \${new Date().toISOString()}\`);
    next(); // Pass control to next middleware
};

app.use(logger);

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
};

app.use(errorHandler);
\`\`\`

## Static Files

\`\`\`javascript
// Serve static files from 'public' directory
app.use(express.static('public'));

// Multiple static directories
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));
\`\`\`

## CORS (Cross-Origin Resource Sharing)

\`\`\`javascript
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Configure CORS
app.use(cors({
    origin: ['http://localhost:3000', 'https://myapp.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
\`\`\`

## Router Module

\`\`\`javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ users: [] });
});

router.post('/', (req, res) => {
    // Create user
});

router.get('/:id', (req, res) => {
    // Get user by ID
});

module.exports = router;

// app.js
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);
\`\`\`
        `,
        exercises: [
          {
            id: "1-1-1",
            title: "Build a RESTful API",
            description: "Create a complete REST API for managing books with CRUD operations",
            type: "coding",
            difficulty: "hard",
            points: 80,
            startingCode: `const express = require('express');
const app = express();

// Sample data
let books = [
    { id: 1, title: '1984', author: 'George Orwell', year: 1949 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 }
];

app.use(express.json());

// GET /api/books - Get all books
app.get('/api/books', (req, res) => {
    // Your code here
});

// GET /api/books/:id - Get book by ID
app.get('/api/books/:id', (req, res) => {
    // Your code here
});

// POST /api/books - Create new book
app.post('/api/books', (req, res) => {
    // Your code here
});

// PUT /api/books/:id - Update book
app.put('/api/books/:id', (req, res) => {
    // Your code here
});

// DELETE /api/books/:id - Delete book
app.delete('/api/books/:id', (req, res) => {
    // Your code here
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`,
            hints: [
              "Use array methods like find(), filter(), push() to manage data",
              "Return appropriate HTTP status codes (200, 201, 404, etc.)",
              "Validate request data before processing",
              "Use parseInt() to convert string IDs to numbers",
              "Handle cases where resources are not found"
            ]
          }
        ]
      },
      {
        id: "1-2",
        title: "Authentication & Security",
        duration: "30 min",
        type: "coding",
        xp: 70,
        content: `
# Authentication & Security in Node.js 🔐

Security is crucial in backend development. Let's learn about authentication, authorization, and security best practices.

## Password Security

Never store plain text passwords! Always hash them:

\`\`\`javascript
const bcrypt = require('bcryptjs');

// Hash password before storing
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Verify password during login
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
\`\`\`

## JWT (JSON Web Tokens)

JWTs are used for stateless authentication:

\`\`\`javascript
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET, 
    { expiresIn: '24h' }
  );
};

// Verify JWT token middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};
\`\`\`

## Complete Auth Routes

\`\`\`javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    
    await user.save();
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected route example
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
\`\`\`

## Security Best Practices

### Environment Variables
\`\`\`bash
# .env file
JWT_SECRET=your-super-secret-jwt-key-here
DB_CONNECTION_STRING=mongodb://localhost:27017/myapp
API_KEY=your-api-key-here
\`\`\`

### CORS (Cross-Origin Resource Sharing)
\`\`\`javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
\`\`\`

### Rate Limiting
\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api/', limiter);
\`\`\`
        `,
        exercises: [
          {
            id: "1-2-1",
            title: "Build Authentication System",
            description: "Create a complete authentication system with registration, login, and protected routes",
            type: "coding",
            difficulty: "medium",
            points: 30,
            startingCode: `const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// In-memory user storage (use database in production)
const users = [];

// TODO: Implement registration endpoint
app.post('/register', async (req, res) => {
  // Your code here
});

// TODO: Implement login endpoint
app.post('/login', async (req, res) => {
  // Your code here
});

// TODO: Implement auth middleware
const authenticateToken = (req, res, next) => {
  // Your code here
};

// TODO: Implement protected route
app.get('/profile', authenticateToken, (req, res) => {
  // Your code here
});

const PORT = 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`,
            hints: [
              "Hash passwords using bcrypt before storing",
              "Generate JWT tokens with user ID as payload",
              "Verify JWT tokens in middleware",
              "Return appropriate error messages and status codes",
              "Don't return passwords in API responses"
            ]
          }
        ]
      },
      {
        id: "1-3",
        title: "Working with Databases",
        duration: "35 min",
        type: "coding",
        xp: 80,
        content: `
# Database Integration with Node.js 🗄️

Learn how to connect and interact with databases in your Node.js applications.

## MongoDB with Mongoose

Mongoose provides a elegant way to work with MongoDB:

\`\`\`javascript
const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};
\`\`\`

## Defining Models

\`\`\`javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profile: {
    firstName: String,
    lastName: String,
    bio: String,
    avatar: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Add indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return \`\${this.profile.firstName} \${this.profile.lastName}\`;
});

// Pre-save middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
\`\`\`

## CRUD Operations

\`\`\`javascript
const User = require('../models/User');

// CREATE
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(\`Error creating user: \${error.message}\`);
  }
};

// READ
const getUsers = async (filters = {}, options = {}) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt' } = options;
    
    const users = await User.find(filters)
      .select('-password')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('profile');
      
    const total = await User.countDocuments(filters);
    
    return {
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    };
  } catch (error) {
    throw new Error(\`Error fetching users: \${error.message}\`);
  }
};

// UPDATE
const updateUser = async (id, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    throw new Error(\`Error updating user: \${error.message}\`);
  }
};

// DELETE
const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error('User not found');
    }
    return { message: 'User deleted successfully' };
  } catch (error) {
    throw new Error(\`Error deleting user: \${error.message}\`);
  }
};
\`\`\`
        `,
        exercises: [
          {
            id: "1-3-1",
            title: "User Management System",
            description: "Build a complete user management system with MongoDB",
            type: "coding",
            difficulty: "hard",
            points: 40,
            startingCode: `const mongoose = require('mongoose');

// TODO: Define User schema
const userSchema = new mongoose.Schema({
  // Add your schema definition here
});

const User = mongoose.model('User', userSchema);

// TODO: Implement CRUD operations
class UserService {
  static async createUser(userData) {
    // Your code here
  }
  
  static async getAllUsers(page = 1, limit = 10) {
    // Your code here
  }
  
  static async getUserById(id) {
    // Your code here
  }
  
  static async updateUser(id, updateData) {
    // Your code here
  }
  
  static async deleteUser(id) {
    // Your code here
  }
}

module.exports = { User, UserService };`,
            hints: [
              "Define proper validation in your schema",
              "Use indexes for better query performance",
              "Implement pagination for large datasets",
              "Add proper error handling for all operations",
              "Don't forget to exclude sensitive data like passwords"
            ]
          }
        ]
      },
      {
        id: "1-4",
        title: "Testing Node.js Applications",
        duration: "25 min",
        type: "coding",
        xp: 60,
        content: `
# Testing in Node.js 🧪

Testing is crucial for building reliable applications. Let's learn about different testing approaches and tools.

## Testing Framework Setup

Using Jest for testing:

\`\`\`json
{
  "devDependencies": {
    "jest": "^29.0.0",
    "supertest": "^6.2.4",
    "@types/jest": "^29.0.0"
  },
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "collectCoverageFrom": [
      "src/**/*.js",
      "!src/**/*.test.js"
    ]
  }
}
\`\`\`

## Unit Testing

Testing individual functions:

\`\`\`javascript
// utils/validators.js
const validateEmail = (email) => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

module.exports = { validateEmail, validatePassword };
\`\`\`

\`\`\`javascript
// __tests__/validators.test.js
const { validateEmail, validatePassword } = require('../utils/validators');

describe('Email Validation', () => {
  test('should validate correct email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
  });
  
  test('should reject invalid email', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
    expect(validateEmail('@domain.com')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
});

describe('Password Validation', () => {
  test('should validate strong password', () => {
    expect(validatePassword('password123')).toBe(true);
    expect(validatePassword('securePass')).toBe(true);
  });
  
  test('should reject weak password', () => {
    expect(validatePassword('123')).toBe(false);
    expect(validatePassword('')).toBe(false);
    expect(validatePassword(null)).toBe(false);
  });
});
\`\`\`

## Integration Testing

Testing API endpoints:

\`\`\`javascript
// __tests__/auth.test.js
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

// Mock database
jest.mock('../models/User');

describe('Authentication Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/register', () => {
    test('should register new user successfully', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue(null); // User doesn't exist
      User.prototype.save.mockResolvedValue({
        _id: 'user123',
        ...userData,
        password: 'hashedpassword'
      });

      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user).not.toHaveProperty('password');
    });

    test('should reject duplicate email', async () => {
      const userData = {
        username: 'testuser',
        email: 'existing@example.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue({ email: userData.email }); // User exists

      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.error).toBe('User already exists');
    });
  });
});
\`\`\`
        `,
        exercises: [
          {
            id: "1-4-1",
            title: "Complete Test Suite",
            description: "Write comprehensive tests for a user authentication system",
            type: "coding",
            difficulty: "medium",
            points: 35,
            startingCode: `// TODO: Write tests for the following functions
const { validateEmail, hashPassword, generateToken } = require('../utils/auth');
const { register, login } = require('../controllers/auth');

describe('Auth Utils', () => {
  // TODO: Test email validation
  
  // TODO: Test password hashing
  
  // TODO: Test token generation
});

describe('Auth Controllers', () => {
  // TODO: Test user registration
  
  // TODO: Test user login
  
  // TODO: Test error handling
});`,
            hints: [
              "Use describe blocks to organize related tests",
              "Mock external dependencies like databases",
              "Test both success and error scenarios",
              "Use meaningful test descriptions",
              "Check for proper HTTP status codes and response structure"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Database Design",
    description: "MongoDB, PostgreSQL, and data modeling",
    lessons: [
      {
        id: "2-0",
        title: "Database Fundamentals",
        duration: "20 min",
        type: "theory",
        xp: 45,
        content: `
# Database Fundamentals 🗄️

Databases are organized collections of data that can be easily accessed, managed, and updated. They're essential for storing and retrieving information in web applications.

## Types of Databases

### Relational Databases (SQL)
- **Structure**: Tables with rows and columns
- **Examples**: PostgreSQL, MySQL, SQLite
- **Best for**: Complex relationships, transactions, strong consistency
- **Language**: SQL (Structured Query Language)

### NoSQL Databases
- **Document**: MongoDB, CouchDB
- **Key-Value**: Redis, DynamoDB
- **Graph**: Neo4j, Amazon Neptune
- **Column-family**: Cassandra, HBase

## Database Design Principles

### ACID Properties (Relational)
- **Atomicity**: All operations succeed or fail together
- **Consistency**: Database remains in valid state
- **Isolation**: Concurrent operations don't interfere
- **Durability**: Committed changes are permanent

### CAP Theorem (Distributed Systems)
Choose 2 of 3:
- **Consistency**: All nodes see same data
- **Availability**: System remains operational
- **Partition tolerance**: System continues despite network failures

## Data Modeling Concepts

### Entity-Relationship (ER) Modeling
\`\`\`
User
├── id (Primary Key)
├── name
├── email (Unique)
└── created_at

Post
├── id (Primary Key)
├── title
├── content
├── user_id (Foreign Key)
└── created_at
\`\`\`

### Normalization
- **1NF**: Eliminate repeating groups
- **2NF**: Remove partial dependencies
- **3NF**: Remove transitive dependencies

### Denormalization
Sometimes it's better to duplicate data for:
- Performance optimization
- Reduced complex joins
- Read-heavy applications

## Choosing the Right Database

### Use Relational When:
- Complex relationships between data
- Need ACID transactions
- Structured data with known schema
- Reporting and analytics

### Use NoSQL When:
- Rapid development and iteration
- Flexible or evolving schema
- Horizontal scaling needs
- Large volumes of unstructured data
        `
      },
      {
        id: "2-1",
        title: "SQL and PostgreSQL",
        duration: "30 min",
        type: "coding",
        xp: 65,
        content: `
# SQL and PostgreSQL 🐘

SQL (Structured Query Language) is the standard language for relational databases. PostgreSQL is a powerful, open-source relational database system.

## Setting Up PostgreSQL

\`\`\`sql
-- Create database
CREATE DATABASE ecommerce_db;

-- Connect to database
\\c ecommerce_db;

-- Create tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    category_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
\`\`\`

## Basic SQL Operations

### INSERT - Adding Data
\`\`\`sql
-- Insert single record
INSERT INTO users (username, email, password_hash, first_name, last_name)
VALUES ('johndoe', 'john@example.com', 'hashed_password', 'John', 'Doe');

-- Insert multiple records
INSERT INTO products (name, description, price, stock_quantity) VALUES
    ('Laptop', 'High-performance laptop', 999.99, 50),
    ('Mouse', 'Wireless optical mouse', 29.99, 200),
    ('Keyboard', 'Mechanical keyboard', 79.99, 100);
\`\`\`

### SELECT - Retrieving Data
\`\`\`sql
-- Basic select
SELECT * FROM users;

-- Select specific columns
SELECT username, email, created_at FROM users;

-- With conditions
SELECT * FROM products WHERE price > 50.00;

-- Ordering results
SELECT * FROM products ORDER BY price DESC;

-- Limiting results
SELECT * FROM products LIMIT 10 OFFSET 5;

-- Aggregations
SELECT category_id, COUNT(*), AVG(price)
FROM products
GROUP BY category_id
HAVING COUNT(*) > 5;
\`\`\`

### UPDATE - Modifying Data
\`\`\`sql
-- Update single record
UPDATE users
SET last_name = 'Smith'
WHERE id = 1;

-- Update multiple records
UPDATE products
SET price = price * 0.9
WHERE category_id = 1;

-- Update with conditions
UPDATE orders
SET status = 'shipped'
WHERE status = 'processing' AND created_at < NOW() - INTERVAL '1 day';
\`\`\`

### DELETE - Removing Data
\`\`\`sql
-- Delete specific record
DELETE FROM users WHERE id = 5;

-- Delete with conditions
DELETE FROM products WHERE stock_quantity = 0;

-- Truncate table (remove all data)
TRUNCATE TABLE temporary_data;
\`\`\`

## Advanced SQL Concepts

### JOINs
\`\`\`sql
-- INNER JOIN
SELECT u.username, o.total_amount, o.created_at
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN
SELECT u.username, COALESCE(o.total_amount, 0) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- Complex JOIN with multiple tables
SELECT 
    u.username,
    p.name as product_name,
    oi.quantity,
    oi.price
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.status = 'completed';
\`\`\`

### Subqueries
\`\`\`sql
-- Subquery in WHERE clause
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Subquery in SELECT clause
SELECT 
    username,
    (SELECT COUNT(*) FROM orders WHERE user_id = u.id) as order_count
FROM users u;

-- EXISTS subquery
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.user_id = u.id AND o.total_amount > 100
);
\`\`\`

### Indexes and Performance
\`\`\`sql
-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Composite index
CREATE INDEX idx_products_category_price ON products(category_id, price);

-- Unique index
CREATE UNIQUE INDEX idx_products_sku ON products(sku);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM orders 
WHERE user_id = 123 AND created_at > '2023-01-01';
\`\`\`

### Transactions
\`\`\`sql
-- Begin transaction
BEGIN;

-- Multiple operations
UPDATE products SET stock_quantity = stock_quantity - 1 WHERE id = 1;
INSERT INTO orders (user_id, total_amount) VALUES (123, 99.99);
INSERT INTO order_items (order_id, product_id, quantity, price) 
VALUES (CURRVAL('orders_id_seq'), 1, 1, 99.99);

-- Commit or rollback
COMMIT;
-- or ROLLBACK;
\`\`\`
        `,
        exercises: [
          {
            id: "2-1-1",
            title: "E-commerce Database Design",
            description: "Design and implement a complete e-commerce database with SQL queries",
            type: "coding",
            difficulty: "medium",
            points: 35,
            startingCode: `-- TODO: Create the following tables with proper relationships:
-- 1. users (id, username, email, password_hash, created_at)
-- 2. categories (id, name, description)
-- 3. products (id, name, description, price, stock_quantity, category_id)
-- 4. orders (id, user_id, total_amount, status, created_at)
-- 5. order_items (id, order_id, product_id, quantity, price)

-- CREATE TABLE statements here

-- TODO: Write queries to:
-- 1. Get all products with their category names
-- 2. Find users who have placed orders over $100
-- 3. Get the top 5 selling products
-- 4. Calculate total sales for each category

-- Query statements here`,
            hints: [
              "Use SERIAL for auto-incrementing primary keys",
              "Add foreign key constraints for relationships",
              "Use JOINs to combine data from multiple tables",
              "Use aggregate functions like COUNT(), SUM(), AVG()",
              "Consider adding indexes for frequently queried columns"
            ]
          }
        ]
      },
      {
        id: "2-2",
        title: "MongoDB and NoSQL",
        duration: "25 min",
        type: "coding",
        xp: 55,
        content: `
# MongoDB and NoSQL 🍃

MongoDB is a popular NoSQL document database that stores data in flexible, JSON-like documents.

## MongoDB Basics

### Connecting to MongoDB
\`\`\`javascript
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('ecommerce');
    return db;
  } catch (error) {
    console.error('Connection failed:', error);
  }
}
\`\`\`

### Document Structure
\`\`\`javascript
// User document
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  username: "johndoe",
  email: "john@example.com",
  profile: {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    address: {
      street: "123 Main St",
      city: "New York",
      zipCode: "10001"
    }
  },
  preferences: ["electronics", "books"],
  createdAt: new Date(),
  lastLogin: new Date()
}

// Product document with embedded reviews
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  name: "Wireless Headphones",
  description: "Premium noise-canceling headphones",
  price: 199.99,
  category: "electronics",
  specifications: {
    brand: "TechCorp",
    color: "black",
    weight: "250g",
    batteryLife: "30 hours"
  },
  reviews: [
    {
      userId: ObjectId("507f1f77bcf86cd799439011"),
      rating: 5,
      comment: "Excellent sound quality!",
      date: new Date()
    },
    {
      userId: ObjectId("507f1f77bcf86cd799439013"),
      rating: 4,
      comment: "Good value for money",
      date: new Date()
    }
  ],
  stock: 45,
  tags: ["wireless", "bluetooth", "noise-canceling"]
}
\`\`\`

## CRUD Operations

### Create (Insert)
\`\`\`javascript
// Insert single document
const insertUser = async (db, userData) => {
  const result = await db.collection('users').insertOne({
    ...userData,
    createdAt: new Date(),
    lastLogin: new Date()
  });
  
  console.log('User inserted with ID:', result.insertedId);
  return result.insertedId;
};

// Insert multiple documents
const insertProducts = async (db, products) => {
  const result = await db.collection('products').insertMany(
    products.map(product => ({
      ...product,
      createdAt: new Date()
    }))
  );
  
  console.log(\`Inserted \${result.insertedCount} products\`);
  return result.insertedIds;
};
\`\`\`

### Read (Find)
\`\`\`javascript
// Find all documents
const getAllUsers = async (db) => {
  return await db.collection('users').find({}).toArray();
};

// Find with conditions
const findProductsByCategory = async (db, category) => {
  return await db.collection('products')
    .find({ category: category })
    .toArray();
};

// Find with complex conditions
const findExpensiveElectronics = async (db) => {
  return await db.collection('products')
    .find({
      category: 'electronics',
      price: { $gte: 100 }
    })
    .sort({ price: -1 })
    .limit(10)
    .toArray();
};

// Find with projection (select specific fields)
const getUsernamesAndEmails = async (db) => {
  return await db.collection('users')
    .find({}, { 
      projection: { 
        username: 1, 
        email: 1, 
        _id: 0 
      }
    })
    .toArray();
};

// Text search
const searchProducts = async (db, searchTerm) => {
  return await db.collection('products')
    .find({ 
      $text: { $search: searchTerm }
    })
    .toArray();
};
\`\`\`

### Update
\`\`\`javascript
// Update single document
const updateUser = async (db, userId, updateData) => {
  const result = await db.collection('users').updateOne(
    { _id: ObjectId(userId) },
    { 
      $set: {
        ...updateData,
        updatedAt: new Date()
      }
    }
  );
  
  return result.modifiedCount > 0;
};

// Update multiple documents
const updateProductPrices = async (db, category, priceMultiplier) => {
  const result = await db.collection('products').updateMany(
    { category: category },
    { 
      $mul: { price: priceMultiplier },
      $set: { updatedAt: new Date() }
    }
  );
  
  console.log(\`Updated \${result.modifiedCount} products\`);
  return result.modifiedCount;
};

// Upsert (update or insert)
const upsertUser = async (db, email, userData) => {
  const result = await db.collection('users').updateOne(
    { email: email },
    { 
      $set: {
        ...userData,
        updatedAt: new Date()
      },
      $setOnInsert: {
        createdAt: new Date()
      }
    },
    { upsert: true }
  );
  
  return result.upsertedId || result.matchedCount > 0;
};
\`\`\`

### Delete
\`\`\`javascript
// Delete single document
const deleteUser = async (db, userId) => {
  const result = await db.collection('users').deleteOne(
    { _id: ObjectId(userId) }
  );
  
  return result.deletedCount > 0;
};

// Delete multiple documents
const deleteOutOfStockProducts = async (db) => {
  const result = await db.collection('products').deleteMany(
    { stock: { $lte: 0 } }
  );
  
  console.log(\`Deleted \${result.deletedCount} out of stock products\`);
  return result.deletedCount;
};
\`\`\`

## Advanced MongoDB Features

### Aggregation Pipeline
\`\`\`javascript
const getTopSellingProducts = async (db) => {
  return await db.collection('orders').aggregate([
    { $unwind: '$items' },
    { 
      $group: {
        _id: '$items.productId',
        totalQuantity: { $sum: '$items.quantity' },
        totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
      }
    },
    { 
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product'
      }
    },
    { $unwind: '$product' },
    { 
      $project: {
        productName: '$product.name',
        totalQuantity: 1,
        totalRevenue: 1
      }
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: 5 }
  ]).toArray();
};
\`\`\`

### Indexes
\`\`\`javascript
// Create indexes for better performance
const createIndexes = async (db) => {
  // Single field index
  await db.collection('users').createIndex({ email: 1 });
  
  // Compound index
  await db.collection('products').createIndex({ 
    category: 1, 
    price: -1 
  });
  
  // Text index for search
  await db.collection('products').createIndex({ 
    name: 'text', 
    description: 'text' 
  });
  
  // Unique index
  await db.collection('users').createIndex(
    { username: 1 }, 
    { unique: true }
  );
};
\`\`\`
        `,
        exercises: [
          {
            id: "2-2-1",
            title: "MongoDB Product Catalog",
            description: "Build a product catalog system using MongoDB with advanced queries and aggregation",
            type: "coding",
            difficulty: "medium",
            points: 30,
            startingCode: `const { MongoClient, ObjectId } = require('mongodb');

class ProductCatalog {
  constructor(db) {
    this.db = db;
    this.products = db.collection('products');
    this.categories = db.collection('categories');
    this.reviews = db.collection('reviews');
  }
  
  // TODO: Implement product creation
  async createProduct(productData) {
    // Your code here
  }
  
  // TODO: Find products by category with pagination
  async findProductsByCategory(category, page = 1, limit = 10) {
    // Your code here
  }
  
  // TODO: Search products by text
  async searchProducts(searchTerm) {
    // Your code here
  }
  
  // TODO: Get products with average rating using aggregation
  async getProductsWithRatings() {
    // Your code here
  }
  
  // TODO: Update product stock
  async updateStock(productId, quantity) {
    // Your code here
  }
  
  // TODO: Delete products with zero stock
  async removeOutOfStockProducts() {
    // Your code here
  }
}

module.exports = ProductCatalog;`,
            hints: [
              "Use ObjectId for MongoDB document IDs",
              "Implement proper error handling for all operations",
              "Use aggregation pipeline for complex queries",
              "Add indexes to improve query performance",
              "Use projection to select only needed fields"
            ]
          }
        ]
      },
      {
        id: "2-3",
        title: "Data Modeling and Relationships",
        duration: "20 min",
        type: "theory",
        xp: 40,
        content: `
# Data Modeling and Relationships 📊

Understanding how to model data and define relationships is crucial for building efficient and scalable databases.

## Relational Database Design

### Entity-Relationship (ER) Modeling

\`\`\`sql
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts Table (One-to-Many with Users)
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tags Table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Post Tags (Many-to-Many relationship)
CREATE TABLE post_tags (
    post_id INTEGER,
    tag_id INTEGER,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Comments Table (Self-referencing for nested comments)
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    parent_id INTEGER, -- Self-reference for nested comments
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);
\`\`\`

### Normalization

#### First Normal Form (1NF)
- Eliminate repeating groups
- Each column contains atomic values

\`\`\`sql
-- BAD: Violates 1NF
CREATE TABLE users_bad (
    id INTEGER,
    name VARCHAR(100),
    phones VARCHAR(200) -- "123-456-7890, 098-765-4321"
);

-- GOOD: Follows 1NF
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE user_phones (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    phone VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
\`\`\`

#### Second Normal Form (2NF)
- Must be in 1NF
- Eliminate partial dependencies

\`\`\`sql
-- BAD: Violates 2NF (product_name depends only on product_id)
CREATE TABLE order_items_bad (
    order_id INTEGER,
    product_id INTEGER,
    product_name VARCHAR(200),
    quantity INTEGER,
    PRIMARY KEY (order_id, product_id)
);

-- GOOD: Follows 2NF
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200)
);

CREATE TABLE order_items (
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
\`\`\`

#### Third Normal Form (3NF)
- Must be in 2NF
- Eliminate transitive dependencies

\`\`\`sql
-- BAD: Violates 3NF (city_name depends on city_id, not user_id)
CREATE TABLE users_bad (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    city_id INTEGER,
    city_name VARCHAR(100) -- Transitive dependency
);

-- GOOD: Follows 3NF
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    city_id INTEGER,
    FOREIGN KEY (city_id) REFERENCES cities(id)
);
\`\`\`

## NoSQL Data Modeling

### Document Design Patterns

#### Embedded Documents (Denormalization)
\`\`\`javascript
// Good for one-to-few relationships
{
  _id: ObjectId("..."),
  username: "johndoe",
  profile: {
    firstName: "John",
    lastName: "Doe",
    bio: "Software developer",
    socialLinks: {
      twitter: "@johndoe",
      linkedin: "linkedin.com/in/johndoe"
    }
  },
  addresses: [
    {
      type: "home",
      street: "123 Main St",
      city: "New York",
      zipCode: "10001"
    },
    {
      type: "work",
      street: "456 Office Ave",
      city: "New York",
      zipCode: "10002"
    }
  ]
}
\`\`\`

#### Referenced Documents (Normalization)
\`\`\`javascript
// User document
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  username: "johndoe",
  email: "john@example.com"
}

// Posts collection (references user)
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  title: "My First Blog Post",
  content: "This is the content...",
  authorId: ObjectId("507f1f77bcf86cd799439011"),
  createdAt: new Date()
}

// Comments collection (references both post and user)
{
  _id: ObjectId("507f1f77bcf86cd799439013"),
  content: "Great post!",
  postId: ObjectId("507f1f77bcf86cd799439012"),
  authorId: ObjectId("507f1f77bcf86cd799439011"),
  createdAt: new Date()
}
\`\`\`

#### Hybrid Approach
\`\`\`javascript
// Product with embedded reviews (limited) and referenced detailed reviews
{
  _id: ObjectId("..."),
  name: "Laptop",
  price: 999.99,
  // Embed recent/important reviews
  featuredReviews: [
    {
      rating: 5,
      comment: "Excellent!",
      authorName: "John D.", // Denormalized for performance
      date: new Date()
    }
  ],
  // Reference to full reviews collection
  totalReviews: 150,
  averageRating: 4.2
}

// Separate reviews collection for detailed queries
{
  _id: ObjectId("..."),
  productId: ObjectId("..."),
  userId: ObjectId("..."),
  rating: 5,
  comment: "Detailed review content...",
  helpful: 25,
  createdAt: new Date()
}
\`\`\`

## Database Design Best Practices

### Performance Considerations

#### SQL Indexing Strategy
\`\`\`sql
-- Index frequently queried columns
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);

-- Composite indexes for multi-column queries
CREATE INDEX idx_posts_user_created ON posts(user_id, created_at DESC);

-- Partial indexes for filtered queries
CREATE INDEX idx_active_users ON users(id) WHERE active = true;

-- Full-text search indexes
CREATE INDEX idx_posts_search ON posts USING gin(to_tsvector('english', title || ' ' || content));
\`\`\`

#### MongoDB Indexing
\`\`\`javascript
// Create indexes in MongoDB
db.products.createIndex({ category: 1, price: -1 });
db.users.createIndex({ email: 1 }, { unique: true });
db.posts.createIndex({ "author.userId": 1, createdAt: -1 });

// Compound index for complex queries
db.orders.createIndex({
  "customer.id": 1,
  status: 1,
  createdAt: -1
});

// Text index for search
db.products.createIndex({
  name: "text",
  description: "text",
  tags: "text"
});
\`\`\`

### Schema Evolution

#### Adding New Fields
\`\`\`sql
-- SQL: Use ALTER TABLE
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
ALTER TABLE users ADD COLUMN is_verified BOOLEAN DEFAULT false;
\`\`\`

\`\`\`javascript
// MongoDB: Fields can be added without schema changes
// Just start inserting documents with new fields
db.users.updateMany(
  { phone: { $exists: false } },
  { $set: { phone: null, isVerified: false } }
);
\`\`\`

#### Data Migration
\`\`\`sql
-- SQL Migration script
BEGIN;

-- Add new column
ALTER TABLE products ADD COLUMN slug VARCHAR(200);

-- Populate slug from name
UPDATE products SET slug = LOWER(REPLACE(name, ' ', '-'));

-- Add unique constraint
ALTER TABLE products ADD CONSTRAINT unique_slug UNIQUE (slug);

COMMIT;
\`\`\`

\`\`\`javascript
// MongoDB migration script
db.products.find().forEach(function(doc) {
  if (!doc.slug) {
    db.products.updateOne(
      { _id: doc._id },
      { $set: { slug: doc.name.toLowerCase().replace(/\\s+/g, '-') } }
    );
  }
});

// Create unique index
db.products.createIndex({ slug: 1 }, { unique: true });
\`\`\`
        `
      },
      {
        id: "2-4",
        title: "Database Performance Optimization",
        duration: "30 min",
        type: "coding",
        xp: 70,
        content: `
# Database Performance Optimization ⚡

Optimizing database performance is crucial for scalable applications. Learn techniques to make your queries faster and more efficient.

## Query Optimization

### SQL Query Optimization

#### Using EXPLAIN to Analyze Queries
\`\`\`sql
-- Analyze query execution plan
EXPLAIN ANALYZE 
SELECT u.username, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.created_at > '2023-01-01'
GROUP BY u.id, u.username
ORDER BY post_count DESC
LIMIT 10;
\`\`\`

#### Optimizing Common Query Patterns
\`\`\`sql
-- BAD: Using functions in WHERE clause
SELECT * FROM orders 
WHERE YEAR(created_at) = 2023;

-- GOOD: Use range conditions
SELECT * FROM orders 
WHERE created_at >= '2023-01-01' 
AND created_at < '2024-01-01';

-- BAD: SELECT *
SELECT * FROM users 
JOIN profiles ON users.id = profiles.user_id;

-- GOOD: Select only needed columns
SELECT u.username, u.email, p.first_name, p.last_name
FROM users u
JOIN profiles p ON u.id = p.user_id;

-- BAD: N+1 query problem
-- This would execute one query per user
SELECT * FROM users;
-- Then for each user: SELECT * FROM posts WHERE user_id = ?

-- GOOD: Use JOIN to get data in one query
SELECT u.*, p.title, p.created_at as post_date
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
ORDER BY u.id, p.created_at;
\`\`\`

#### Advanced SQL Optimizations
\`\`\`sql
-- Use EXISTS instead of IN for large datasets
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.user_id = u.id AND o.total > 1000
);

-- Window functions for analytics
SELECT 
    product_id,
    sale_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY product_id 
        ORDER BY sale_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) as running_total
FROM sales;

-- Common Table Expressions (CTEs) for complex queries
WITH monthly_sales AS (
    SELECT 
        EXTRACT(YEAR FROM created_at) as year,
        EXTRACT(MONTH FROM created_at) as month,
        SUM(total) as total_sales
    FROM orders
    WHERE created_at >= '2023-01-01'
    GROUP BY year, month
),
growth_analysis AS (
    SELECT 
        year, month, total_sales,
        LAG(total_sales) OVER (ORDER BY year, month) as prev_month_sales,
        total_sales - LAG(total_sales) OVER (ORDER BY year, month) as growth
    FROM monthly_sales
)
SELECT * FROM growth_analysis
WHERE growth > 0;
\`\`\`

### MongoDB Query Optimization

#### Using explain() to Analyze Queries
\`\`\`javascript
// Analyze query performance
db.products.find({ 
    category: "electronics", 
    price: { $gte: 100, $lte: 500 } 
}).explain("executionStats");

// Check if indexes are being used
db.users.find({ email: "john@example.com" }).explain();
\`\`\`

#### Optimizing MongoDB Queries
\`\`\`javascript
// BAD: No index, scanning entire collection
db.products.find({ name: /laptop/i });

// GOOD: Use text index for text search
db.products.createIndex({ name: "text", description: "text" });
db.products.find({ $text: { $search: "laptop" } });

// BAD: Loading unnecessary data
db.users.find({}, { password: 0 }); // Still loads password internally

// GOOD: Project only needed fields
db.users.find({}, { username: 1, email: 1, _id: 0 });

// BAD: Inefficient aggregation
db.orders.find({ userId: ObjectId("...") }).forEach(function(order) {
    var total = 0;
    order.items.forEach(function(item) {
        total += item.price * item.quantity;
    });
    // Process total
});

// GOOD: Use aggregation pipeline
db.orders.aggregate([
    { $match: { userId: ObjectId("...") } },
    { $unwind: "$items" },
    {
        $group: {
            _id: "$_id",
            total: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
            itemCount: { $sum: 1 }
        }
    }
]);
\`\`\`

## Indexing Strategies

### SQL Index Types and Usage
\`\`\`sql
-- B-tree indexes (default, good for equality and range queries)
CREATE INDEX idx_products_price ON products(price);

-- Hash indexes (good for equality, not ranges)
CREATE INDEX idx_users_email_hash ON users USING HASH (email);

-- Partial indexes (for filtered queries)
CREATE INDEX idx_active_products ON products(id) 
WHERE status = 'active' AND stock > 0;

-- Expression indexes
CREATE INDEX idx_users_lower_email ON users(LOWER(email));

-- Covering indexes (include all columns needed by query)
CREATE INDEX idx_orders_covering ON orders(user_id, created_at) 
INCLUDE (total, status);
\`\`\`

### MongoDB Index Strategies
\`\`\`javascript
// Compound indexes (order matters!)
// Good for queries on: {category}, {category, price}, {category, price, rating}
db.products.createIndex({ category: 1, price: 1, rating: -1 });

// Sparse indexes (only index documents with the field)
db.users.createIndex({ phone: 1 }, { sparse: true });

// TTL indexes (automatically delete old documents)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });

// Geospatial indexes
db.locations.createIndex({ coordinates: "2dsphere" });

// Hashed indexes (good for sharding)
db.users.createIndex({ userId: "hashed" });
\`\`\`

## Caching Strategies

### Application-Level Caching
\`\`\`javascript
const Redis = require('redis');
const redis = Redis.createClient();

// Cache frequently accessed data
const getUserById = async (userId) => {
    const cacheKey = \`user:\${userId}\`;
    
    // Try cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    
    // Fetch from database
    const user = await User.findById(userId);
    
    // Cache for 5 minutes
    await redis.setex(cacheKey, 300, JSON.stringify(user));
    
    return user;
};

// Cache invalidation
const updateUser = async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    
    // Invalidate cache
    await redis.del(\`user:\${userId}\`);
    
    return user;
};
\`\`\`

### Query Result Caching
\`\`\`javascript
// Cache expensive query results
const getTopProducts = async (category, limit = 10) => {
    const cacheKey = \`top_products:\${category}:\${limit}\`;
    
    const cached = await redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    
    const products = await db.products.aggregate([
        { $match: { category, active: true } },
        { $sort: { rating: -1, sales: -1 } },
        { $limit: limit },
        {
            $project: {
                name: 1,
                price: 1,
                rating: 1,
                imageUrl: 1
            }
        }
    ]).toArray();
    
    // Cache for 1 hour
    await redis.setex(cacheKey, 3600, JSON.stringify(products));
    
    return products;
};
\`\`\`

## Connection Pooling and Optimization

### SQL Connection Pooling
\`\`\`javascript
const { Pool } = require('pg');

const pool = new Pool({
    user: 'username',
    host: 'localhost',
    database: 'myapp',
    password: 'password',
    port: 5432,
    max: 20, // Maximum pool size
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Use pool for queries
const getUserOrders = async (userId) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        return result.rows;
    } finally {
        client.release(); // Important: release connection back to pool
    }
};
\`\`\`

### MongoDB Connection Optimization
\`\`\`javascript
const { MongoClient } = require('mongodb');

const client = new MongoClient(uri, {
    maxPoolSize: 50, // Maximum connections in pool
    minPoolSize: 5,  // Minimum connections to maintain
    maxIdleTimeMS: 30000,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
});

// Connection monitoring
client.on('connectionPoolCreated', (event) => {
    console.log('Connection pool created:', event);
});

client.on('connectionCreated', (event) => {
    console.log('Connection created:', event.connectionId);
});
\`\`\`

## Monitoring and Profiling

### SQL Performance Monitoring
\`\`\`sql
-- PostgreSQL: Enable slow query logging
-- In postgresql.conf:
-- log_min_duration_statement = 1000  # Log queries taking > 1 second

-- Find slow queries
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Monitor database activity
SELECT 
    datname,
    numbackends,
    xact_commit,
    xact_rollback,
    blks_read,
    blks_hit
FROM pg_stat_database;
\`\`\`

### MongoDB Performance Monitoring
\`\`\`javascript
// Enable profiling for slow operations
db.setProfilingLevel(2, { slowms: 1000 });

// View profiler data
db.system.profile.find().limit(5).sort({ ts: -1 }).pretty();

// Database statistics
db.stats();

// Collection statistics
db.products.stats();

// Current operations
db.currentOp();
\`\`\`
        `,
        exercises: [
          {
            id: "2-4-1",
            title: "Performance Optimization Challenge",
            description: "Optimize a slow e-commerce database with proper indexing and query optimization",
            type: "coding",
            difficulty: "hard",
            points: 40,
            startingCode: `// Given: A slow e-commerce system with performance issues
// TODO: Optimize the following scenarios:

// 1. Slow user lookup by email
const findUserByEmail = async (email) => {
  // Current: Full table scan
  return await db.collection('users').findOne({ email: email });
};

// 2. Slow product search
const searchProducts = async (query, category, minPrice, maxPrice) => {
  // Current: No indexes, inefficient query
  return await db.collection('products').find({
    name: { $regex: query, $options: 'i' },
    category: category,
    price: { $gte: minPrice, $lte: maxPrice }
  }).toArray();
};

// 3. Slow order analytics
const getMonthlyOrderStats = async (year, month) => {
  // Current: Processing all orders in application code
  const orders = await db.collection('orders').find({}).toArray();
  // ... expensive JavaScript processing
};

// 4. N+1 query problem
const getUsersWithOrderCounts = async () => {
  const users = await db.collection('users').find({}).toArray();
  for (let user of users) {
    const orderCount = await db.collection('orders').countDocuments({ 
      userId: user._id 
    });
    user.orderCount = orderCount;
  }
  return users;
};

// TODO: Create appropriate indexes
// TODO: Rewrite queries for optimal performance
// TODO: Implement caching where appropriate`,
            hints: [
              "Create indexes for frequently queried fields",
              "Use text indexes for search functionality",
              "Replace N+1 queries with aggregation pipelines",
              "Use compound indexes for multi-field queries",
              "Implement Redis caching for expensive operations"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Deployment & DevOps",
    description: "Docker, AWS, CI/CD, and production deployment",
    lessons: [
      {
        id: "3-0",
        title: "Docker Containerization",
        duration: "30 min",
        type: "coding",
        xp: 65,
        content: `
# Docker: Containerize Your Applications 🐳

Docker allows you to package applications with all their dependencies into lightweight, portable containers.

## What is Docker?

Docker solves the "it works on my machine" problem by:
- **Consistency**: Same environment everywhere
- **Isolation**: Applications don't interfere with each other
- **Portability**: Run anywhere Docker is installed
- **Efficiency**: Lightweight compared to virtual machines

## Core Concepts

### Images vs Containers
- **Image**: Read-only template for creating containers
- **Container**: Running instance of an image

### Dockerfile
Instructions for building Docker images:

\`\`\`dockerfile
# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Set user (security best practice)
USER node

# Start application
CMD ["npm", "start"]
\`\`\`

## Basic Docker Commands

\`\`\`bash
# Build an image
docker build -t my-app:latest .

# Run a container
docker run -p 3000:3000 my-app:latest

# List running containers
docker ps

# List all containers
docker ps -a

# Stop a container
docker stop container_id

# Remove containers
docker rm container_id

# List images
docker images

# Remove images
docker rmi image_id
\`\`\`

## Docker Compose

Manage multi-container applications:

\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - database
  
  database:
    image: postgres:13
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  db_data:
\`\`\`

\`\`\`bash
# Start services
docker-compose up -d

# Stop services  
docker-compose down

# View logs
docker-compose logs web
\`\`\`

## Best Practices

### Multi-stage Builds
\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/dist ./dist
USER node
CMD ["npm", "start"]
\`\`\`

### .dockerignore
\`\`\`
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
coverage
.nyc_output
\`\`\`
        `
      },
      {
        id: "3-1",
        title: "AWS Cloud Services",
        duration: "40 min",
        type: "coding",
        xp: 75,
        content: `
# AWS Cloud Services ☁️

Amazon Web Services (AWS) provides a comprehensive platform for deploying and scaling applications in the cloud.

## AWS Core Services

### EC2 (Elastic Compute Cloud)
Launch and manage virtual servers:

\`\`\`bash
# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS credentials
aws configure
# Enter: Access Key ID, Secret Access Key, Region, Output format

# Launch EC2 instance
aws ec2 run-instances \\
    --image-id ami-0abcdef1234567890 \\
    --count 1 \\
    --instance-type t2.micro \\
    --key-name my-key-pair \\
    --security-group-ids sg-903004f8 \\
    --subnet-id subnet-6e7f829e
\`\`\`

### S3 (Simple Storage Service)
Store and retrieve files:

\`\`\`javascript
const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
  region: 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

// Upload file to S3
const uploadFile = async (bucketName, key, fileContent) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileContent,
    ContentType: 'image/jpeg'
  };
  
  try {
    const result = await s3.upload(params).promise();
    console.log('File uploaded successfully:', result.Location);
    return result.Location;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

// Download file from S3
const downloadFile = async (bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key
  };
  
  try {
    const result = await s3.getObject(params).promise();
    return result.Body;
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};

// List objects in bucket
const listFiles = async (bucketName) => {
  const params = {
    Bucket: bucketName,
    MaxKeys: 100
  };
  
  try {
    const result = await s3.listObjectsV2(params).promise();
    return result.Contents;
  } catch (error) {
    console.error('List failed:', error);
    throw error;
  }
};
\`\`\`

### RDS (Relational Database Service)
Managed database service:

\`\`\`bash
# Create RDS instance
aws rds create-db-instance \\
    --db-instance-identifier myapp-db \\
    --db-instance-class db.t3.micro \\
    --engine postgres \\
    --master-username admin \\
    --master-user-password mypassword \\
    --allocated-storage 20 \\
    --vpc-security-group-ids sg-903004f8

# Connect to RDS from Node.js
\`\`\`

\`\`\`javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'myapp-db.abcdefg.us-west-2.rds.amazonaws.com',
  port: 5432,
  database: 'myapp',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,
  ssl: {
    rejectUnauthorized: false
  }
});

const connectToDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to RDS');
    client.release();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};
\`\`\`

## Elastic Beanstalk Deployment

### Application Setup
\`\`\`json
// package.json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": "18.x"
  }
}
\`\`\`

### Elastic Beanstalk Configuration
\`\`\`yaml
# .ebextensions/nodejs.config
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeCommand: "npm start"
  aws:elasticbeanstalk:application:environment:
    NODE_ENV: production
    PORT: 8080
  aws:autoscaling:launchconfiguration:
    InstanceType: t3.small
  aws:autoscaling:asg:
    MinSize: 1
    MaxSize: 3
\`\`\`

\`\`\`bash
# Deploy with EB CLI
pip install awsebcli

# Initialize EB application
eb init my-app --region us-west-2 --platform "Node.js 18"

# Create environment
eb create production --instance-type t3.small

# Deploy application
eb deploy

# Open application
eb open
\`\`\`

## Lambda Functions (Serverless)

### Creating Lambda Functions
\`\`\`javascript
// lambda/imageProcessor.js
const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  
  try {
    // Get object from S3 event
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\\+/g, ' '));
    
    // Download image
    const params = {
      Bucket: bucket,
      Key: key
    };
    
    const data = await s3.getObject(params).promise();
    
    // Resize image
    const resized = await sharp(data.Body)
      .resize(300, 300)
      .jpeg({ quality: 80 })
      .toBuffer();
    
    // Upload resized image
    const uploadParams = {
      Bucket: bucket,
      Key: \`thumbnails/\${key}\`,
      Body: resized,
      ContentType: 'image/jpeg'
    };
    
    await s3.upload(uploadParams).promise();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Image processed successfully',
        thumbnail: \`thumbnails/\${key}\`
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
\`\`\`

### Serverless Framework
\`\`\`yaml
# serverless.yml
service: my-serverless-app

provider:
  name: aws
  runtime: nodejs18.x
  region: us-west-2
  environment:
    DYNAMODB_TABLE: \${self:service}-\${opt:stage, self:provider.stage}

functions:
  api:
    handler: handler.api
    events:
      - http:
          path: /{proxy+}
          method: ANY
          cors: true
  
  imageProcessor:
    handler: lambda/imageProcessor.handler
    events:
      - s3:
          bucket: my-images-bucket
          event: s3:ObjectCreated:*
          rules:
            - prefix: uploads/
            - suffix: .jpg

resources:
  Resources:
    TodosTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: \${self:provider.environment.DYNAMODB_TABLE}
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
        BillingMode: PAY_PER_REQUEST
\`\`\`

\`\`\`bash
# Deploy serverless application
npm install -g serverless
serverless deploy

# Deploy single function
serverless deploy function -f imageProcessor

# View logs
serverless logs -f api --tail
\`\`\`

## CloudFormation (Infrastructure as Code)

\`\`\`yaml
# infrastructure.yml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Full stack application infrastructure'

Parameters:
  Environment:
    Type: String
    Default: production
    AllowedValues: [development, staging, production]

Resources:
  # VPC
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsHostnames: true
      EnableDnsSupport: true
      Tags:
        - Key: Name
          Value: !Sub '\${AWS::StackName}-vpc'

  # Internet Gateway
  InternetGateway:
    Type: AWS::EC2::InternetGateway
    Properties:
      Tags:
        - Key: Name
          Value: !Sub '\${AWS::StackName}-igw'

  # RDS Database
  Database:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceIdentifier: !Sub '\${AWS::StackName}-db'
      DBInstanceClass: db.t3.micro
      Engine: postgres
      EngineVersion: '13.7'
      MasterUsername: admin
      MasterUserPassword: !Ref DatabasePassword
      AllocatedStorage: 20
      VPCSecurityGroups:
        - !Ref DatabaseSecurityGroup
      DBSubnetGroupName: !Ref DatabaseSubnetGroup

  # S3 Bucket
  AssetsBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '\${AWS::StackName}-assets'
      PublicAccessBlockConfiguration:
        BlockPublicAcls: false
        BlockPublicPolicy: false
        IgnorePublicAcls: false
        RestrictPublicBuckets: false
      CorsConfiguration:
        CorsRules:
          - AllowedOrigins: ['*']
            AllowedMethods: [GET, PUT, POST, DELETE]
            AllowedHeaders: ['*']

Outputs:
  DatabaseEndpoint:
    Description: 'RDS Database Endpoint'
    Value: !GetAtt Database.Endpoint.Address
    Export:
      Name: !Sub '\${AWS::StackName}-db-endpoint'
  
  BucketName:
    Description: 'S3 Bucket Name'
    Value: !Ref AssetsBucket
    Export:
      Name: !Sub '\${AWS::StackName}-bucket'
\`\`\`

\`\`\`bash
# Deploy CloudFormation stack
aws cloudformation create-stack \\
    --stack-name my-app-infrastructure \\
    --template-body file://infrastructure.yml \\
    --parameters ParameterKey=Environment,ParameterValue=production \\
    --capabilities CAPABILITY_IAM

# Update stack
aws cloudformation update-stack \\
    --stack-name my-app-infrastructure \\
    --template-body file://infrastructure.yml

# Delete stack
aws cloudformation delete-stack \\
    --stack-name my-app-infrastructure
\`\`\`
        `,
        exercises: [
          {
            id: "3-1-1",
            title: "Deploy Full Stack App to AWS",
            description: "Deploy a complete Node.js application using AWS services including EC2, RDS, and S3",
            type: "coding",
            difficulty: "hard",
            points: 45,
            startingCode: `// TODO: Create AWS deployment configuration
// 1. Set up EC2 instance with Node.js application
// 2. Configure RDS PostgreSQL database
// 3. Set up S3 bucket for file uploads
// 4. Create CloudFormation template

// Package.json configuration
const packageConfig = {
  "name": "my-fullstack-app",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": "18.x"
  }
};

// TODO: Write server.js with AWS integrations
// TODO: Create CloudFormation template
// TODO: Set up environment variables
// TODO: Configure security groups and IAM roles`,
            hints: [
              "Use AWS SDK to interact with services",
              "Set up proper IAM roles and policies",
              "Configure environment variables for different stages",
              "Use CloudFormation for reproducible infrastructure",
              "Implement proper error handling for AWS services"
            ]
          }
        ]
      },
      {
        id: "3-2",
        title: "CI/CD with GitHub Actions",
        duration: "30 min",
        type: "coding",
        xp: 65,
        content: `
# CI/CD with GitHub Actions 🔄

Continuous Integration and Continuous Deployment (CI/CD) automates testing, building, and deploying applications.

## GitHub Actions Basics

### Workflow Structure
\`\`\`yaml
# .github/workflows/main.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18'
  POSTGRES_DB: test_db
  POSTGRES_USER: test_user
  POSTGRES_PASSWORD: test_password

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_DB: \${{ env.POSTGRES_DB }}
          POSTGRES_USER: \${{ env.POSTGRES_USER }}
          POSTGRES_PASSWORD: \${{ env.POSTGRES_PASSWORD }}
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: \${{ env.NODE_VERSION }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run linter
      run: npm run lint

    - name: Run unit tests
      run: npm run test:unit
      env:
        NODE_ENV: test

    - name: Run integration tests
      run: npm run test:integration
      env:
        NODE_ENV: test
        DATABASE_URL: postgresql://\${{ env.POSTGRES_USER }}:\${{ env.POSTGRES_PASSWORD }}@localhost:5432/\${{ env.POSTGRES_DB }}

    - name: Generate test coverage
      run: npm run test:coverage

    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        token: \${{ secrets.CODECOV_TOKEN }}
        file: ./coverage/lcov.info
\`\`\`

### Build and Deploy Job
\`\`\`yaml
  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: \${{ env.NODE_VERSION }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build application
      run: npm run build

    - name: Build Docker image
      run: |
        docker build -t myapp:latest .
        docker tag myapp:latest myapp:\${{ github.sha }}

    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: \${{ secrets.DOCKER_USERNAME }}
        password: \${{ secrets.DOCKER_PASSWORD }}

    - name: Push Docker image
      run: |
        docker push myapp:latest
        docker push myapp:\${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
    - name: Deploy to production
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: \${{ secrets.PRODUCTION_HOST }}
        username: \${{ secrets.PRODUCTION_USER }}
        key: \${{ secrets.PRODUCTION_SSH_KEY }}
        script: |
          cd /opt/myapp
          docker-compose pull
          docker-compose up -d
          docker system prune -f
\`\`\`

## Advanced Workflows

### Multi-Environment Deployment
\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy to Environments

on:
  push:
    branches: [ main, develop ]

jobs:
  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Deploy to staging
      run: |
        echo "Deploying to staging environment"
        # Deploy to staging server
        
  deploy-production:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Deploy to production
      run: |
        echo "Deploying to production environment"
        # Deploy to production server
\`\`\`

### Matrix Builds
\`\`\`yaml
name: Cross-Platform Testing

on: [push, pull_request]

jobs:
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [16, 18, 20]

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Setup Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: \${{ matrix.node-version }}

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test
\`\`\`

## Deployment Strategies

### Blue-Green Deployment
\`\`\`bash
#!/bin/bash
# deploy.sh

BLUE_PORT=3000
GREEN_PORT=3001
HEALTH_CHECK_URL="http://localhost"

# Determine current and new environments
if curl -f "\$HEALTH_CHECK_URL:\$BLUE_PORT/health" > /dev/null 2>&1; then
    CURRENT_PORT=\$BLUE_PORT
    NEW_PORT=\$GREEN_PORT
    CURRENT_ENV="blue"
    NEW_ENV="green"
else
    CURRENT_PORT=\$GREEN_PORT
    NEW_PORT=\$BLUE_PORT
    CURRENT_ENV="green"
    NEW_ENV="blue"
fi

echo "Current environment: \$CURRENT_ENV on port \$CURRENT_PORT"
echo "Deploying to: \$NEW_ENV on port \$NEW_PORT"

# Deploy new version
docker-compose -f docker-compose.\$NEW_ENV.yml up -d

# Wait for new version to be ready
echo "Waiting for new version to be ready..."
for i in {1..30}; do
    if curl -f "\$HEALTH_CHECK_URL:\$NEW_PORT/health" > /dev/null 2>&1; then
        echo "New version is ready!"
        break
    fi
    sleep 10
done

# Switch traffic to new version
echo "Switching traffic to new version..."
# Update load balancer or reverse proxy configuration
nginx -s reload

# Shut down old version
echo "Shutting down old version..."
docker-compose -f docker-compose.\$CURRENT_ENV.yml down

echo "Deployment complete!"
\`\`\`

### Rolling Deployment
\`\`\`yaml
# docker-compose.prod.yml
version: '3.8'
services:
  app:
    image: myapp:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 30s
        failure_action: rollback
        order: start-first
      rollback_config:
        parallelism: 1
        delay: 30s
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
\`\`\`

## Monitoring and Alerting

### Health Checks
\`\`\`javascript
// health.js
const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');

const app = express();
const pool = new Pool();
const redisClient = redis.createClient();

app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {}
  };

  try {
    // Check database
    const dbResult = await pool.query('SELECT 1');
    health.services.database = 'healthy';
  } catch (error) {
    health.services.database = 'unhealthy';
    health.status = 'error';
  }

  try {
    // Check Redis
    await redisClient.ping();
    health.services.redis = 'healthy';
  } catch (error) {
    health.services.redis = 'unhealthy';
    health.status = 'error';
  }

  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
});

app.get('/metrics', (req, res) => {
  const metrics = {
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    timestamp: new Date().toISOString()
  };
  
  res.json(metrics);
});

module.exports = app;
\`\`\`

### Slack Notifications
\`\`\`yaml
# Add to workflow
- name: Notify Slack on success
  if: success()
  uses: 8398a7/action-slack@v3
  with:
    status: success
    channel: '#deployments'
    message: '✅ Deployment successful for \${{ github.sha }}'
  env:
    SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK }}

- name: Notify Slack on failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    channel: '#deployments'
    message: '❌ Deployment failed for \${{ github.sha }}'
  env:
    SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK }}
\`\`\`
        `,
        exercises: [
          {
            id: "3-2-1",
            title: "Complete CI/CD Pipeline",
            description: "Set up a complete CI/CD pipeline with testing, building, and deployment automation",
            type: "coding",
            difficulty: "medium",
            points: 35,
            startingCode: `# TODO: Create GitHub Actions workflow
# Requirements:
# 1. Run tests on every pull request
# 2. Build and deploy on main branch pushes
# 3. Include Docker image building
# 4. Add health checks and notifications
# 5. Implement rollback strategy

# .github/workflows/ci-cd.yml
name: TODO_PIPELINE_NAME

on:
  # TODO: Define triggers

env:
  # TODO: Define environment variables

jobs:
  test:
    # TODO: Configure test job
    
  build:
    # TODO: Configure build job
    
  deploy:
    # TODO: Configure deployment job

# TODO: Add deployment script
# TODO: Create health check endpoint
# TODO: Configure monitoring`,
            hints: [
              "Use GitHub Actions marketplace for common tasks",
              "Set up proper secrets management",
              "Include database migrations in deployment",
              "Add proper health checks before switching traffic",
              "Implement proper rollback mechanisms"
            ]
          }
        ]
      },
      {
        id: "3-3",
        title: "Monitoring and Logging",
        duration: "25 min",
        type: "coding",
        xp: 55,
        content: `
# Monitoring and Logging 📊

Effective monitoring and logging are essential for maintaining healthy production applications.

## Application Logging

### Structured Logging with Winston
\`\`\`javascript
const winston = require('winston');

// Create logger configuration
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { 
    service: 'my-app',
    version: process.env.APP_VERSION || '1.0.0'
  },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    
    // File transport for production
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ],
  
  // Handle uncaught exceptions
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ],
  
  // Handle unhandled promise rejections
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' })
  ]
});

// Usage examples
logger.info('User logged in', { userId: 123, email: 'user@example.com' });
logger.warn('High memory usage detected', { memoryUsage: process.memoryUsage() });
logger.error('Database connection failed', { error: error.message, stack: error.stack });

module.exports = logger;
\`\`\`

### Request Logging Middleware
\`\`\`javascript
const morgan = require('morgan');
const logger = require('./logger');

// Custom token for response time in milliseconds
morgan.token('response-time-ms', (req, res) => {
  const responseTime = res.get('X-Response-Time');
  return responseTime ? \`\${responseTime}ms\` : '-';
});

// Create custom format
const morganFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time-ms';

// Request logging middleware
const requestLogger = morgan(morganFormat, {
  stream: {
    write: (message) => {
      // Parse log message and create structured log
      const parts = message.trim().split(' ');
      const logData = {
        ip: parts[0],
        method: parts[5]?.replace('"', ''),
        url: parts[6],
        status: parseInt(parts[8]),
        responseTime: parts[parts.length - 1],
        userAgent: parts.slice(11, -1).join(' ').replace(/"/g, '')
      };
      
      // Log based on status code
      if (logData.status >= 400) {
        logger.warn('HTTP request failed', logData);
      } else {
        logger.info('HTTP request', logData);
      }
    }
  }
});

module.exports = requestLogger;
\`\`\`

### Error Tracking
\`\`\`javascript
const Sentry = require('@sentry/node');
const logger = require('./logger');

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
});

// Error handler middleware
const errorHandler = (error, req, res, next) => {
  // Log error
  logger.error('Unhandled error', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    userId: req.user?.id,
    requestId: req.requestId
  });
  
  // Send to Sentry
  Sentry.captureException(error, {
    tags: {
      component: 'api',
      method: req.method,
      url: req.url
    },
    user: {
      id: req.user?.id,
      email: req.user?.email
    },
    extra: {
      requestBody: req.body,
      requestParams: req.params,
      requestQuery: req.query
    }
  });
  
  // Send error response
  const statusCode = error.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : error.message;
    
  res.status(statusCode).json({
    error: message,
    requestId: req.requestId
  });
};

module.exports = { errorHandler };
\`\`\`

## Performance Monitoring

### APM with New Relic
\`\`\`javascript
// At the very top of your main file
require('newrelic');

const express = require('express');
const newrelic = require('newrelic');

const app = express();

// Custom metrics
const recordMetric = (name, value) => {
  newrelic.recordMetric(name, value);
};

// Custom attributes
const addCustomAttributes = (req, res, next) => {
  newrelic.addCustomAttributes({
    userId: req.user?.id,
    userPlan: req.user?.plan,
    apiVersion: req.headers['api-version']
  });
  next();
};

// Database query timing
const trackDatabaseQuery = async (query, params) => {
  const startTime = Date.now();
  
  try {
    const result = await pool.query(query, params);
    const duration = Date.now() - startTime;
    
    // Record custom metric
    newrelic.recordMetric('Custom/Database/QueryTime', duration);
    
    // Add custom attributes
    newrelic.addCustomAttributes({
      'database.query.duration': duration,
      'database.query.rows': result.rows.length
    });
    
    return result;
  } catch (error) {
    newrelic.noticeError(error);
    throw error;
  }
};

app.use(addCustomAttributes);
\`\`\`

### Custom Metrics Collection
\`\`\`javascript
const prometheus = require('prom-client');

// Create metrics registry
const register = new prometheus.Registry();

// Default metrics
prometheus.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const httpRequestTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

const activeUsers = new prometheus.Gauge({
  name: 'active_users_count',
  help: 'Number of active users'
});

const databaseConnectionPool = new prometheus.Gauge({
  name: 'database_connections_active',
  help: 'Active database connections'
});

register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestTotal);
register.registerMetric(activeUsers);
register.registerMetric(databaseConnectionPool);

// Middleware to collect metrics
const metricsMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);
      
    httpRequestTotal
      .labels(req.method, route, res.statusCode)
      .inc();
  });
  
  next();
};

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Update custom metrics periodically
setInterval(async () => {
  try {
    // Update active users count
    const activeUserCount = await getActiveUserCount();
    activeUsers.set(activeUserCount);
    
    // Update database connection pool
    const poolStats = await pool.totalCount;
    databaseConnectionPool.set(poolStats);
  } catch (error) {
    logger.error('Failed to update metrics', { error: error.message });
  }
}, 30000); // Update every 30 seconds

module.exports = { metricsMiddleware };
\`\`\`

## Health Monitoring

### Comprehensive Health Checks
\`\`\`javascript
const healthChecks = {
  database: async () => {
    try {
      const result = await pool.query('SELECT 1');
      return { status: 'healthy', responseTime: Date.now() };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  },
  
  redis: async () => {
    try {
      const start = Date.now();
      await redisClient.ping();
      return { status: 'healthy', responseTime: Date.now() - start };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  },
  
  externalAPI: async () => {
    try {
      const start = Date.now();
      const response = await fetch('https://api.external-service.com/health');
      const responseTime = Date.now() - start;
      
      if (response.ok) {
        return { status: 'healthy', responseTime };
      } else {
        return { status: 'unhealthy', error: \`HTTP \${response.status}\` };
      }
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  },
  
  diskSpace: async () => {
    try {
      const stats = await fs.promises.stat('./');
      const free = await checkDiskSpace('./');
      
      if (free.percent < 10) {
        return { status: 'warning', message: 'Low disk space', freePercent: free.percent };
      }
      
      return { status: 'healthy', freePercent: free.percent };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  },
  
  memory: () => {
    const memUsage = process.memoryUsage();
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();
    const usagePercent = ((totalMemory - freeMemory) / totalMemory) * 100;
    
    if (usagePercent > 90) {
      return { status: 'warning', message: 'High memory usage', usagePercent };
    }
    
    return { status: 'healthy', usagePercent, heapUsed: memUsage.heapUsed };
  }
};

app.get('/health', async (req, res) => {
  const results = {};
  let overallStatus = 'healthy';
  
  // Run all health checks
  for (const [name, check] of Object.entries(healthChecks)) {
    try {
      results[name] = await check();
      
      if (results[name].status === 'unhealthy') {
        overallStatus = 'unhealthy';
      } else if (results[name].status === 'warning' && overallStatus === 'healthy') {
        overallStatus = 'warning';
      }
    } catch (error) {
      results[name] = { status: 'unhealthy', error: error.message };
      overallStatus = 'unhealthy';
    }
  }
  
  const response = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.APP_VERSION || '1.0.0',
    checks: results
  };
  
  const statusCode = overallStatus === 'healthy' ? 200 : 503;
  res.status(statusCode).json(response);
});
\`\`\`

## Log Aggregation

### ELK Stack Configuration
\`\`\`yaml
# docker-compose.elk.yml
version: '3.8'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.15.0
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms1g -Xmx1g"
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:7.15.0
    ports:
      - "5044:5044"
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:7.15.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch

volumes:
  elasticsearch_data:
\`\`\`

\`\`\`
# logstash.conf
input {
  file {
    path => "/app/logs/*.log"
    type => "application"
    codec => json
  }
}

filter {
  if [type] == "application" {
    date {
      match => [ "timestamp", "ISO8601" ]
    }
    
    if [level] == "error" {
      mutate {
        add_tag => [ "error" ]
      }
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "app-logs-%{+YYYY.MM.dd}"
  }
}
\`\`\`
        `,
        exercises: [
          {
            id: "3-3-1",
            title: "Monitoring Dashboard",
            description: "Create a comprehensive monitoring setup with logging, metrics, and health checks",
            type: "coding",
            difficulty: "medium",
            points: 30,
            startingCode: `// TODO: Set up monitoring infrastructure
// 1. Configure structured logging with Winston
// 2. Add Prometheus metrics collection
// 3. Create comprehensive health checks
// 4. Set up error tracking with Sentry

const express = require('express');
const app = express();

// TODO: Configure logger
const logger = null;

// TODO: Set up metrics collection
const metrics = {};

// TODO: Create health check system
const healthChecks = {};

// TODO: Add monitoring middleware
app.use(/* monitoring middleware */);

// TODO: Health endpoint
app.get('/health', (req, res) => {
  // Your health check implementation
});

// TODO: Metrics endpoint
app.get('/metrics', (req, res) => {
  // Your metrics implementation
});

module.exports = app;`,
            hints: [
              "Use Winston for structured JSON logging",
              "Implement Prometheus metrics with prom-client",
              "Create health checks for all dependencies",
              "Add request/response logging middleware",
              "Set up proper error handling and tracking"
            ]
          }
        ]
      },
      {
        id: "3-4",
        title: "Security & Performance",
        duration: "35 min",
        type: "coding",
        xp: 70,
        content: `
# Security & Performance 🔒

Security and performance are critical aspects of production applications that must be considered throughout the development lifecycle.

## Application Security

### Authentication & Authorization
\`\`\`javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.myapp.com"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Rate limiting
const createRateLimit = (windowMs, max, message) => rateLimit({
  windowMs,
  max,
  message: { error: message },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.ip === '127.0.0.1' // Skip localhost in development
});

// Different rate limits for different endpoints
const authLimiter = createRateLimit(15 * 60 * 1000, 5, 'Too many login attempts');
const apiLimiter = createRateLimit(15 * 60 * 1000, 100, 'Too many requests');

app.use('/api/auth', authLimiter);
app.use('/api', apiLimiter);

// JWT authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Role-based authorization
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};

// Usage
app.get('/api/admin/users', authenticateToken, requireRole(['admin']), getUsersHandler);
\`\`\`

### Input Validation & Sanitization
\`\`\`javascript
const Joi = require('joi');
const validator = require('validator');
const xss = require('xss');
const mongoSanitize = require('express-mongo-sanitize');

// MongoDB injection prevention
app.use(mongoSanitize({
  replaceWith: '_'
}));

// XSS protection
const sanitizeInput = (req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  next();
};

app.use(sanitizeInput);

// Validation schemas
const schemas = {
  user: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).required(),
    name: Joi.string().min(2).max(50).pattern(/^[a-zA-Z\s]+$/).required(),
    age: Joi.number().integer().min(13).max(120).optional()
  }),
  
  product: Joi.object({
    name: Joi.string().min(1).max(100).required(),
    price: Joi.number().positive().precision(2).required(),
    description: Joi.string().max(1000).optional(),
    category: Joi.string().valid('electronics', 'clothing', 'books', 'home').required()
  })
};

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        error: 'Validation failed',
        details: errors
      });
    }
    
    req.body = value;
    next();
  };
};

// Usage
app.post('/api/users', validate(schemas.user), createUserHandler);
\`\`\`

### SQL Injection Prevention
\`\`\`javascript
const { Pool } = require('pg');
const pool = new Pool();

// ❌ Vulnerable to SQL injection
const getUserByIdVulnerable = async (id) => {
  const query = \`SELECT * FROM users WHERE id = \${id}\`;
  const result = await pool.query(query);
  return result.rows[0];
};

// ✅ Safe with parameterized queries
const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// ✅ Safe complex query with multiple parameters
const searchUsers = async (filters) => {
  const { name, email, role, limit = 10, offset = 0 } = filters;
  
  let query = 'SELECT id, name, email, role, created_at FROM users WHERE 1=1';
  const params = [];
  let paramCount = 0;
  
  if (name) {
    paramCount++;
    query += \` AND name ILIKE $\${paramCount}\`;
    params.push(\`%\${name}%\`);
  }
  
  if (email) {
    paramCount++;
    query += \` AND email = $\${paramCount}\`;
    params.push(email);
  }
  
  if (role) {
    paramCount++;
    query += \` AND role = $\${paramCount}\`;
    params.push(role);
  }
  
  query += \` ORDER BY created_at DESC LIMIT $\${paramCount + 1} OFFSET $\${paramCount + 2}\`;
  params.push(limit, offset);
  
  const result = await pool.query(query, params);
  return result.rows;
};
\`\`\`

## Performance Optimization

### Caching Strategies
\`\`\`javascript
const redis = require('redis');
const NodeCache = require('node-cache');

// Redis for distributed caching
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3
});

// In-memory cache for fast access
const memoryCache = new NodeCache({ 
  stdTTL: 600, // 10 minutes default
  checkperiod: 120 // Check for expired keys every 2 minutes
});

// Multi-level caching
const getFromCache = async (key) => {
  // Try memory cache first
  let value = memoryCache.get(key);
  if (value) {
    return { data: value, source: 'memory' };
  }
  
  // Try Redis cache
  try {
    value = await redisClient.get(key);
    if (value) {
      const parsed = JSON.parse(value);
      // Store in memory cache for faster access
      memoryCache.set(key, parsed);
      return { data: parsed, source: 'redis' };
    }
  } catch (error) {
    console.error('Redis cache error:', error);
  }
  
  return null;
};

const setCache = async (key, data, ttl = 600) => {
  // Set in memory cache
  memoryCache.set(key, data, ttl);
  
  // Set in Redis cache
  try {
    await redisClient.setex(key, ttl, JSON.stringify(data));
  } catch (error) {
    console.error('Redis cache set error:', error);
  }
};

// Cache middleware
const cacheMiddleware = (ttl = 600) => {
  return async (req, res, next) => {
    const key = \`cache:\${req.method}:\${req.originalUrl}\`;
    
    try {
      const cached = await getFromCache(key);
      if (cached) {
        res.set('X-Cache', cached.source);
        return res.json(cached.data);
      }
      
      // Override res.json to cache response
      const originalJson = res.json;
      res.json = function(data) {
        setCache(key, data, ttl);
        return originalJson.call(this, data);
      };
      
      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

// Usage
app.get('/api/products', cacheMiddleware(300), getProductsHandler);
\`\`\`

### Database Optimization
\`\`\`javascript
// Connection pooling configuration
const poolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  
  // Pool settings
  max: 20,              // Maximum number of clients
  min: 5,               // Minimum number of clients
  idle: 10000,          // Close idle clients after 10 seconds
  acquire: 60000,       // Maximum time to get connection
  evict: 1000,          // Check for idle clients every second
  
  // Connection settings
  connectionTimeoutMillis: 5000,
  query_timeout: 30000,
  statement_timeout: 30000,
  
  // SSL configuration for production
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
};

const pool = new Pool(poolConfig);

// Query optimization
const getOrdersWithItems = async (userId, options = {}) => {
  const { limit = 10, offset = 0, status } = options;
  
  // Optimized query with joins and proper indexing
  let query = \`
    SELECT 
      o.id, o.total, o.status, o.created_at,
      json_agg(
        json_build_object(
          'id', oi.id,
          'product_name', p.name,
          'quantity', oi.quantity,
          'price', oi.price
        )
      ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE o.user_id = $1
  \`;
  
  const params = [userId];
  let paramCount = 1;
  
  if (status) {
    paramCount++;
    query += \` AND o.status = $\${paramCount}\`;
    params.push(status);
  }
  
  query += \`
    GROUP BY o.id, o.total, o.status, o.created_at
    ORDER BY o.created_at DESC
    LIMIT $\${paramCount + 1} OFFSET $\${paramCount + 2}
  \`;
  
  params.push(limit, offset);
  
  const result = await pool.query(query, params);
  return result.rows;
};

// Batch operations for better performance
const createUsersInBatch = async (users) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Use COPY for bulk inserts (most efficient)
    const copyQuery = 'COPY users (name, email, password_hash) FROM STDIN WITH CSV';
    const stream = client.query(copyFrom(copyQuery));
    
    for (const user of users) {
      stream.write(\`"\${user.name}","\${user.email}","\${user.passwordHash}"\n\`);
    }
    
    stream.end();
    
    await client.query('COMMIT');
    console.log(\`Created \${users.length} users in batch\`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
\`\`\`

### CDN and Asset Optimization
\`\`\`javascript
const sharp = require('sharp');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const cloudfront = new AWS.CloudFront();

// Image optimization middleware
const optimizeImage = async (req, res, next) => {
  if (!req.file) return next();
  
  try {
    const { buffer, mimetype } = req.file;
    
    // Generate multiple sizes
    const sizes = [
      { name: 'thumbnail', width: 150, height: 150 },
      { name: 'small', width: 400, height: 300 },
      { name: 'medium', width: 800, height: 600 },
      { name: 'large', width: 1200, height: 900 }
    ];
    
    const optimizedImages = {};
    
    for (const size of sizes) {
      const optimized = await sharp(buffer)
        .resize(size.width, size.height, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true })
        .toBuffer();
      
      optimizedImages[size.name] = optimized;
    }
    
    // Upload to S3 with CDN distribution
    const uploadPromises = Object.entries(optimizedImages).map(async ([size, imageBuffer]) => {
      const key = \`images/\${req.user.id}/\${Date.now()}-\${size}.jpg\`;
      
      const uploadParams = {
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: imageBuffer,
        ContentType: 'image/jpeg',
        CacheControl: 'public, max-age=31536000', // 1 year
        Metadata: {
          originalName: req.file.originalname,
          size: size,
          userId: req.user.id.toString()
        }
      };
      
      const result = await s3.upload(uploadParams).promise();
      return { size, url: result.Location, key };
    });
    
    req.optimizedImages = await Promise.all(uploadPromises);
    next();
  } catch (error) {
    console.error('Image optimization error:', error);
    next(error);
  }
};

// CDN cache invalidation
const invalidateCDNCache = async (paths) => {
  try {
    const params = {
      DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
      InvalidationBatch: {
        Paths: {
          Quantity: paths.length,
          Items: paths
        },
        CallerReference: Date.now().toString()
      }
    };
    
    const result = await cloudfront.createInvalidation(params).promise();
    console.log('CDN cache invalidated:', result.Invalidation.Id);
    return result.Invalidation.Id;
  } catch (error) {
    console.error('CDN invalidation error:', error);
    throw error;
  }
};
\`\`\`

## Security Monitoring

### Intrusion Detection
\`\`\`javascript
const geoip = require('geoip-lite');

// Suspicious activity detection
const securityMonitor = {
  suspiciousIPs: new Map(),
  failedAttempts: new Map(),
  
  checkSuspiciousActivity: (req) => {
    const ip = req.ip;
    const now = Date.now();
    const hour = 60 * 60 * 1000;
    
    // Check for too many requests from single IP
    if (!this.suspiciousIPs.has(ip)) {
      this.suspiciousIPs.set(ip, { count: 1, firstSeen: now });
    } else {
      const data = this.suspiciousIPs.get(ip);
      if (now - data.firstSeen < hour) {
        data.count++;
        if (data.count > 1000) { // More than 1000 requests per hour
          return { suspicious: true, reason: 'high_request_rate' };
        }
      } else {
        // Reset counter after an hour
        this.suspiciousIPs.set(ip, { count: 1, firstSeen: now });
      }
    }
    
    // Check geographic location
    const geo = geoip.lookup(ip);
    if (geo && ['CN', 'RU', 'KP'].includes(geo.country)) {
      return { suspicious: true, reason: 'suspicious_location', country: geo.country };
    }
    
    return { suspicious: false };
  },
  
  recordFailedLogin: (email, ip) => {
    const key = \`\${email}:\${ip}\`;
    const now = Date.now();
    
    if (!this.failedAttempts.has(key)) {
      this.failedAttempts.set(key, { count: 1, lastAttempt: now });
    } else {
      const data = this.failedAttempts.get(key);
      data.count++;
      data.lastAttempt = now;
      
      // Lock account after 5 failed attempts
      if (data.count >= 5) {
        return { locked: true, attempts: data.count };
      }
    }
    
    return { locked: false };
  }
};

// Security middleware
const securityMiddleware = (req, res, next) => {
  const suspicious = securityMonitor.checkSuspiciousActivity(req);
  
  if (suspicious.suspicious) {
    logger.warn('Suspicious activity detected', {
      ip: req.ip,
      reason: suspicious.reason,
      userAgent: req.headers['user-agent'],
      url: req.url
    });
    
    // Rate limit suspicious IPs more aggressively
    if (suspicious.reason === 'high_request_rate') {
      return res.status(429).json({ error: 'Too many requests' });
    }
  }
  
  next();
};

app.use(securityMiddleware);
\`\`\`
        `,
        exercises: [
          {
            id: "3-4-1",
            title: "Production Security Setup",
            description: "Implement comprehensive security measures for a production application",
            type: "coding",
            difficulty: "hard",
            points: 40,
            startingCode: `// TODO: Implement production security setup
// 1. Set up authentication with JWT
// 2. Add input validation and sanitization
// 3. Implement rate limiting
// 4. Add security headers
// 5. Set up caching strategy

const express = require('express');
const app = express();

// TODO: Security middleware setup
// - Helmet for security headers
// - Rate limiting for different endpoints
// - Input validation and sanitization
// - XSS protection

// TODO: Authentication system
const authenticateToken = (req, res, next) => {
  // Your JWT authentication implementation
};

// TODO: Authorization middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    // Your role-based authorization
  };
};

// TODO: Caching system
const cacheMiddleware = (ttl) => {
  return (req, res, next) => {
    // Your caching implementation
  };
};

// TODO: Security monitoring
const securityMonitor = {
  // Your intrusion detection system
};

module.exports = app;`,
            hints: [
              "Use helmet for security headers",
              "Implement proper JWT authentication",
              "Add input validation with Joi",
              "Set up Redis for caching",
              "Monitor suspicious activities",
              "Use parameterized queries to prevent SQL injection"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Advanced Topics",
    description: "GraphQL, Microservices, Testing, and Architecture",
    lessons: [
      {
        id: "4-0",
        title: "GraphQL API Design",
        duration: "35 min",
        type: "coding",
        xp: 85,
        content: `
# GraphQL: A Query Language for APIs 🔗

GraphQL provides a complete description of the data in your API and gives clients the power to ask for exactly what they need.

## GraphQL vs REST

### REST Limitations
- **Over-fetching**: Getting more data than needed
- **Under-fetching**: Multiple requests for related data
- **API Versioning**: Breaking changes require new endpoints

### GraphQL Benefits
- **Single Endpoint**: One URL for all data operations
- **Precise Data Fetching**: Request exactly what you need
- **Strong Type System**: Self-documenting and validated
- **Real-time Subscriptions**: Live data updates

## Core Concepts

### Schema Definition Language (SDL)
\`\`\`graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  published: Boolean!
}

type Query {
  users: [User!]!
  user(id: ID!): User
  posts: [Post!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
}

input CreateUserInput {
  name: String!
  email: String!
}
\`\`\`

### Queries
\`\`\`graphql
# Get specific user data
query GetUser($userId: ID!) {
  user(id: $userId) {
    id
    name
    email
    posts {
      id
      title
      published
    }
  }
}

# Get all users with limited fields
query GetAllUsers {
  users {
    id
    name
    email
  }
}
\`\`\`

### Mutations
\`\`\`graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
  }
}
\`\`\`

## Implementation with Apollo Server

\`\`\`javascript
const { ApolloServer, gql } = require('apollo-server-express');

// Type definitions
const typeDefs = gql\`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
\`;

// Resolvers
const resolvers = {
  Query: {
    users: () => {
      // Return all users from database
      return getAllUsers();
    },
    user: (parent, { id }) => {
      // Return user by ID
      return getUserById(id);
    }
  },
  Mutation: {
    createUser: (parent, { name, email }) => {
      // Create new user
      return createNewUser({ name, email });
    }
  }
};

// Create Apollo Server
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: ({ req }) => {
    // Add authentication, database connections, etc.
    return {
      user: req.user,
      db: database
    };
  }
});
\`\`\`

## Advanced Features

### Subscriptions (Real-time)
\`\`\`graphql
type Subscription {
  postAdded: Post!
  userUpdated(userId: ID!): User!
}
\`\`\`

\`\`\`javascript
const { PubSub } = require('apollo-server-express');
const pubsub = new PubSub();

const resolvers = {
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.asyncIterator(['POST_ADDED'])
    }
  },
  Mutation: {
    createPost: (parent, args) => {
      const newPost = createPost(args);
      pubsub.publish('POST_ADDED', { postAdded: newPost });
      return newPost;
    }
  }
};
\`\`\`

### Error Handling
\`\`\`javascript
const { AuthenticationError, UserInputError } = require('apollo-server-express');

const resolvers = {
  Query: {
    user: (parent, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in');
      }
      
      if (!isValidId(id)) {
        throw new UserInputError('Invalid user ID format');
      }
      
      const user = getUserById(id);
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    }
  }
};
\`\`\`
        `,
        exercises: [
          {
            id: "4-0-1",
            title: "GraphQL API Implementation",
            description: "Build a complete GraphQL API with queries, mutations, and subscriptions",
            type: "coding",
            difficulty: "hard",
            points: 45,
            startingCode: `// TODO: Implement GraphQL API
// 1. Define GraphQL schema with User and Post types
// 2. Create resolvers for queries and mutations
// 3. Set up Apollo Server
// 4. Add real-time subscriptions
// 5. Implement authentication

const { ApolloServer } = require('apollo-server-express');
const { gql } = require('apollo-server-express');

// TODO: Define your schema
const typeDefs = gql\`
  type User {
    # Define User type
  }
  
  type Post {
    # Define Post type
  }
  
  type Query {
    # Define queries
  }
  
  type Mutation {
    # Define mutations
  }
  
  type Subscription {
    # Define subscriptions
  }
\`;

// TODO: Create resolvers
const resolvers = {
  Query: {
    // Your query resolvers
  },
  Mutation: {
    // Your mutation resolvers
  },
  Subscription: {
    // Your subscription resolvers
  }
};

// TODO: Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Add context, authentication, etc.
});`,
            hints: [
              "Use Apollo Server for GraphQL implementation",
              "Define proper relationships between types",
              "Implement authentication in context",
              "Add input validation in resolvers",
              "Use subscriptions for real-time features"
            ]
          }
        ]
      },
      {
        id: "4-1",
        title: "Microservices Architecture",
        duration: "45 min",
        type: "coding",
        xp: 90,
        content: `
# Microservices Architecture 🏗️

Microservices architecture involves developing applications as a suite of small services, each running in its own process and communicating with lightweight mechanisms.

## Microservices Principles

### Single Responsibility
Each service should have one business capability:

\`\`\`javascript
// User Service - handles user management
const userService = {
  port: 3001,
  responsibilities: [
    'user registration',
    'user authentication',
    'profile management'
  ]
};

// Order Service - handles order processing
const orderService = {
  port: 3002,
  responsibilities: [
    'order creation',
    'order processing',
    'order history'
  ]
};

// Payment Service - handles payments
const paymentService = {
  port: 3003,
  responsibilities: [
    'payment processing',
    'payment validation',
    'refunds'
  ]
};
\`\`\`

### Service Communication

#### Synchronous Communication (REST/GraphQL)
\`\`\`javascript
const axios = require('axios');

class OrderService {
  constructor() {
    this.userServiceURL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
    this.paymentServiceURL = process.env.PAYMENT_SERVICE_URL || 'http://localhost:3003';
  }
  
  async createOrder(orderData) {
    try {
      // Validate user exists
      const userResponse = await axios.get(\`\${this.userServiceURL}/users/\${orderData.userId}\`);
      const user = userResponse.data;
      
      // Create order
      const order = {
        id: generateOrderId(),
        userId: user.id,
        items: orderData.items,
        total: calculateTotal(orderData.items),
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      // Process payment
      const paymentResponse = await axios.post(\`\${this.paymentServiceURL}/payments\`, {
        orderId: order.id,
        amount: order.total,
        userId: user.id,
        paymentMethod: orderData.paymentMethod
      });
      
      if (paymentResponse.data.status === 'success') {
        order.status = 'confirmed';
        order.paymentId = paymentResponse.data.paymentId;
      } else {
        order.status = 'failed';
      }
      
      // Save order
      await this.saveOrder(order);
      
      return order;
    } catch (error) {
      console.error('Order creation failed:', error);
      throw new Error('Failed to create order');
    }
  }
  
  async saveOrder(order) {
    // Save to database
    return await db.orders.create(order);
  }
}
\`\`\`

#### Asynchronous Communication (Message Queues)
\`\`\`javascript
const amqp = require('amqplib');

class MessageBroker {
  constructor() {
    this.connection = null;
    this.channel = null;
  }
  
  async connect() {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
      this.channel = await this.connection.createChannel();
      
      // Declare exchanges
      await this.channel.assertExchange('orders', 'topic', { durable: true });
      await this.channel.assertExchange('payments', 'topic', { durable: true });
      await this.channel.assertExchange('notifications', 'topic', { durable: true });
      
      console.log('Connected to message broker');
    } catch (error) {
      console.error('Failed to connect to message broker:', error);
      throw error;
    }
  }
  
  async publishEvent(exchange, routingKey, event) {
    const message = {
      id: generateEventId(),
      timestamp: new Date().toISOString(),
      type: routingKey,
      data: event
    };
    
    this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
    
    console.log(\`Published event: \${routingKey}\`, message);
  }
  
  async subscribe(exchange, routingKey, queue, handler) {
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, exchange, routingKey);
    
    this.channel.consume(queue, async (msg) => {
      if (msg) {
        try {
          const event = JSON.parse(msg.content.toString());
          await handler(event);
          this.channel.ack(msg);
        } catch (error) {
          console.error('Error processing message:', error);
          // Send to dead letter queue or retry
          this.channel.nack(msg, false, false);
        }
      }
    });
    
    console.log(\`Subscribed to: \${exchange}.\${routingKey}\`);
  }
}

// Usage in services
class OrderService {
  constructor() {
    this.messageBroker = new MessageBroker();
  }
  
  async initialize() {
    await this.messageBroker.connect();
  }
  
  async createOrder(orderData) {
    const order = await this.processOrder(orderData);
    
    // Publish order created event
    await this.messageBroker.publishEvent('orders', 'order.created', {
      orderId: order.id,
      userId: order.userId,
      total: order.total,
      items: order.items
    });
    
    return order;
  }
}

class PaymentService {
  constructor() {
    this.messageBroker = new MessageBroker();
  }
  
  async initialize() {
    await this.messageBroker.connect();
    
    // Subscribe to order events
    await this.messageBroker.subscribe(
      'orders',
      'order.created',
      'payment-processing-queue',
      this.handleOrderCreated.bind(this)
    );
  }
  
  async handleOrderCreated(event) {
    const { orderId, userId, total } = event.data;
    
    try {
      const payment = await this.processPayment({
        orderId,
        userId,
        amount: total
      });
      
      // Publish payment event
      await this.messageBroker.publishEvent('payments', 'payment.completed', {
        orderId,
        paymentId: payment.id,
        status: payment.status
      });
    } catch (error) {
      await this.messageBroker.publishEvent('payments', 'payment.failed', {
        orderId,
        error: error.message
      });
    }
  }
}
\`\`\`

## Service Discovery and Load Balancing

### Service Registry with Consul
\`\`\`javascript
const consul = require('consul')();

class ServiceRegistry {
  constructor(serviceName, servicePort) {
    this.serviceName = serviceName;
    this.servicePort = servicePort;
    this.serviceId = \`\${serviceName}-\${process.env.HOSTNAME || 'localhost'}-\${servicePort}\`;
  }
  
  async register() {
    try {
      await consul.agent.service.register({
        id: this.serviceId,
        name: this.serviceName,
        port: this.servicePort,
        address: process.env.SERVICE_IP || 'localhost',
        check: {
          http: \`http://\${process.env.SERVICE_IP || 'localhost'}:\${this.servicePort}/health\`,
          interval: '10s',
          timeout: '5s'
        },
        tags: [
          process.env.NODE_ENV || 'development',
          'api',
          'microservice'
        ]
      });
      
      console.log(\`Service \${this.serviceName} registered with Consul\`);
    } catch (error) {
      console.error('Failed to register service:', error);
      throw error;
    }
  }
  
  async deregister() {
    try {
      await consul.agent.service.deregister(this.serviceId);
      console.log(\`Service \${this.serviceName} deregistered from Consul\`);
    } catch (error) {
      console.error('Failed to deregister service:', error);
    }
  }
  
  async discoverServices(serviceName) {
    try {
      const services = await consul.health.service({
        service: serviceName,
        passing: true
      });
      
      return services[0].map(service => ({
        id: service.Service.ID,
        address: service.Service.Address,
        port: service.Service.Port,
        tags: service.Service.Tags
      }));
    } catch (error) {
      console.error('Service discovery failed:', error);
      return [];
    }
  }
}

// Load balancer
class LoadBalancer {
  constructor(serviceName) {
    this.serviceName = serviceName;
    this.serviceRegistry = new ServiceRegistry();
    this.currentIndex = 0;
  }
  
  async getServiceInstance() {
    const services = await this.serviceRegistry.discoverServices(this.serviceName);
    
    if (services.length === 0) {
      throw new Error(\`No healthy instances of \${this.serviceName} found\`);
    }
    
    // Round-robin load balancing
    const service = services[this.currentIndex % services.length];
    this.currentIndex++;
    
    return \`http://\${service.address}:\${service.port}\`;
  }
}

// Usage
const orderServiceRegistry = new ServiceRegistry('order-service', 3002);
await orderServiceRegistry.register();

const userServiceLB = new LoadBalancer('user-service');
const userServiceURL = await userServiceLB.getServiceInstance();
\`\`\`

## API Gateway Pattern
\`\`\`javascript
const express = require('express');
const httpProxy = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');

class APIGateway {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }
  
  setupMiddleware() {
    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    });
    
    this.app.use(limiter);
    this.app.use(express.json());
    
    // Authentication middleware
    this.app.use(this.authenticate.bind(this));
    
    // Request logging
    this.app.use((req, res, next) => {
      console.log(\`\${new Date().toISOString()} - \${req.method} \${req.path}\`);
      next();
    });
  }
  
  async authenticate(req, res, next) {
    // Skip authentication for health checks and public endpoints
    if (req.path === '/health' || req.path.startsWith('/public')) {
      return next();
    }
    
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    try {
      // Validate token with auth service
      const authServiceURL = await this.getServiceURL('auth-service');
      const response = await axios.get(\`\${authServiceURL}/validate\`, {
        headers: { Authorization: \`Bearer \${token}\` }
      });
      
      req.user = response.data.user;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  }
  
  setupRoutes() {
    // User service routes
    this.app.use('/api/users', httpProxy({
      target: async () => await this.getServiceURL('user-service'),
      changeOrigin: true,
      pathRewrite: { '^/api/users': '' },
      onError: this.handleProxyError.bind(this)
    }));
    
    // Order service routes
    this.app.use('/api/orders', httpProxy({
      target: async () => await this.getServiceURL('order-service'),
      changeOrigin: true,
      pathRewrite: { '^/api/orders': '' },
      onError: this.handleProxyError.bind(this)
    }));
    
    // Payment service routes
    this.app.use('/api/payments', httpProxy({
      target: async () => await this.getServiceURL('payment-service'),
      changeOrigin: true,
      pathRewrite: { '^/api/payments': '' },
      onError: this.handleProxyError.bind(this)
    }));
    
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ status: 'healthy', timestamp: new Date().toISOString() });
    });
  }
  
  async getServiceURL(serviceName) {
    const loadBalancer = new LoadBalancer(serviceName);
    return await loadBalancer.getServiceInstance();
  }
  
  handleProxyError(err, req, res) {
    console.error('Proxy error:', err);
    res.status(503).json({ 
      error: 'Service temporarily unavailable',
      service: req.path.split('/')[2]
    });
  }
  
  start(port = 3000) {
    this.app.listen(port, () => {
      console.log(\`API Gateway running on port \${port}\`);
    });
  }
}

const gateway = new APIGateway();
gateway.start();
\`\`\`

## Circuit Breaker Pattern
\`\`\`javascript
class CircuitBreaker {
  constructor(name, options = {}) {
    this.name = name;
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 30000;
    this.monitoringWindow = options.monitoringWindow || 60000;
    
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failures = [];
    this.nextAttempt = Date.now();
    this.successCount = 0;
  }
  
  async execute(fn, ...args) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error(\`Circuit breaker is OPEN for \${this.name}\`);
      } else {
        this.state = 'HALF_OPEN';
        this.successCount = 0;
      }
    }
    
    try {
      const result = await fn(...args);
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failures = [];
    
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= 3) {
        this.state = 'CLOSED';
        console.log(\`Circuit breaker \${this.name} is now CLOSED\`);
      }
    }
  }
  
  onFailure() {
    const now = Date.now();
    this.failures.push(now);
    
    // Remove old failures outside monitoring window
    this.failures = this.failures.filter(
      failure => now - failure < this.monitoringWindow
    );
    
    if (this.failures.length >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = now + this.resetTimeout;
      console.log(\`Circuit breaker \${this.name} is now OPEN\`);
    }
  }
  
  getState() {
    return {
      state: this.state,
      failures: this.failures.length,
      nextAttempt: this.nextAttempt
    };
  }
}

// Usage
const userServiceBreaker = new CircuitBreaker('user-service', {
  failureThreshold: 3,
  resetTimeout: 30000
});

const paymentServiceBreaker = new CircuitBreaker('payment-service', {
  failureThreshold: 5,
  resetTimeout: 60000
});

class OrderService {
  async getUser(userId) {
    return await userServiceBreaker.execute(async () => {
      const response = await axios.get(\`\${userServiceURL}/users/\${userId}\`);
      return response.data;
    });
  }
  
  async processPayment(paymentData) {
    return await paymentServiceBreaker.execute(async () => {
      const response = await axios.post(\`\${paymentServiceURL}/payments\`, paymentData);
      return response.data;
    });
  }
}
\`\`\`
        `,
        exercises: [
          {
            id: "4-1-1",
            title: "Microservices System",
            description: "Design and implement a microservices architecture with service discovery and communication",
            type: "coding",
            difficulty: "hard",
            points: 50,
            startingCode: `// TODO: Implement microservices system
// 1. Create User, Order, and Payment services
// 2. Set up service registry with Consul
// 3. Implement API Gateway
// 4. Add message broker for async communication
// 5. Implement circuit breaker pattern

// User Service
class UserService {
  constructor() {
    this.port = 3001;
    // TODO: Initialize service
  }
  
  // TODO: Implement user management methods
}

// Order Service
class OrderService {
  constructor() {
    this.port = 3002;
    // TODO: Initialize service
  }
  
  // TODO: Implement order processing methods
}

// Payment Service
class PaymentService {
  constructor() {
    this.port = 3003;
    // TODO: Initialize service
  }
  
  // TODO: Implement payment processing methods
}

// API Gateway
class APIGateway {
  constructor() {
    this.port = 3000;
    // TODO: Initialize gateway
  }
  
  // TODO: Set up routing and middleware
}

// TODO: Set up service discovery
// TODO: Implement message broker
// TODO: Add circuit breaker
// TODO: Create docker-compose for all services`,
            hints: [
              "Use Express.js for each microservice",
              "Implement health checks for all services",
              "Use RabbitMQ or Redis for message broker",
              "Set up proper error handling",
              "Add monitoring and logging",
              "Use Docker for service containerization"
            ]
          }
        ]
      },
      {
        id: "4-2",
        title: "Testing Strategies",
        duration: "40 min",
        type: "coding",
        xp: 80,
        content: `
# Testing Strategies 🧪

Comprehensive testing ensures application reliability and maintainability through unit, integration, and end-to-end tests.

## Unit Testing with Jest

### Basic Unit Tests
\`\`\`javascript
// utils/validation.js
const validateEmail = (email) => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

module.exports = { validateEmail, validatePassword, calculateTotal };

// __tests__/validation.test.js
const { validateEmail, validatePassword, calculateTotal } = require('../utils/validation');

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('should return true for valid emails', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org'
      ];
      
      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });
    
    it('should return false for invalid emails', () => {
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user space@domain.com',
        ''
      ];
      
      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false);
      });
    });
  });
  
  describe('validatePassword', () => {
    it('should return true for valid passwords', () => {
      const validPasswords = [
        'Password123!',
        'MySecure123$',
        'Test@Pass1'
      ];
      
      validPasswords.forEach(password => {
        expect(validatePassword(password)).toBe(true);
      });
    });
    
    it('should return false for invalid passwords', () => {
      const invalidPasswords = [
        'password', // no uppercase, number, special char
        'PASSWORD123', // no lowercase, special char
        'Password123', // no special char
        'Pass!1', // too short
        ''
      ];
      
      invalidPasswords.forEach(password => {
        expect(validatePassword(password)).toBe(false);
      });
    });
  });
  
  describe('calculateTotal', () => {
    it('should calculate total correctly', () => {
      const items = [
        { price: 10.99, quantity: 2 },
        { price: 5.50, quantity: 1 },
        { price: 15.25, quantity: 3 }
      ];
      
      const expected = (10.99 * 2) + (5.50 * 1) + (15.25 * 3);
      expect(calculateTotal(items)).toBe(expected);
    });
    
    it('should return 0 for empty array', () => {
      expect(calculateTotal([])).toBe(0);
    });
  });
});
\`\`\`

### Mocking Dependencies
\`\`\`javascript
// services/UserService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class UserService {
  async createUser(userData) {
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });
    
    return user;
  }
  
  async authenticateUser(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return { user: { id: user.id, email: user.email }, token };
  }
}

module.exports = UserService;

// __tests__/UserService.test.js
const UserService = require('../services/UserService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Mock dependencies
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../models');

describe('UserService', () => {
  let userService;
  
  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });
  
  describe('createUser', () => {
    it('should create user successfully', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };
      
      const hashedPassword = 'hashed_password';
      const createdUser = { id: 1, ...userData, password: hashedPassword };
      
      // Mock implementations
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue(hashedPassword);
      User.create.mockResolvedValue(createdUser);
      
      const result = await userService.createUser(userData);
      
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(User.create).toHaveBeenCalledWith({
        ...userData,
        password: hashedPassword
      });
      expect(result).toEqual(createdUser);
    });
    
    it('should throw error if user already exists', async () => {
      const userData = { email: 'existing@example.com' };
      const existingUser = { id: 1, email: userData.email };
      
      User.findOne.mockResolvedValue(existingUser);
      
      await expect(userService.createUser(userData)).rejects.toThrow('User already exists');
    });
  });
  
  describe('authenticateUser', () => {
    it('should authenticate user successfully', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = { id: 1, email, password: 'hashed_password' };
      const token = 'jwt_token';
      
      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue(token);
      
      const result = await userService.authenticateUser(email, password);
      
      expect(result).toEqual({
        user: { id: user.id, email: user.email },
        token
      });
    });
    
    it('should throw error for invalid password', async () => {
      const email = 'test@example.com';
      const password = 'wrong_password';
      const user = { id: 1, email, password: 'hashed_password' };
      
      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);
      
      await expect(userService.authenticateUser(email, password))
        .rejects.toThrow('Invalid password');
    });
  });
});
\`\`\`

## Integration Testing

### API Integration Tests
\`\`\`javascript
// __tests__/integration/auth.test.js
const request = require('supertest');
const app = require('../../app');
const { User } = require('../../models');
const { setupTestDB, cleanupTestDB } = require('../helpers/database');

describe('Authentication API', () => {
  beforeAll(async () => {
    await setupTestDB();
  });
  
  afterAll(async () => {
    await cleanupTestDB();
  });
  
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });
  
  describe('POST /api/auth/register', () => {
    it('should register new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123!'
      };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);
      
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user).not.toHaveProperty('password');
      
      // Verify user was created in database
      const dbUser = await User.findOne({ where: { email: userData.email } });
      expect(dbUser).toBeTruthy();
      expect(dbUser.name).toBe(userData.name);
    });
    
    it('should return 400 for invalid email', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'Password123!'
      };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
    });
    
    it('should return 409 for existing user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123!'
      };
      
      // Create user first
      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);
      
      // Try to create same user again
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(409);
      
      expect(response.body.error).toBe('User already exists');
    });
  });
  
  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Password123!'
        });
    });
    
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Password123!'
        })
        .expect(200);
      
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('test@example.com');
    });
    
    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrong_password'
        })
        .expect(401);
      
      expect(response.body).toHaveProperty('error');
    });
  });
});
\`\`\`

### Database Integration Tests
\`\`\`javascript
// __tests__/helpers/database.js
const { sequelize } = require('../../config/database');

const setupTestDB = async () => {
  // Use test database
  process.env.NODE_ENV = 'test';
  
  // Sync database
  await sequelize.sync({ force: true });
  
  console.log('Test database setup complete');
};

const cleanupTestDB = async () => {
  // Close database connection
  await sequelize.close();
  console.log('Test database cleanup complete');
};

const createTestUser = async (overrides = {}) => {
  const { User } = require('../../models');
  const bcrypt = require('bcryptjs');
  
  const defaultUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: await bcrypt.hash('password123', 10)
  };
  
  return await User.create({ ...defaultUser, ...overrides });
};

module.exports = {
  setupTestDB,
  cleanupTestDB,
  createTestUser
};
\`\`\`

## End-to-End Testing with Playwright

### E2E Test Setup
\`\`\`javascript
// playwright.config.js
module.exports = {
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  webServer: {
    command: 'npm run start:test',
    port: 3000,
    reuseExistingServer: !process.env.CI
  }
};

// tests/e2e/auth.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Reset database state
    await page.request.post('/api/test/reset-db');
  });
  
  test('should register and login user', async ({ page }) => {
    // Navigate to register page
    await page.goto('/register');
    
    // Fill registration form
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    await page.fill('[data-testid="password-input"]', 'Password123!');
    await page.fill('[data-testid="confirm-password-input"]', 'Password123!');
    
    // Submit form
    await page.click('[data-testid="register-button"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="welcome-message"]'))
      .toContainText('Welcome, John Doe');
    
    // Logout
    await page.click('[data-testid="logout-button"]');
    await expect(page).toHaveURL('/');
    
    // Login with same credentials
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    await page.fill('[data-testid="password-input"]', 'Password123!');
    await page.click('[data-testid="login-button"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });
  
  test('should show validation errors', async ({ page }) => {
    await page.goto('/register');
    
    // Submit empty form
    await page.click('[data-testid="register-button"]');
    
    // Should show validation errors
    await expect(page.locator('[data-testid="name-error"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="email-error"]'))
      .toBeVisible();
    await expect(page.locator('[data-testid="password-error"]'))
      .toBeVisible();
  });
});

test.describe('Dashboard Features', () => {
  test.beforeEach(async ({ page }) => {
    // Create test user and login
    await page.request.post('/api/test/create-user', {
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!'
      }
    });
    
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'Password123!');
    await page.click('[data-testid="login-button"]');
  });
  
  test('should create new post', async ({ page }) => {
    // Navigate to create post
    await page.click('[data-testid="new-post-button"]');
    
    // Fill form
    await page.fill('[data-testid="title-input"]', 'My First Post');
    await page.fill('[data-testid="content-input"]', 'This is my first post content.');
    
    // Submit
    await page.click('[data-testid="publish-button"]');
    
    // Should redirect to post
    await expect(page.locator('h1')).toContainText('My First Post');
    
    // Go back to dashboard
    await page.goto('/dashboard');
    
    // Should see post in list
    await expect(page.locator('[data-testid="posts-list"]'))
      .toContainText('My First Post');
  });
});
\`\`\`

### Performance Testing
\`\`\`javascript
// tests/performance/load-test.js
const { chromium } = require('playwright');

async function runLoadTest() {
  const browser = await chromium.launch();
  const numberOfUsers = 10;
  const requests = [];
  
  for (let i = 0; i < numberOfUsers; i++) {
    requests.push(simulateUser(browser, i));
  }
  
  const results = await Promise.all(requests);
  
  // Analyze results
  const totalRequests = results.reduce((sum, result) => sum + result.requests, 0);
  const totalTime = Math.max(...results.map(result => result.totalTime));
  const averageResponseTime = results.reduce((sum, result) => sum + result.averageResponseTime, 0) / numberOfUsers;
  
  console.log(\`Load Test Results:\`);
  console.log(\`- Concurrent users: \${numberOfUsers}\`);
  console.log(\`- Total requests: \${totalRequests}\`);
  console.log(\`- Total time: \${totalTime}ms\`);
  console.log(\`- Average response time: \${averageResponseTime.toFixed(2)}ms\`);
  console.log(\`- Requests per second: \${(totalRequests / (totalTime / 1000)).toFixed(2)}\`);
  
  await browser.close();
}

async function simulateUser(browser, userId) {
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const startTime = Date.now();
  let requestCount = 0;
  const responseTimes = [];
  
  try {
    // Login
    const loginStart = Date.now();
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', \`user\${userId}@example.com\`);
    await page.fill('[data-testid="password-input"]', 'Password123!');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('/dashboard');
    responseTimes.push(Date.now() - loginStart);
    requestCount++;
    
    // Browse posts
    const browseStart = Date.now();
    await page.click('[data-testid="posts-tab"]');
    await page.waitForSelector('[data-testid="posts-list"]');
    responseTimes.push(Date.now() - browseStart);
    requestCount++;
    
    // Create post
    const createStart = Date.now();
    await page.click('[data-testid="new-post-button"]');
    await page.fill('[data-testid="title-input"]', \`Post from User \${userId}\`);
    await page.fill('[data-testid="content-input"]', 'This is a test post for load testing.');
    await page.click('[data-testid="publish-button"]');
    await page.waitForSelector('h1');
    responseTimes.push(Date.now() - createStart);
    requestCount++;
    
  } catch (error) {
    console.error(\`User \${userId} error:\`, error);
  } finally {
    await context.close();
  }
  
  const totalTime = Date.now() - startTime;
  const averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
  
  return {
    userId,
    requests: requestCount,
    totalTime,
    averageResponseTime
  };
}

// Run the load test
runLoadTest().catch(console.error);
\`\`\`
        `,
        exercises: [
          {
            id: "4-2-1",
            title: "Comprehensive Testing Suite",
            description: "Create a complete testing strategy with unit, integration, and e2e tests",
            type: "coding",
            difficulty: "hard",
            points: 45,
            startingCode: `// TODO: Implement comprehensive testing suite
// 1. Create unit tests for utility functions
// 2. Add integration tests for API endpoints
// 3. Set up e2e tests with Playwright
// 4. Add performance testing
// 5. Configure test coverage reporting

// Unit test example
describe('UserService', () => {
  // TODO: Write unit tests
});

// Integration test example
describe('Authentication API', () => {
  // TODO: Write API integration tests
});

// E2E test example
test.describe('User Registration Flow', () => {
  // TODO: Write e2e tests
});

// Performance test example
async function loadTest() {
  // TODO: Implement load testing
}

// Test configuration
// TODO: Set up Jest configuration
// TODO: Set up Playwright configuration
// TODO: Add test scripts to package.json
// TODO: Configure CI/CD for running tests`,
            hints: [
              "Use Jest for unit and integration tests",
              "Mock external dependencies properly",
              "Set up test database for integration tests",
              "Use Playwright for e2e testing",
              "Add performance benchmarks",
              "Configure test coverage thresholds"
            ]
          }
        ]
      }
    ]
  }
];

export default courseData;
