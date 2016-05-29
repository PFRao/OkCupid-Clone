 # API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Users

- `GET /api/users`
- `POST /api/users`
- `GET /api/users/:id`

### Likes

- `GET /api/likes`
- `POST /api/likes`
- `DELETE /api/likes/:id`

### Visits

- `GET /api/visits`
- `POST /api/visits`
- `DELETE /api/visits/:id`

### Questions

- `GET /api/questions/:id`
  - called with `user_id` param

### Answers

- `GET /api/answers`
- `POST /api/users/:user_id`
  - called with `user_id` and `question_id` params
