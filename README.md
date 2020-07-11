# Stats Table

I tried to keep this project as simple as possible, without jeopardizing its scallability. By saying
that, I mean that, even if this is a simple project, I applied what I consider to be the best
practices for small to medium size projects. For large projects, I'd suggest adopting the 
structure recommended by http://nrwl.io 's `Nx`.

# See it running on Stackblitz.com

If you don't want to compile the project below in your own machine, you can see it running on 
https://juliano-simplestaking.stackblitz.io (just copy and paste this accound address on the input:
tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo)

Also, if you want to play with the code on Stackbliz, you can do it here: 
https://stackblitz.com/edit/juliano-simplestaking

# What you need to run the project

- Node.js (the project was built against v13.11.0)
- Git
- Internet connection
- A valid Tezo account address 
  - You can copy this one and paste on the input: `tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo`

# How you can run the project

- From the command line interface, switch to `stats-table-exercise` directory:
  - run `npm install`
  - run `npm start`
  - navigate to `localhost:4200`
  - paste the a valid user address in the input
    - You can use this one `tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo`

# e2e tests

Instead of protractor, we are using cypress for the e2e tests. There's just four of them writen and
you can run them by typing, in the command line: `npm run cypress:run`

(If you know the basics of Cypress.io, you can also type `npm run cypress:open` to have some fun
seeing the project being used by cypress as it would be used by a real person).

There's only one spec file inside the directory `cypress/integration/stats-table`, under the
project's root directory.

# Unit Tests

Concerning the unit tests, as the description of the exercice stated, I've just writen a few tests,
focused on the component tests, which I think are usually the most painfull tests to write. So I've 
writen some tests for a container component (`stats-table-container.component.spec.ts`) and for a 
presentation one (`chip.component.spec.ts`). I've sticked to Karma in this case.

To run the unit tests, just type `npm test` in the command line

# How this project is organized

Inside the project's root directory, if you navigate to `src/app`, you'll find two important
folders: `data-access` and `views`.

## `data-access` directory

This folder contains the following subfolders:

- models: Most interfaces used in the project are inside this folder
- api: The service that access tzstats.com api is located here
- store: all `@ngrx` files are here

## `views` directory

This folder contains all the components, modules, directives and pipes in 2 important subfolders:

- container: All the components that actively interacts with the backend and the state, are here
- presentation: The components dedicated to show information to the user are here. No components
  in this folder access directly the internet or the application state

# Design pattern

Additionally to the demmanded state management solution, requested in the exercise description, I've
also adopted a container-presentation architecture together with `OnPush` strategy. This combination
is the best, in my opinion, to optimize the performance of the project. Also, I've used a Façade
pattern whenever possible to encapsulate all the dependencies of the component in a single service. 
This approach also simplifies the component testing as there are fewer things to mock injected into 
the component (in normal situations, you just inject the façade in the component).

# Virtual Scrolling

As requested in the description of the exercise, I'm using `<cdk-virtual-scroll-viewport>` to achieve an
`infinite scrolling` effect. So new data is loaded from the server (and saved to the store) as you
scroll up and down through the table rows. The data that comes from the server is added to the data
that was already in the store as a side effect of previous sequence of requests related to the same 
user account address, in a cummulative way. The statistics data in the store is completely erased whenever 
you switch the account address in the input for another one. I'm not saving any data to `localStorage`
or any client database, so all the state data will be lost if you refresh the page.

Notice that there's no need to click on any button in order to request data. You only have to type
in a valid user account address on the input on the top of the page.

# A11y

I've chosen not to add aria attributes to the templates for two reasons: (a) it wasn's asked to
and, (b) it won't add any information regarding my knowledge of angular.

# What was hard to do

Understanding the data and terminology at http://tzstats.com was the biggest issue for me. As I'm
not currently a cryptocurrency user, I'm aware that I've learned just the basics so I could minimally
work with the data and accomplish the task. As a consequence you'll likely find mistakes on the business 
rules that calculate the final balance for each operation row in the table. That's expected. Despite of that,
the technology (`@angular`, `@angular/material`, `@ngrx`) part is fully working and the components are
distributed in the project following a robust and flexible architecture though.

The final balance is that I've spent 60% of the time reading about Tezos and cryptocurrencies and 40% of
the time actually building the application.

One concept is still missing to me and called my attention: the pending status. I've got, from what I've read
in the description, that I should stick to the `transaction` type in the operations table. And I couldn't 
find a reliable way to find out when and how I could extract that "Pending" information that appears
in one of the label chips in the example image (in the first column).

Another thing I haven't gotten is related to the fees. I'm always adding the fee to the volume.
After that, I'm considering that if the user is a sender, the value is negative, otherwise it's
positive. This is something that makes sense for me (sending money = negative; receiving
money = positive), but in the example image there's a case of a `sent` which is positive. I couldn't
figure out what situation could get to that result.
