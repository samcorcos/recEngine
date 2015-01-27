# # Is there a reason this has to be a "Meteor" collection and not a "Mongo" collection
# RecEngine = new Meteor.Collection('recEngine')
#
# Schema = {}
# Schema.Edge = new SimpleSchema
#   source:
#     type: String
#     label: "Source"
#   sink:
#     type: String
#     label: "Sink"
#   capacity:
#     type: Number
#     label: "Number"
#
#
# RecEngine.attachSchema(Schema.Edge)
#
# if Meteor.isServer
#   Meteor.publish 'recEngine', ->
#     RecEngine.find()
#
# if Meteor.isClient
#   Meteor.subscribe 'recEngine'
