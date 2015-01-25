recEngine = {}

recEngine.link = (user, item) ->
  RecEngine.upsert
    nodes: [ user, item ]
  ,
    $inc:
      weight: 1


# recEngine.suggest
