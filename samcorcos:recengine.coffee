recEngine = {}

recEngine.link = (user, item) ->
  RecEngineLinks.upsert
      link: [ user, item ]
    ,
      $set:
        link: [ user, item ]
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
