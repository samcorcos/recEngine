# Is there a reason this has to be a "Meteor" collection and not a "Mongo" collection
RecEngine = new Meteor.Collection('recEngine')

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
    defaultValue: 1
    optional: true

RecEngine.attachSchema(Schema.Edge)

if Meteor.isServer
  Meteor.publish 'recEngine', ->
    RecEngine.find()

if Meteor.isClient
  Meteor.subscribe 'recEngine'






RecEngineUpvotes = new Meteor.Collection('recEngineUpvotes')

Schema = {}
Schema.Upvote = new SimpleSchema
  user:
    type: String
    label: "user"
  item:
    type: String
    label: "item"

RecEngineUpvotes.attachSchema(Schema.Upvote)

if Meteor.isServer
  Meteor.publish 'recEngineUpvotes', ->
    RecEngineUpvotes.find()

if Meteor.isClient
  Meteor.subscribe 'recEngineUpvotes'
