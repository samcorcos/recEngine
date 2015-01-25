recEngine = {}

# The order of hte link matters in this schema... will have to fix later

recEngine.link = (user, item) ->
  RecEngineLinks.upsert
      user: user
      item: item
    ,
      $set:
        user: user
        item: item

  temp = RecEngineLinks.find # this is saying "find me all items this user is linked to"
    user: user
  .fetch()

  temp.forEach (link) ->
    RecEngine.upsert
      nodes: [ link.item, item ]
    ,
      $inc:
        weight: 1



  return




###
Right now what this is doing is:

1) Taking user info
2) showing how many times a user has liked that item

What we want is:

1)
###








# recEngine.suggest
