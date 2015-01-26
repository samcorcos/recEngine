recEngine = {}

# The order of hte link matters in this schema... will have to fix later

recEngine.link = (user, item) ->
  unless RecEngineLinks.findOne(
    user: user
    item: item
  )
    RecEngineLinks.insert
      user: user
      item: item

    temp = RecEngineLinks.find # this is saying "find me all items this user is linked to"
      user: user
    .fetch()

    temp.forEach (link) ->
      unless link.item is item # this takes care of words that match themselves (which will always be highly correlated)
        tempArray = [ link.item, item ];
        tempArray.sort();
        RecEngine.upsert
          nodes: tempArray
        ,
          $inc:
            weight: 1

  "Successfully linked!"





# recEngine.suggest
