# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
birthdate       | datetime  | not null
password_digest | string    | not null
preferences     | string    | not null
personality     | string    | not null, indexed
location        | string    | not null
last_online     | datetime  | not null
looking_for     | string    | not null
session_token   | string    | not null, indexed, unique

<!--
  preferences, personality, and looking_for will be hashes storing user settings
-->

## questions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
description | string    | not null
answers     | string    | not null
categories  | array     | not null
weight      | array     | not null
multiple    | boolean   | not null, default: false

## answers
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
question_id | integer   | not null, foreign key (references questions), indexed
answer      | integer   | not null
preferred   | integer   | not null
weight      | integer   | not null
public      | boolean   | not null, default: true

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
liker_id    | integer   | not null
likee_id    | integer   | not null

## visits
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
visitor_id  | integer   | not null
visitee_id  | integer   | not null
