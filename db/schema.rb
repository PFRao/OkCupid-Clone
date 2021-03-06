# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160710191915) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answer_choices", force: :cascade do |t|
    t.integer  "question_id", null: false
    t.string   "body",        null: false
    t.string   "category",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "value"
  end

  add_index "answer_choices", ["question_id"], name: "index_answer_choices_on_question_id", using: :btree

  create_table "answers", force: :cascade do |t|
    t.integer  "user_id",                           null: false
    t.integer  "weight",                            null: false
    t.boolean  "public",             default: true, null: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.string   "acceptable_choices"
    t.integer  "answer_choice_id"
  end

  add_index "answers", ["user_id"], name: "index_answers_on_user_id", using: :btree

  create_table "conversations", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "user2_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "conversations", ["user2_id"], name: "index_conversations_on_user2_id", using: :btree
  add_index "conversations", ["user_id"], name: "index_conversations_on_user_id", using: :btree

  create_table "likes", force: :cascade do |t|
    t.integer  "liker_id",   null: false
    t.integer  "likee_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "likes", ["likee_id"], name: "index_likes_on_likee_id", using: :btree
  add_index "likes", ["liker_id"], name: "index_likes_on_liker_id", using: :btree

  create_table "messages", force: :cascade do |t|
    t.text     "body",                       null: false
    t.integer  "sender_id",                  null: false
    t.integer  "receiver_id",                null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "convo_id",                   null: false
    t.boolean  "unread",      default: true
  end

  add_index "messages", ["convo_id"], name: "index_messages_on_convo_id", using: :btree
  add_index "messages", ["receiver_id"], name: "index_messages_on_receiver_id", using: :btree
  add_index "messages", ["sender_id"], name: "index_messages_on_sender_id", using: :btree

  create_table "profiles", force: :cascade do |t|
    t.text     "self_summary",   default: ""
    t.text     "do_with_life",   default: ""
    t.text     "real_good_at",   default: ""
    t.text     "first_thing",    default: ""
    t.text     "favorites",      default: ""
    t.text     "six_things",     default: ""
    t.text     "think_about",    default: ""
    t.text     "typical_friday", default: ""
    t.text     "message_if",     default: ""
    t.integer  "user_id",                     null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "profiles", ["user_id"], name: "index_profiles_on_user_id", unique: true, using: :btree

  create_table "questions", force: :cascade do |t|
    t.string   "description",                 null: false
    t.boolean  "multiple",    default: false, null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",                                                                                                          null: false
    t.string   "password_digest",                                                                                                   null: false
    t.string   "personality"
    t.string   "location",                                                                                                          null: false
    t.datetime "last_online",                                                                                                       null: false
    t.string   "session_token",                                                                                                     null: false
    t.datetime "created_at",                                                                                                        null: false
    t.datetime "updated_at",                                                                                                        null: false
    t.datetime "birthdate",                                                                                                         null: false
    t.string   "gender",          default: "man",                                                                                   null: false
    t.string   "image_url",       default: "http://res.cloudinary.com/di4l0rwwz/image/upload/v1465569852/xvtakubbgwsz9rhpqe6h.jpg"
  end

  add_index "users", ["personality"], name: "index_users_on_personality", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "visits", force: :cascade do |t|
    t.integer  "visitor_id", null: false
    t.integer  "visitee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "visits", ["visitee_id"], name: "index_visits_on_visitee_id", using: :btree
  add_index "visits", ["visitor_id"], name: "index_visits_on_visitor_id", using: :btree

end
