[LoLCupid live][heroku]
[heroku]: http://okpeter.herokuapp.com

LoLCupid is a full-stack web application inspired by OkCupid. It utilizes Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Flux architectural framework on the frontend.

## Features & Implementation

### Single-Page App

LoLCupid is a single page dating app. All of its content is delivered through one element on a single page. The root page and all other pages listen to a `SessionStore`, which reveals the current user to the app by means of the function `SessionStore.currentUser()`. The user that is returned by said function determines the content that will render on the page.

### Matching

Matching is arguably the crux of the LoLCupid experience. Displaying users are all well and good, but an individual user cannot be expected to carefully screen each and every user on the site.

The solution, just like on the real OkCupid, is to offer a sort of "pre-screening" process. LoLCupid accomplishes this by allowing users to answer personality questions, which will then be used to create a list of potentially good matches as a starting point for the user to look at (again, much like OkCupid itself). Where this differs from OkCupid is that, rather than compare users on a question to question basis, LoLCupid creates two personalty profiles for each user: one for themselves, and one for their ideal match. These profiles assign each user values in categories such as optimism, outgoingness, religousness, etc., based on how they answered the given questions.

The personality profile takes the form of a hash. For a newly-registered user, all values start at 0.

```ruby

  {you: {
    active: 0,
    outdoorsy: 0,
    outgoing: 0,
    sports: 0,
    pop_culture: 0,
    conservative: 0,
    rebellious: 0,
    optimistic: 0,
    traditional: 0,
    organized: 0,
    religious: 0
  }, them: {
    active: 0,
    outdoorsy: 0,
    outgoing: 0,
    sports: 0,
    pop_culture: 0,
    conservative: 0,
    rebellious: 0,
    optimistic: 0,
    traditional: 0,
    organized: 0,
    religious: 0
  }}

```

One might question the validity of matching based on an overall profile rather than specific responses. While it's true that the method employed by LoLCupid misses out on extreme corner case dealbreakers ("I will not date someone who enjoys Guy Ritchie movies, ever. Period."), the trade off is that it avoids the classical "not enough responses"/"my answer isn't here" problem that is endemic to all multiple choice personality assessments. The problem on OkCupid is alleviated somewhat by the explaination feature, but that only works if the users read all of each other's respective responses; the additional response is not accounted for the in the matching algorithm itself, which is the most important part.

### Direct Messaging

The other core part of any dating website is, of course, the ability to contact users that one is interested in. On LoLCupid, we've kept it very simple. By visiting another person's profile, a user can start a conversation by clicking the appropriate button on the profile page. From there on out, the conversation takes place on a separate messages page, which displays messages from both sides in chronological order with timestamps. When reviewing the message index (MessagesIndex component), The user is treated to a list of all conversations, along with a timestamp and preview of the last sent/received message.

The messaging portion of the LoLCupid is structured in two main parts: the messages themselves, and the conversations they belong to. This aids greatly in organization, since it allows us to gather all correspondences between two users in one spot. Furthermore, this aids greatly in simplifying how the information is queried by the app itself. Rather than having to gather all messages from all users that have spoken to the current user, we can simply search for associated conversations and, from there, search for associated messages.

## Future Directions for the Project

In addition to the features already implemented, I plan to continue work on this project.  The next steps for LoLCupid are outlined below.

### Search

Searching users is a standard feature of Evernote.  I plan to utilize the Fuse.js library to create a fuzzy search of users and, in particular, matches.  This search will allow filters for age, preferences, match percentage, etc.  
