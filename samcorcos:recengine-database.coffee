# Is there a reason this has to be a "Meteor" collection and not a "Mongo" collection
RecEngine = new Meteor.Collection('recEngine')

RecEngine.deny
  insert: (userId, doc) ->
    true
  update: (userId, docs, fields, modifier) ->
    true
  remove: (userId, docs) ->
    true

Schema = {}
Schema.Edge = new SimpleSchema
  nodes:
    type: [String]
    label: "Nodes"
    minCount: 2
    maxCount: 2
  weight:
    type: Number
    label: "Weight"
    defaultValue: 0
    optional: true

RecEngine.attachSchema(Schema.Edge)

if Meteor.isServer
  Meteor.publish 'recEngine', ->
    RecEngine.find()

if Meteor.isClient
  Meteor.subscribe 'recEngine'
