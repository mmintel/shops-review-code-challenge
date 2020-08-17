# Frontend-Challenge Solution

## Tasks

### Setup

- [x] Setup a project environment using your preferred SPA framework (e.g. Angular, React, Vue)

### Reviews

- [x] Call the Reviews API and display the list of reviews in any way you like. Use the shop id (tsId) `X6A4AACCD2C75E430381B2E1C4CLASSIC`. Please display: `mark`, `comment`, `creationDate`
- [x] Sort the page of reviews by `creationDate` descending
- [x] Add a different style to every second review e.g. change text color or background color
- [x] Add a control to toggle the highlighting - highlight odd reviews instead of even reviews on toggle

#### Relevance Score

- [x] Introduce a review relevance score
- [x] Allow the user to switch from "Order by Mark descending" to "Order by relevance score descending"

##### Calculate a review relevance score based on the following rules

- [x] 1 Point is added per character of the review, excluding spaces, tab and line breaks – up to 100 points
- [x] 50 Points for a full user profile (`firstname` and `lastname` are existing) - e.g. "Hermann Meier"
- [x] 25 Points (instead of 50) for a partial profile. `firstname` or `lastname` are one alphabetical character only, e.g. "Hermann M" or "H. M."

### Search Page

- [x] Create a search page, users should be able to search for a shop. The results are provided by the Shop Search API. Display `name` and `overallMark`
- [x] Add three review texts (found in comment) provided by the Reviews API for each search result - use the most relevant ones if you can
- [x] Allow the user to view the list of reviews for a specific shop
- [ ] Implement pagination of search results, relevant metadata can be found in the Shop Search API response

### Mark

- [ ] Display mark and overallMark by using stars (0 - 5 full stars)
- [ ] Use the provided Star Images and design spec
- [ ] Extend the star display to also show "half filled stars"

## Possible Improvements

- add logging and capture exceptions (e.g. with Sentry)
- don't use inline styles (prefer CSS-in-JS)
- break down components even more
- add more unit tests (I only added some for the most critical parts considering time)
- add e2e tests (cypress)
- create `Mark` with a class to ensure consistent formatting (used in multiple places)
- move hardcoded API URLs to env variables
- save state of search in URL bar

## Technical Information

### Requirements

- `yarn` (> 1.22.0)
- `node` (> 13.9.0)

### Installation

- `yarn` to install dependencies

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
