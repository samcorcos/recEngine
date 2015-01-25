# Is there a reason this has to be a "Meteor" collection and not a "Mongo" collection
RecEngineLinks = new Meteor.Collection('recEngineLinks')

Schema = {}
Schema.Link = new SimpleSchema
  link1:
    type: String
    label: "Link 1"
  link2:
    type: String
    label: "Link 2"

RecEngineLinks.attachSchema(Schema.Link)

if Meteor.isServer
  Meteor.publish 'recEngineLinks', ->
    RecEngineLinks.find()

if Meteor.isClient
  Meteor.subscribe 'recEngineLinks'
