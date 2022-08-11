[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b12a9e9bf450419a93b0ed6b775cf453)](https://app.codacy.com/gh/gaswirth/callboard?utm_source=github.com&utm_medium=referral&utm_content=gaswirth/callboard&utm_campaign=Badge_Grade_Settings)
[![DeepScan grade](https://deepscan.io/api/teams/14424/projects/21921/branches/639584/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=14424&pid=21921&bid=639584)

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
