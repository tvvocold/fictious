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

ActiveRecord::Schema.define(version: 20140626182645) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "collection_feeds", force: true do |t|
    t.integer  "post_id",       null: false
    t.integer  "collection_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "collection_feeds", ["post_id", "collection_id"], name: "index_collection_feeds_on_post_id_and_collection_id", unique: true, using: :btree

  create_table "collections", force: true do |t|
    t.integer  "owner_id",   null: false
    t.string   "title",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "collections", ["owner_id", "title"], name: "index_collections_on_owner_id_and_title", unique: true, using: :btree

  create_table "comments", force: true do |t|
    t.integer  "user_id",         null: false
    t.integer  "post_id",         null: false
    t.text     "content",         null: false
    t.string   "paragraph_index", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["post_id"], name: "index_comments_on_post_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "group_requests", force: true do |t|
    t.integer  "group_id",   null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "group_requests", ["group_id", "user_id"], name: "index_group_requests_on_group_id_and_user_id", unique: true, using: :btree

  create_table "group_users", force: true do |t|
    t.integer  "group_id",   null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "group_users", ["group_id", "user_id"], name: "index_group_users_on_group_id_and_user_id", unique: true, using: :btree

  create_table "groups", force: true do |t|
    t.integer  "mod_id",     null: false
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "groups", ["mod_id"], name: "index_groups_on_mod_id", using: :btree

  create_table "likes", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "post_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "likes", ["user_id", "post_id"], name: "index_likes_on_user_id_and_post_id", unique: true, using: :btree

  create_table "notifications", force: true do |t|
    t.string   "content"
    t.integer  "user_id"
    t.integer  "content_id"
    t.integer  "notifiable_id"
    t.string   "notifiable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "posts", force: true do |t|
    t.integer  "author_id",          null: false
    t.string   "title",              null: false
    t.string   "subtitle",           null: false
    t.text     "content",            null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "posts", ["author_id"], name: "index_posts_on_author_id", using: :btree

  create_table "subscriptions", force: true do |t|
    t.integer  "user_id"
    t.integer  "subscriber_id", null: false
    t.integer  "collection_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "subscriptions", ["subscriber_id", "collection_id"], name: "index_subscriptions_on_subscriber_id_and_collection_id", unique: true, using: :btree
  add_index "subscriptions", ["subscriber_id", "user_id"], name: "index_subscriptions_on_subscriber_id_and_user_id", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "email",           null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
