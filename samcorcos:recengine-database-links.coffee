# # Is there a reason this has to be a "Meteor" collection and not a "Mongo" collection
# RecEngineUpvotes = new Meteor.Collection('recEngineUpvotes')
#
# Schema = {}
# Schema.Upvote = new SimpleSchema
#   user:
#     type: String
#     label: "user"
#   item:
#     type: String
#     label: "item"
#
# RecEngineUpvotes.attachSchema(Schema.Upvote)
#
# if Meteor.isServer
#   Meteor.publish 'recEngineUpvotes', ->
#     RecEngineUpvotes.find()
#
# if Meteor.isClient
#   Meteor.subscribe 'recEngineUpvotes'
