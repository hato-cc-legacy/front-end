# # Hato front-end

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>
This is the front-end portion of the Hato project, built with React and TypeScript. It handles the user interface, interacting with various APIs, and managing state across the application. The project uses the Vite build tool.

## Structure <a name = "Structure"></a>
The front-end portion is organized into the following key directories:
- `src/api/`: Contains files for making API calls to the backend, such as fetching cards, comments, and managing session data.
- `src/components/`: Contains reusable React components such as `Card`, `CardComment`, etc.
- `src/interfaces/`: Defines TypeScript interfaces for various data types used throughout the project, ensuring type safety.
- `src/pages/`: Contains the main pages of the application such as Login, UserPage, and Index.
- `src/styles/`: Holds the global CSS files used for styling the application.

## Getting Started <a name = "getting_started"></a>
Intall [Git](https://git-scm.com) and clone this repository.

### Prerequisites

You need to install [Node.js](https://nodejs.org/en)

```
node js
```

### Installing

You need to install your server.

The step will be

```
npm install
```
```
npm run dev
```

### Environment Variables
Create .env.production file in your root      --------> (Sujin)I'm not sure about this part.
The file .env.production should contain necessary variables such as API endpoints, authentication keys, etc.

```
PORT = `<port_number>`
```

And run your server.

```
npm run express-dev
```
## Usage <a name = "usage"></a>

### API Integration
The front-end project integrates with backend APIs through files in the src/api/ directory:
- `card.tsx`: Handles operations related to cards, such as fetching and updating cards.
- `comments.tsx`: Manages comment-related API calls.
- `likes-dislikes.tsx`: Handles like/dislike operations for cards.
- `session.tsx`: Manages session-related API calls, such as login and logout.