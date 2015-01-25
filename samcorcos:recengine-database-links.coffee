# Is there a reason this has to be a "Meteor" collection and not a "Mongo" collection
RecEngineLinks = new Meteor.Collection('recEngineLinks')

Schema = {}
Schema.Link = new SimpleSchema
  user:
    type: String
    label: "user"
  item:
    type: String
    label: "item"

RecEngineLinks.attachSchema(Schema.Link)

if Meteor.isServer
  Meteor.publish 'recEngineLinks', ->
    RecEngineLinks.find()

if Meteor.isClient
  Meteor.subscribe 'recEngineLinks'
