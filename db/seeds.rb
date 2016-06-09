# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(
  username: "guest",
  password: "fzfgT76Kjh0",
  location: "10001",
  birthdate: Date.new,
  gender: "man",
  last_online: Date.new,
  personality: { you: {
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
  } }.to_json,
)

Profile.create!(user_id: 1)

# create_table "questions", force: :cascade do |t|
#   t.string   "description",                 null: false
#   t.boolean  "multiple",    default: false, null: false
#   t.datetime "created_at",                  null: false
#   t.datetime "updated_at",                  null: false
# end

Question.create!(
  description: "How often do you like to go out on the weekends?",
)

Question.create!(
  description: "How often do you attend live sporting events?",
)

Question.create!(
  description: "Do you like to go out to the pictures?",
)

Question.create!(
  description: "How often do you ponder the inevitability of death?",
)

Question.create!(
  description: "Are you an organized person?",
)

# create_table "answer_choices", force: :cascade do |t|
#   t.integer  "question_id", null: false
#   t.string   "body",        null: false
#   t.string   "category",    null: false
#   t.integer  "weight",      null: false
#   t.datetime "created_at",  null: false
#   t.datetime "updated_at",  null: false
# end

AnswerChoice.create!(
  question_id: 1,
  body: "Often",
  category: "outgoing",
  value: 5
)
AnswerChoice.create!(
  question_id: 1,
  body: "Sometimes",
  category: "outgoing",
  value: 0
)
AnswerChoice.create!(
  question_id: 1,
  body: "Rarely/never",
  category: "outgoing",
  value: -5
)

AnswerChoice.create!(
  question_id: 2,
  body: "Whenever I can",
  category: "sports",
  value: 5
)
AnswerChoice.create!(
  question_id: 2,
  body: "Sometimes",
  category: "sports",
  value: 0
)
AnswerChoice.create!(
  question_id: 2,
  body: "Rarely/never",
  category: "sports",
  value: -5
)

AnswerChoice.create!(
  question_id: 3,
  body: "I love it!",
  category: "pop_culture",
  value: 5
)
AnswerChoice.create!(
  question_id: 3,
  body: "I do sometimes, but usually I just wait to get the DVD",
  category: "pop_culture",
  value: 0
)
AnswerChoice.create!(
  question_id: 3,
  body: "Nah, I'm not really into movies",
  category: "pop_culture",
  value: -5
)

AnswerChoice.create!(
  question_id: 4,
  body: "Every goddamn day of my goddamn life",
  category: "optimistic",
  value: -5
)
AnswerChoice.create!(
  question_id: 4,
  body: "Sometimes. Who doesn't?",
  category: "optimistic",
  value: 0
)
AnswerChoice.create!(
  question_id: 4,
  body: "Why worry about death when there is life to live?",
  category: "optimistic",
  value: 5
)

AnswerChoice.create!(
  question_id: 5,
  body: "Yes, very much so",
  category: "organized",
  value: 5
)
AnswerChoice.create!(
  question_id: 5,
  body: "I'm neat/messy, but I wouldn't say I'm significantly below or above average",
  category: "organized",
  value: 0
)
AnswerChoice.create!(
  question_id: 5,
  body: "I'm pretty messy",
  category: "organized",
  value: -5
)
