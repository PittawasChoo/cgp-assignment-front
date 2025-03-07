# CGP Thailand Assignment: Webboard mini project
CGP Thailand Assignment: Webboard mini project developed with nextjs

## Pre-requisites
- Install [Node.js](https://nodejs.org/en/)

# Getting started
- Clone the repository
```
git clone https://github.com/PittawasChoo/cgp-assignment-front.git
```
- Download credential folder that will be attached in the hand in email 
- In credential-files/cgp-assignment-front, There is a credential file for this repository in there. Bring them in the repository folder that cloned from first step
- If you cannot see .env file in the that folder in mac, try cmd + shft + . to show all hidden files
- Install dependencies
```
cd cgp-assignment-front
npm install
```
- Run the project
```
npm run dev
```
- Once the log show "Ready", the front-end is ready to use. You can check it out by open : http://localhost:3000 in browser

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules** | Contains all npm dependencies. |
| **.next** | Contains compiled files after running next build |
| **public** | Contains images and other static files |
| **src** | Contains source code that will be compiled. |
| **src/app** | Contains pages available in this project |
| **src/components**| Contains shared component used in this project |
| **src/constants**| Contains constants variable used in this project |
| **src/context**| Contains context provider files |
| **src/utils**| Contains utility functions |
| **src/app**/main.ts | Landing page |
| .env | Contains all secret configurations |
| package.json | Contains npm dependencies |

## Dependencies

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| bootstrap | Used for apply styles by set specific classname to element we want to apply styles |
| formik | Used for handle form (submit, error handling, etc.) |
| jwt-decode | Used for decoding jwtt from backend and bring username that signed in jwt to use in front-end side |
| pluralize | Used for handling plural words |
| react-bootstrap | Contains useful components ex. Modal, etc. |
| yup | Used for validate form value before submit |

