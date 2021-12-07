# The Official Website for ALEX on Science: alexonscience.com

This repository contains the source code for
[alexonscience.com](alexonscience.com),
the official website for the
[ALEX on Science YouTube channel](https://www.youtube.com/channel/UCaV0jdBmPzgBk6AYweICoMA),
as well as Alexander Wu's personal website. The YouTube channel can also be found at
[tinyurl.com/alexonscience](https://tinyurl.com/alexonscience).

## Set Up

To start development, clone/fork this repository locally. Then run `npm install` to install all dependencies.

Optional: Then create a new branch called `deployed` with `git branch deployed`. This branch will 
keep track of what you havedeployed.

## Development

To start a local server, run `npm start`.

To run tests, run `npm test`.

To check code style, run `npm run lint`. This checks formatting and other lint issues. To fix
all code style, run `npm run fix`. If you wish to only check formatting issues, run
`npx prettier -c .` To fix formatting issues, run `npx prettier -w .`. To only check eslint,
run `eslint .`. To only fix eslint, run `eslint --fix .`.

If you added new routes, or changed any meta tags, run `npm run prerender` from the root
directory (outside of `src/` or `public/`) to prerender the views to `public/`. If you removed
any routes, you can manually delete them from `public/`.

To deploy local changes to website, run `npm run deploy`. Optional: Assuming you are currently
on the `master` branch, make sure you have no uncommitted chagnes, and run `npm run track` to
track your deployment with the `deployed` branch.

Make sure to commit and push to `origin` after deployment.

## Architecture

This website is written in React, and in particular was created with `create-react-app`. The
sources are in `src/components/`, styles in `src/styles/`, and tests in `src/tests/`. The root
page is `src/components/App.js`, which renders the top banner, navigation bar, content, and
footer.

The tests are mainly snapshot tests with Jest. For code style I use Prettier for formatting
and ESLint for other issues.

This is a single page application with `react-router-dom`.
I added some self-invented prerendering using a Node script in `src/scripts/prerender.js`.
This script writes meta tags along with a redirect script into an `index.js` file in the
`public/` directory. Unfortunately I couldn't get CommonJS to work with ES6, so the
prerendering script's data (`src/scripts/all_views_meta.json`) is duplicated from the data used in the main app (`src/components/subcomponents/AllViews.js`). Every time
a view is added, or meta tags are changed, both of these sources need to be updated.
