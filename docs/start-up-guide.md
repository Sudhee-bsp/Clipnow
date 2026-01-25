# ClipNow - Startup Guide

## Prerequisites

- **Node.js**: v17.0.0 or higher
- **npm**: v8.0.0 or higher

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Sudhee-bsp/Clipnow.git
cd Clipnow
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

> **Note**: The `--legacy-peer-deps` flag is required due to peer dependency conflicts with older packages.

### 3. Configure Environment Variables

Copy the example environment file and add your Firebase credentials:

```bash
cp .env.example .env
```

Edit `.env` with your Firebase project configuration:

```
REACT_APP_API_KEY=your_api_key
REACT_APP_AUTHDOMAIN=your-project.firebaseapp.com
REACT_APP_DATABASE_URL=https://your-project.firebaseio.com
REACT_APP_PROJECT_ID=your-project-id
REACT_APP_STORAGEBUCKET=your-project.appspot.com
REACT_APP_MSG_SENDER_ID=your_sender_id
REACT_APP_ID=your_app_id
REACT_APP_MEASUREMENT_ID=your_measurement_id
```

### 4. Start the Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run development server |
| `npm run build` | Create production build |
| `npm test` | Run tests |

## Troubleshooting

### Peer Dependency Errors

If you see peer dependency conflicts during installation:

```bash
npm install --legacy-peer-deps
```

### Port Already in Use

If port 3000 is busy, either:
- Stop the existing process, or
- Let React prompt you to use a different port

### Firebase Configuration Errors

If you see "Missing App configuration value" errors:
- Ensure `.env` file exists with all required values
- Restart the dev server after updating `.env`
