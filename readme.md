[![DeepScan grade](https://deepscan.io/api/teams/14424/projects/21921/branches/639584/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=14424&pid=21921&bid=639584)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/6266d1f2f8004ace9c6fbf69b9859247)](https://www.codacy.com/gh/gaswirth/callboard/dashboard?utm_source=github.com&utm_medium=referral&utm_content=gaswirth/callboard&utm_campaign=Badge_Grade)

# Callboard

Callboard is a web app in development whose aim is to simply and easily replace the ubiquitous pen-and-paper callboard that's found at stage doors all around the world. Stage Management can replace the traditional paper sign-in sheet with a QR code, which company members scan with their mobile devices. The company member is logged in automatically, and shown a realtime sign-in sheet, just like they would be able to see on a physical, paper sign-in sheet. Stage and Company Managers can set show rosters, create, edit, and delete users ("Company Members"), send password resets (users will log in once, and will remain logged in -- facilitating the one-scan sign-in -- until they get a new device, clear cookies, etc), manually change attendance, and set vacation and personal days for individual company members. Company members can be placed on an Active or Inactive roster (think: subs! vacation swings! emergency covers called back to the show after they haven't performed in it for 2 years on Christmas Day because of a COVID outbreak!).

This monorepo holds the backend and frontend components for a complete installation.

This readme is sad and will be helped soon.

## Requirements

---

- Backend: WordPress with PHP > 8.0.

## Setup

---

### Backend instructions:

- Copy the contents of `backend/wp-content` to a WordPress installation _(for now)_. Visit the Callboard settings page from the WP Dashboard to set your frontend URL.

### Frontend development:

- Run `yarn install` in the `frontend/` directory, and `yarn start` to start developing.

### TODO

- Integrate user-specified frontend URL automatically into necessary GraphQL CORS headers.
- Improve this sad lil' readme
