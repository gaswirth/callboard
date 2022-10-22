[![DeepScan grade](https://deepscan.io/api/teams/14424/projects/21921/branches/639584/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=14424&pid=21921&bid=639584)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/6266d1f2f8004ace9c6fbf69b9859247)](https://www.codacy.com/gh/gaswirth/callboard/dashboard?utm_source=github.com&utm_medium=referral&utm_content=gaswirth/callboard&utm_campaign=Badge_Grade)
[![Known Vulnerabilities](https://snyk.io/test/github/gaswirth/callboard/badge.svg)](https://snyk.io/test/github/gaswirth/callboard)

# Callboard

## A web app for contactless cast/performer sign-in for performing arts companies.

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
