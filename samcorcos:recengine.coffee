recEngine = {}

recEngine.upvote = (user, item) ->
  # 1) when we get a new item, pair it with all the other ones with at least a "1"
  # 2) Get the weight of all items (sumWeight) and add "user" paired with each "item" with a "weight" of sumweight, using RecEngine.upsert

  allItems = []
  sumWeight = 0
  allEdges = RecEngine.find().fetch()
  allUsers = RecEngineUpvotes.find().fetch()

  getSum = -> ############This is currently broken... Gets sum for all, including users
    allEdges.forEach (edge) ->
      sumWeight += edge.weight
  getSum()

  updateUserWeight = ->
    allUsers.forEach (user) ->
      # user.user and user.item
      RecEngine.upsert
        nodes: [
          user.user
          user.item
        ]
      ,
        $set:
          weight: sumWeight
    return

  incrementWeight = -> # this function runs within the "addUserPair" function, because we only want to run the function if it's a new pair
    temp = RecEngineUpvotes.find(user: user).fetch() # this is saying "find me all items this user is linked to"

    temp.forEach (upvote) ->
      unless upvote.item is item # this takes care of words that match themselves

        tempArray = [ upvote.item, item ];
        tempArray.sort(); # sorts them so there are no repeats

        RecEngine.update # this does not have to be upsert anymore, because all items should get created when we call setDefaultValue()
          nodes: tempArray
        ,
          $inc:
            weight: 1
    return

  addUserPair = ->
    unless RecEngineUpvotes.findOne( # unless a pair of this user and item already exists...
      user: user
      item: item
    )
      RecEngineUpvotes.insert # insert the pairing of the user and the item into RecEngine
        user: user
        item: item

      incrementWeight()
    updateUserWeight()
    return
  addUserPair()

  getAllItems = -> # makes allItems an array with all the unique items.
    allUsers.forEach (pair, i) ->
      allItems.push(pair.item) if allItems.indexOf(pair.item) is -1
      return
  getAllItems()

  setDefaultValue = ->
    allItems.forEach (xitem) ->
      unless xitem is item
        tempArray = [item, xitem]
        tempArray.sort()
        RecEngine.insert({ nodes: tempArray }) if RecEngine.find({ nodes: tempArray}).fetch().length is 0
    return
  setDefaultValue()


  "Successfully linked!"





recEngine.suggest = (user, responses = 1) ->

  maxFlowObject = {}

  createUserEdges = (user) ->


  findPath = (source, sink, path) ->
    # Finds the path from source to sink
    path if source is sink




    # for(var i=0;i<this.edges[source].length;i++) {
    #         var edge = this.edges[source][i];
    #         var residual = edge.capacity - edge.flow;
    #
    #         // If we have capacity and we haven't already visited this edge, visit it
    #         if(residual > 0 && !this.findEdgeInPath(path, edge, residual)) {
    #             var tpath = path.slice(0);
    #             tpath.push([edge, residual]);
    #             var result = this.findPath(edge.sink, sink, tpath);
    #             if(result != null) return result;
    #         }
    #     }
    #     return null;

  maxFlow = (user) ->
    # the params are really "user" as the source and "every item" as the sink


  maxFlow user



    # for every item in RecEngine, add the item and it's max flow to the maxFlowObject
    # Then sort the responses (with _.invert)
    # then return the number of responses requested
