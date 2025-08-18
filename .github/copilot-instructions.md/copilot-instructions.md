# Copilot Instructions for aybee-backend

## Project Overview
- This is a Node.js backend using Express, MongoDB (via Mongoose), and JWT authentication.
- The main entry point is `src/index.js`, which loads environment variables, connects to MongoDB, and starts the Express server.
- Environment variables are managed via `.env` (see `.env.sample` for required keys).

## Key Components
- `src/app.js`: Configures Express app, middleware (CORS, JSON, static files, cookies).
- `src/db/index.js`: Handles MongoDB connection using Mongoose. Uses `DB_NAME` from `src/constants.js`.
- `src/models/`: Contains Mongoose models for `User` and `Video`. User model includes password hashing, JWT token generation, and methods for authentication.
- `src/utils/`: Contains utility classes for API error handling, async handler, and Cloudinary integration.

## Developer Workflows
- **Start in dev mode:** `npm run dev` (uses nodemon, loads env vars, runs `src/index.js`)
- **Environment:** Ensure `.env` is present and matches `.env.sample`.
- **Dependencies:** Install with `npm install`.

## Project Conventions
- Uses ES modules (`import`/`export`), not CommonJS.
- All environment variables are loaded at startup; update `.env.sample` if new ones are added.
- Models are defined with Mongoose and exported as named exports.
- JWT secrets and expiry are managed via env vars.
- User passwords are hashed with bcrypt before saving.
- Video model uses `mongoose-aggregate-paginate-v2` plugin for aggregation queries.

## Integration Points
- Cloudinary is used for file storage (see `src/utils/cloudinary.js`).
- CORS is configured via env var `CORS_ORIGIN`.
- MongoDB URI and DB name are set via env and `src/constants.js`.

## Example Patterns
- To add a new model, follow the structure in `src/models/user.model.js`.
- To add middleware, register it in `src/app.js`.
- To add a new route/controller, create files in `src/routes/` and `src/controllers/` and register in `src/app.js` (currently empty, but this is the convention).

## References
- See `readme.md` for a high-level project description.
- See `.env.sample` for required environment variables.
- See `package.json` for scripts and dependencies.

---

If you add new conventions or workflows, update this file to help future AI agents and developers.
