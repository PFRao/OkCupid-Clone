# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.


## User Cycles

### Users API Request Actions

* `fetchAllUsers`
  0. invoked from `UsersIndex` `componentDidMount`/`willReceiveProps`
  0. `GET /api/users` is called.
  0. `receiveAllUsers` is set as the callback.

* `createUser`
  0. invoked from `UserForm` `onClick`
  0. `POST /api/users` is called.
  0. `receiveSingleUser` is set as the callback.

* `fetchSingleUser`
  0. invoked from `UserDetail` `componentDidMount`/`willReceiveProps`
  0. `GET /api/users/:id` is called.
  0. `receiveSingleUser` is set as the callback.

* `updateUser`
  0. invoked from `UserForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveSingleUser` is set as the callback.

### Users API Response Actions

* `receiveAllUsers`
  0. invoked from an API callback.
  0. `User` store updates `_users` and emits change.

* `receiveSingleUser`
  0. invoked from an API callback.
  0. `User` store updates `_users[id]` and emits change.

### Store Listeners

* `UsersIndex` component listens to `User` store.
* `UserDetail` component listens to `User` store.


## Like Cycles

### Likes API Request Actions

* `fetchAllLikes`
  0. `GET /api/likes` is called.
  0. `receiveAllLikes` is set as the callback.

* `createLike`
  0. invoked from `UserDetail` `onClick`
  0. `POST /api/likes` is called.
  0. `receiveAllLikes` is set as the callback.

* `destroyLike`
  0. invoked from `UserDetail` `onClick` (opposite of createLike)
  0. `DELETE /api/likes/:id` is called.
  0. `removeLike` is set as the callback.

### Likes API Response Actions

* `receiveAllLikes`
  0. invoked from an API callback.
  0. `Like` store updates `_likes` and emits change.

* `removeLike`
  0. invoked from an API callback.
  0. `Like` store updates `_likes` and emits change.

### Store Listeners

* `ReceivedLikes` component listens to `Like` store.
* `SentLikes` component listens to `Like` store.
* `LikeToggle` component listens to the `Like` store.


## Visit Cycles

### Visits API Request Actions

* `fetchAllVisits`
  0. `GET /api/visits` is called.
  0. `receiveAllVisits` is set as the callback.

* `createVisit`
  0. invoked from `UserDetail` `onClick`
  0. `POST /api/visits` is called.
  0. `receiveAllVisits` is set as the callback.

* `destroyVisit`
  0. invoked from `UserDetail` `onClick` (opposite of createVisit)
  0. `DELETE /api/visits/:id` is called.
  0. `removeVisit` is set as the callback.

### Visits API Response Actions

* `receiveAllVisits`
  0. invoked from an API callback.
  0. `Visit` store updates `_visits` and emits change.

* `removeVisit`
  0. invoked from an API callback.
  0. `Visit` store updates `_visits` and emits change.

### Store Listeners

* `QuickVisitors` component listens to `Visit` store.
* `VisitorIndex` component listens to `Visit` store.
* `RecentlyVisited` component listens to `Visit` store.


## Question Cycles

### Questions API Request Actions

* `fetchOneQuestion`
  0. `GET /api/questions/:id` is called.
  0. `receiveOneQuestion` is set as the callback.

* `fetchAnsweredQuestions`
  0. `GET /api/answers` is called with a `user_id` param.
  0. `receiveAnsweredQuestions` is set as the callback.

* `answerOneQuestion`
  0. `POST /api/answers` is called with `user_id` and `question_id` params.
  0. `POST /api/users/:user_id` is called to update user's personality profile.
  0. `answerQuestion` is set as the callback.

### Questions API Response Actions

* `receiveOneQuestion`
  0. invoked from an API callback.
  0. `Question` store updates `_questions` and emits change.

* `receiveAnsweredQuestions`
  0. invoked from an API callback.
  0. `Question` store updates `_questions` and emits change.

* `answerQuestion`
  0. invoked from an API callback.
  0. `Answer` store updates `_answers` and emits change.

### Store Listeners

* `Questions` component listens to `Question` store.
* `UserAnswers` component listens to `Answer` store.
