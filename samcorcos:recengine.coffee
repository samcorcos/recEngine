# RecEngine requires SimpleSchema, Collections2, Coffeescript,

@RecEngine = new Mongo.Collection('recEngine')

RecEngine.allow
  insert: (userId, doc) ->
    false

  update: (userId, docs, fields, modifier) ->
    false

  remove: (userId, docs) ->
    false

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
    label: "Bath"
    minCount: 2
    maxCount: 2
  weight:
    type: Number
    label: "Weight"

RecEngine.attachSchema(Schema.Edge)

if Meteor.isServer
  Meteor.publish 'recEngine', ->
    RecEngine.find()

if Meteor.isClient
  Meteor.subscribe 'recEngine'
