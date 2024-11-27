# Nighthawk

This web development project consists of a React client built with Vite and an Express server that interacts with MongoDB.

## Server

The server runs on top of Node.js and uses Express.js to provide basic functionality. Mongoose is used to simplify interactions with MongoDB.

- bin - HTTP server configuration
- api - REST API and routing
- controllers - business logic (here just basic database interactions: creating, reading, updating, deleting)
- models - the data model and schema

## Client 

The frontend uses React Router to provide client-side navigation and is built on top of Vite. It uses Fetch to interact with the backend through the REST API.

- src - the main components
- src/assets - static content
- src/component - the child components

