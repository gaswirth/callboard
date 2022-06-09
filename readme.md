# Callboard

## A web app for contactless employee sign-in with a dedicated management interface.

This monorepo holds the backend and frontend components for a complete installation.

## Basics

---

- Backend: WordPress (headless)
- Frontend: React (`create-react-app`)
- PHP: 7.4+

## Setup

---

### Frontend:

- Extract the contents of `backend/wp-contents/` to your WP install.
- Run `yarn install` in the `frontend/` directory, and `yarn start` to start developing.

### Backend:

- Copy the contents of `backend/wp-content` to a WordPress installation _(for now)_.

## Dreams

---

- Socket.io (or some such) for live udpating
- Passwordless user logins for seamless on-site sign-ins.
- Emergency offline functionality
- Dreeeeeeams....
