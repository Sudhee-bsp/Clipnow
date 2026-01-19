# ClipNow - Technical Documentation

## Overview

**ClipNow** is a personal cloud clipboard application that lets users share text and files across devices using unique "Clip IDs".

## Architecture

| Layer | Technology |
|-------|------------|
| **Frontend** | React 17 + React Router v6 |
| **UI Framework** | MDB React UI Kit (Bootstrap-based) |
| **Backend/Database** | Firebase Realtime Database |
| **File Storage** | Firebase Cloud Storage |
| **Styling** | Sass, styled-components, CSS |

## Project Structure

```
src/
├── App.js                    # Main app with routing
├── firebaseconfig.js         # Firebase initialization
├── components/
│   ├── board.jsx            # Home page - Create Clip ID
│   ├── temp.jsx             # Clip page - View/Edit/Delete clips
│   ├── navbar.jsx           # Navigation with dark mode toggle
│   ├── footer.jsx           # Footer component
│   ├── about.jsx            # About page with clip count
│   └── theme/               # Dark mode theming
├── ImageUpload/
│   └── newindex.js          # File upload/download functionality
└── file-upload/             # File upload component
```

## Core Features

### 1. Home Page (`board.jsx`)
- User enters a unique alphanumeric **Clip ID**
- Navigates to `/{clipid}` when submitted

### 2. Clip Page (`temp.jsx`)
- **Create**: New clips are saved to Firebase Realtime DB at `/Tempusers/{clipid}`
- **Read**: Real-time sync with Firebase `onValue()` listener
- **Update**: Edit message content with live updates
- **Delete**: Remove clip and redirect to home
- **URL Detection**: Auto-extracts URLs from text using `url-knife`
- **Copy to Clipboard**: One-click copy of message content
- **Toast Notifications**: Using `toastify-js`

### 3. File Attachments (`ImageUpload/newindex.js`)
- Upload files to Firebase Storage
- Supports: images, PDFs, docs, spreadsheets, code files, ZIP, etc.
- Custom file type icons for non-image files
- Download and delete attachments
- Progress bar during upload
- Files stored at `/TempusersTest/{clipid}/attachments`

### 4. Dark Mode (`theme/darkmode`)
- Toggle dark/light theme
- Persisted in `localStorage` as `clipDarkMode`

### 5. About Page (`about.jsx`)
- Shows total number of clips created (live count from Firebase)

## Firebase Database Structure

```
/Tempusers/{clipid}
├── clipid: string
├── message: string
├── status: "created" | "deleted"
├── toastInfo: "just_created" | "just_updated"
└── time: string (formatted date)

/TempusersTest/{clipid}
└── attachments: [url1, url2, "no_file", ...]
```

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `firebase` | Backend services |
| `react-router-dom` | Client-side routing |
| `mdb-react-ui-kit` | UI components |
| `moment` | Date formatting |
| `linkify-react` | URL linkification |
| `url-knife` | URL extraction from text |
| `toastify-js` | Toast notifications |
| `use-dark-mode` | Dark mode hook |
| `styled-components` | CSS-in-JS styling |

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Board` | Home page to create Clip ID |
| `/:id` | `Temp` | View/edit clip by ID |
| `/about` | `About` | About page |
