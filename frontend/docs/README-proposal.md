# FresherNote

[Heroku link][heroku] **NB:** TBD

[heroku]: http://okpeter.herokuapp.com

## Minimum Viable Product

FresherNote is a web application inspired by Evernote that will be build using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

OkPeter is a web application inspired by OkCupid that will be built using Ruby on Rails and ReactJS. BY the end of the initial development cycle, this app will have the following features, as well as (hopefully) many, many more!

- [ ] New account creation, login, and guest login
- [ ] The minimally necessary features for an OkCupid-inspired site. These features include, but are not limited to: the ability to answer questions about oneself, having those answers used to make an initial assessment of compatibility, and the ability to send messages to each other
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] Hosting on Heroku
- [ ] CSS styling that is clear, concise, and visually appealing
- [ ] A production README, replacing this README (**NB**: check out the [sample production README](https://github.com/appacademy/sample-project-proposal/blob/master/docs/production_readme.md) -- you'll write this later)

## Product Goals and Priorities

FresherNote will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account (MVP)
- [ ] Log in / Log out, including as a guest (MVP)
- [ ] Create, read, edit, and delete users (MVP)
- [ ] Answer personality questions and have the answers influence thy matches (MVP)
- [ ] Allow users to search for each other by preferences (smoker/drinker status, interests, etc.)
- [ ] A Tinder-esque "Quickmatch" feature

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Notes Model, API, and basic APIUtil (1.5 days)

**Objective:** Users can be created, read, and edited through
the API.

- [ ] seed the database with a small amount of test data (all named Peter, of course)
- [ ] CRUD API for users (`UsersController`)
- [ ] jBuilder views for users
- [ ] setup Webpack & Flux scaffold
- [ ] setup `ApiUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Questions can be created, read, and answered with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router (!)
- implement each note component, building out the flux loop as needed.
  - [ ] `UsersIndex`
  - [ ] `UserIndexItem`
  - [ ] `UserForm`
- [ ] Cancel and log out if a form is left idle for too long.

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Questions (1 day)

**Objective:** Notes belong to Notebooks, and can be viewed by notebook.

- [ ] create `Question` model
- [ ] create `Answer` model
- build out API, Flux loop, and components for:
  - [ ] Question CRUD (Just C and R, really)
  - [ ] Answer CRUD
  - [ ] Answering questions updates user personality profile
  - [ ] Allow viewing questions by category
- Use CSS to style new views

### Phase 6: Likes (1.5 days)

**Objective:** Notes can be tagged with multiple tags, and tags are searchable.

- [ ] create `Likes` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching likes for `Like` view
  - [ ] adding likes
  - [ ] searching likes by username
- [ ] Style new elements

### Phase 7: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)

<!-- [phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md -->
