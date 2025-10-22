# Anonymous Message Board

This project is a completed implementation of the FreeCodeCamp Information Security Anonymous Message Board.

## Features
- Create threads on named boards
- Post replies to threads
- Report and delete threads/replies using project-specified API
- Includes functional tests compatible with freeCodeCamp testing harness

## Installation
1. Install dependencies:
    ```bash
    npm install
    ```
2. Create a `.env` file in the project root (optional for local development). At minimum you can provide a MongoDB connection string:
    ```text
    DB_CONNECTION_URI=mongodb://localhost:27017/anonymous-message-board
    PORT=3000
    NODE_ENV=development
    ```

## Run
Start the server:
```bash
npm start
```
By default the app listens on port 3000. Visit http://localhost:3000 to view the sample UI.

## Testing
When `NODE_ENV` is set to `test` the included test runner will run the functional tests automatically. You can run the tests with a command like:
```bash
NODE_ENV=test npm start
```
Or run your test framework directly if preferred (mocha is included in dev dependencies).

## API Endpoints
Use these endpoints for programmatic access (as required by the FreeCodeCamp tests):

- Threads (replace `:board` with the board name):
	- `POST /api/threads/:board` - create a new thread
	- `GET  /api/threads/:board` - view recent threads
	- `DELETE /api/threads/:board` - delete a thread (requires delete password)
	- `PUT /api/threads/:board` - report a thread

- Replies (replace `:board` with the board name):
	- `POST /api/replies/:board` - create a reply on a thread
	- `GET  /api/replies/:board` - view a single thread with all replies
	- `DELETE /api/replies/:board` - delete a reply (requires delete password)
	- `PUT /api/replies/:board` - report a reply

## Notes
- The app uses MongoDB for persistence.
- The project includes `helmet` middleware configured for common security headers.
