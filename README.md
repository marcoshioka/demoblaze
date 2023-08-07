# DEMOBLAZE
### README
Test Automation repository with Javascript (Node.js) and Cypress for Demoblaze.

### Basic framework:
Node.js and Cypress.

### Project structure:
The tests are in "cypress/e2e"
Execution videos are created after running each feature in the directory "cypress/videos"
It was created a .gitignore file to not push prints and videos to repository, included "node_modules" folder.

### Configuration:
* Clone this repository;
* You must have Node.js installed in your local machine;
* After that, install the dependencies running this command in the root:
```sh
 npm install
 ```
 PS: Maybe you'll need to run Cypress commands in a first attempt to install everything. See the examples below.


### How to run the tests:
**To run all features and scenarios using Cypress in headless mode (with Electron), the command is:**
```sh
./node_modules/.bin/cypress run
```
or
```sh
npx cypress run
```
**To open tests and select spec files to run using Cypress app, the command is:**
```sh
./node_modules/.bin/cypress open
```
or
```sh
npx cypress open
```
**To execute all features and scenarios using Chrome (if installed), the command is:**
```sh
./node_modules/.bin/cypress run --browser chrome
```
or
```sh
npx cypress run --browser chrome
```

Version information:
1.0.0: first version
Author:
Marcos Ribeiro Hioka
contact: marcosribeirohioka@gmail.com