# Agent Debate - Frontend

## Overview

The frontend is a **React** single-page application that provides an interactive user interface for the Agent Debate system. It allows users to:
- Enter any debate topic
- Watch two AI agents debate in real-time
- View the complete debate transcript
- See the final verdict from an AI judge

## Architecture

The frontend consists of modular React components:

### **App.js**
Main container component that:
- Manages global state (messages, verdict, loading, error)
- Handles the debate flow and API communication
- Orchestrates child components

### **Components**

#### **TopicInput.jsx**
- Input form for users to enter a debate topic
- Validation and submission handling
- Loading state display

#### **DebateArena.jsx**
- Displays the debate in progress
- Shows messages from both agents
- Real-time updates as the debate unfolds

#### **Verdict.jsx**
- Displays the final verdict from the judge
- Shows the complete debate summary
- Allows starting a new debate

### **api.js**
- Handles all backend API communication
- Makes requests to `/debate` endpoint
- Error handling for failed requests

## Setup

### **1. Prerequisites**
- Node.js (v16 or higher)
- npm (comes with Node.js)

### **2. Install Dependencies**
```bash
npm install
```

This installs all packages listed in `package.json`:
- React 19
- Axios (for API calls)
- React Scripts (build tools)

## Running the Application

### **Development Mode**
```bash
npm start
```

The app will open at `http://localhost:3000` with hot-reload enabled.

### **Production Build**
```bash
npm build
```

Creates an optimized build in the `build/` folder for deployment.

### **Run Tests**
```bash
npm test
```

Launches the test runner for unit tests.

## Project Structure

```
frontend/
├── public/
│   ├── index.html           # Main HTML entry point
│   ├── manifest.json        # PWA manifest
│   └── robots.txt           # SEO robots file
├── src/
│   ├── App.js              # Main app component
│   ├── api.js              # Backend API calls
│   ├── index.js            # React root
│   ├── index.css           # Global styles
│   └── components/
│       ├── TopicInput.jsx   # Topic input form
│       ├── DebateArena.jsx  # Debate display
│       └── Verdict.jsx      # Final verdict display
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Key Features

✨ **Real-time Debate Display** - Watch agents debate as it happens  
🎯 **Clean UI** - Modern, intuitive interface  
⚡ **Fast Loading** - Optimized React rendering  
🔄 **State Management** - Centralized state in App.js  
📱 **Responsive Design** - Works on desktop and mobile  

## How It Works

1. User enters a debate topic in `TopicInput`
2. Frontend sends POST request to backend `/debate` endpoint
3. Backend orchestrates the debate and returns results
4. `DebateArena` displays all debate messages
5. `Verdict` shows the final judgment
6. User can start a new debate anytime

## Technologies

- **React 19**: UI library for building components
- **JavaScript (ES6+)**: Programming language
- **Axios**: HTTP client for API requests
- **CSS3**: Styling with gradient backgrounds and animations
- **React Scripts**: Build tooling and webpack

## Environment Configuration

### **Backend URL**
By default, the frontend connects to `http://localhost:8000` (backend).

To change the backend URL, modify the `api.js` file:
```javascript
const API_URL = 'http://your-backend-url:8000';
```

### **Important**
Ensure the backend API is running before starting the frontend. The frontend will display an error if it cannot reach the backend.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs dev server on port 3000 |
| `npm build` | Creates production build |
| `npm test` | Runs unit tests |
| `npm eject` | Exposes build configuration (irreversible) |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `npm ERR! missing` | Run `npm install` to install dependencies |
| `Could not connect to backend` | Verify backend is running on port 8000 |
| `Port 3000 already in use` | Kill the process or use: `PORT=3001 npm start` |
| `Module not found` | Clear cache: `rm -rf node_modules && npm install` |

## Component Props

### **TopicInput**
```jsx
<TopicInput 
  onDebateStart={(topic) => {}}  // Called with topic when form submitted
  isLoading={false}               // Disables input during debate
/>
```

### **DebateArena**
```jsx
<DebateArena 
  messages={[]}      // Array of debate messages
  isLoading={false}  // Shows loading state
/>
```

### **Verdict**
```jsx
<Verdict 
  verdict=""           // Final verdict text
  onNewBattle={() => {}}  // Called when user wants new debate
/>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The frontend uses Axios for API requests
- Error messages are displayed to the user if the backend is unavailable
- Component styling uses inline CSS for simplicity
- The app is a single-page application (SPA) with client-side routing

---

For backend setup, see [../backend/README.md](../backend/README.md)
