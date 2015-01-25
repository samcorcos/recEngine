# Is there a reason this has to be a "Meteor" collection and not a "Mongo" collection
RecEngineLinks = new Meteor.Collection('recEngineLinks')

Schema = {}
Schema.Link = new SimpleSchema
  link:
    type: [String]
    label: "Link"
    minCount: 2
    maxCount: 2

RecEngineLinks.attachSchema(Schema.Link)

if Meteor.isServer
  Meteor.publish 'recEngineLinks', ->
    RecEngineLinks.find()

if Meteor.isClient
  Meteor.subscribe 'recEngineLinks'
