# simplestaking

This project is part of the hiring process.

# What you need to run the project

- Node.js (the project was built against v13.11.0)
- Git
- Internet connection
- A valid Tezo user token (you can copy this one and paste on the input: `tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo`)

# How you can run the project

- From the command line interface, switch to `stats-table-exercise` directory:
  - run `npm install`
  - run `npm start`
  - navigate to `localhost:4200`
  - paste the a valid user token in the input (you can use this one `tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo`)

# e2e tests

Instead of protractor, we are using cypress for the e2e tests. There's just four of them writen and
you can run them by typing, in the command line: `npm run cypress:run`

(If you know the basics of Cypress.io, you can also type `npm run cypress:open` and want to have fun
seeing the project being used by cypress as it would be used by a real person).

There's only one spec file inside the directory `cypress/integration/stats-table`, under the
project's root directory.

# Unit Tests

Concerning the unit tests, as the description of the exercice stated, I've just write a few tests,
focused on the component tests, which I think is usually the most painfull test. I've write some
tests for a container component (`stats-table-container.component.spec.ts`) and for a presentation
one (`chip.component.spec.ts`). I've sticked to Karma in this case.

To run the unit tests, just type `npm test` in the command line

# How this project is organized

Inside the project's root directory, if you navigate to `src/app`, you'll find two important
folders: `data-access` and `views`.

## `data-access` directory

This folder contains the following subfolders:
  - models: Most interfaces used in the project are inside this folder
  - api: The service that access txstats.com api is located here
  - store: all @ngrx files are here

## `views` directory

This folder contains all the components, modules, directives and pipes in 2 important subfolders:
  - container: All the components that actively interacts with the backend and the state, are here
  - presentation: The components dedicated to show information to the user are here. No components
    in this folder access directly the internet or the application state

# Design pattern

Additionally to the demmanded state management solution, requested by the exercise description, I've
also adopted a container-presentation architecture together with `OnPush` strategy. This combination
is the best, in my opinion, to optimize the performance of the project. Also, I've used a Façade
pattern wheneve possible to isolate the dependencies of the component in a service. With this
approach I also simplify the component testing as there is fewer things to mock injected the
component (in normal situations, you just inject the façade in the component).

# Virtual Scrolling

As requested in the description of the exercise, I'm using `<cdk-virtual-scroll-viewport>` like a
`infinite scroll`. So new data is loaded from the server (and saved to the store) as long as you
scroll up and down through the table rows. The data that comes from the server is added to the data
that was alread grabed in previous requests, in a cummulative way.

Notice that there's no need to click on any button in order to request data. You only have to type
in a valid user token on the input on the top of the page.

# What was hard to do

Understanding the data at tzstats.com. As I'm not familiar with cryptocurrency terms and jargons,
I've spent more than 1 day reading and researching to get some very basic knowlegde about this
subject so I could minimally work with the data and accomplish the task. So, I think I spent 60% of
the time reading about Tezos and cryptocurrencys and 40% of the time actually building the
application (which is a simple one).

One concept is still missing to me: the pending status. I got, from what I read in the description,
that I should stick to the `transaction` type in the operations table. And I couldn't find a
reliable way to find out when and how I could extract that "Pending" information that should be used
in one of the label chips in the first column in the example image.
