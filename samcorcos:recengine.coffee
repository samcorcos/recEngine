recEngine = {}

# The order of hte link matters in this schema... will have to fix later

recEngine.link = (user, item) ->
  RecEngineLinks.upsert
      link1: user
      link2: item
    ,
      $set:
        link1: user
        link2: item
  return

    # RecEngine.upsert
    #   nodes: [ user, item ]
    # ,
    #   $inc:
    #     weight: 1




###
Right now what this is doing is:

1) Taking user info
2) showing how many times a user has liked that item

What we want is:

1)
###








# recEngine.suggest
