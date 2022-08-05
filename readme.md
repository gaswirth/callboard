# Callboard

## A web app for contactless employee sign-in with a management interface.

This monorepo holds the backend and frontend components for a complete installation.

## Basics

---

- Backend: WordPress (headless)
- Frontend: React (`create-react-app`)
- PHP: 7.4+

## Setup

---

### Backend:

- Copy the contents of `backend/wp-content` to a WordPress installation _(for now)_. Currently, the backend is looking for a WP install at `http://localhost/backend`, which will ultimately not be hard coded.

### Frontend:

- Run `yarn install` in the `frontend/` directory, and `yarn start` to start developing.

## Dreams

---

- Passwordless user logins for seamless on-site sign-ins.
- Emergency offline functionality (attendance import?)
- Dreeeeeeams....
