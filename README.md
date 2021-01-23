# The Official Website for ALEX on Science: alexonscience.com

This repository contains the source code for
[alexonscience.com](alexonscience.com),
the official website for the
[ALEX on Science YouTube channel](https://www.youtube.com/channel/UCaV0jdBmPzgBk6AYweICoMA),
as well as Alexander Wu's personal website. The YouTube channel can also be found at
[tinyurl.com/alexonscience](https://tinyurl.com/alexonscience).

## Set Up

To start development, clone/fork this repository locally. Optional: Then create a new branch
called `deployed` with `git branch deployed`. This branch will keep track of what you have
deployed.

## Development

To start a local server, run `npm start`.

To run tests, run `npm test`.

To check code style, run `npm run lint`. This checks formatting and other lint issues. To fix
all code style, run `npm run fix`. If you wish to only check formatting issues, run
`npx prettier -c .` To fix formatting issues, run `npx prettier -w .`. To only check eslint,
run `eslint .`. To only fix eslint, run `eslint --fix .`.

To deploy local changes to website, run `npm run deploy`. Optional: Assuming you are currently
on the `master` branch, make sure you have no uncommitted chagnes, and run `npm run track` to
track update the `deployed` branch.

Make sure to commit to `origin` after deployment.
