// Represents an edge from source to sink with capacity
var Edge = function(source, sink, capacity) {
  this.source = source;
  this.sink = sink;
  this.capacity = capacity;
  this.reverseEdge = null;
  this.flow = 0;
};

// Main class to manage the network
var FlowNetwork = function() {
  this.edges = {};

  // Is this edge/residual capacity combination in the path already?
  this.findEdgeInPath = function(path, edge, residual) {
    for(var p=0;p<path.length;p++)
    if(path[p][0] == edge && path[p][1] == residual)
    return true;
    return false;
  };

  this.addEdge = function(source, sink, capacity) {
    if(source == sink) return;

    // Create the two edges = one being the reverse of the other
    var edge = new Edge(source, sink, capacity);
    var reverseEdge = new Edge(sink, source, 0);

    // Make sure we setup the pointer to the reverse edge
    edge.reverseEdge= reverseEdge;
    reverseEdge.reverseEdge = edge;

    if(this.edges[source] === undefined) this.edges[source] = [];
    if(this.edges[sink] === undefined) this.edges[sink] = [];

    this.edges[source].push(edge);
    this.edges[sink].push(reverseEdge);
  };

  // Finds a path from source to sink
  this.findPath = function(source, sink, path) {
    if(source == sink) return path;

    for(var i=0;i<this.edges[source].length;i++) {
      var edge = this.edges[source][i];
      var residual = edge.capacity - edge.flow;

      // If we have capacity and we haven't already visited this edge, visit it
      if(residual > 0 && !this.findEdgeInPath(path, edge, residual)) {
        var tpath = path.slice(0);
        tpath.push([edge, residual]);
        var result = this.findPath(edge.sink, sink, tpath);
        if(result != null) return result;
      }
    }
    return null;
  };

  // Find the max flow in this network
  this.maxFlow = function(source, sink) {
    var path = this.findPath(source, sink, []);
    while(path != null) {
      var flow = 9999999999;
      // Find the minimum flow
      for(var i=0;i<path.length;i++)
      if(path[i][1] < flow) flow = path[i][1];
      // Apply the flow to the edge and the reverse edge
      for(var i=0;i<path.length;i++) {
        path[i][0].flow += flow;
        path[i][0].reverseEdge.flow -= flow;
      }
      path = this.findPath(source, sink, []);
    }
    var sum = 0;
    for(var i=0;i<this.edges[source].length;i++)
    sum += this.edges[source][i].flow;
    return sum;
  };
};




recEngine = {}

recEngine.upvote = function(user, item) {
  var allItems = [];
  var sumWeight = 0;
  var allEdges = RecEngine.find().fetch()
  var allUsers = RecEngineUpvotes.find().fetch()

  // Add 1 to the weight if the items have been upvoted by similar people
  var incrementWeight = function() {
    var temp = RecEngineUpvotes.find({ user: user }).fetch();
    temp.forEach(function(upvote) {
      var tempArray;
      if (upvote.item !== item) {
        tempArray = [upvote.item, item];
        tempArray.sort();
        RecEngine.update({ nodes: tempArray }, { $inc: { weight: 1 }});
      }
    });
  };

  // Add user pair to a separate database
  var addUserPair = function() {
    if (!RecEngineUpvotes.findOne({ user: user, item: item })) {
      RecEngineUpvotes.insert({ user: user, item: item });
      RecEngine.upsert({ nodes: [user, item]}, {$set: {weight: 9999999999}})
      incrementWeight();
    }
  };
  addUserPair();

  // Get all items in an array
  var getAllItems = function() {
    allUsers.forEach(function(pair) {
      if (allItems.indexOf(pair.item) === -1) {
        allItems.push(pair.item);
      }
    });
  };
  getAllItems();

  // Sets default value for items that haven't been upvoted yet
  var setDefaultValue = function() {
    allItems.forEach(function(xitem) {
      var tempArray;
      if (xitem !== item) {
        tempArray = [item, xitem];
        tempArray.sort();
        if (RecEngine.find({nodes: tempArray}).fetch().length === 0) {
          RecEngine.insert({ nodes: tempArray });
        }
      }
    });
  };
  setDefaultValue();
  return "Successfully Linked"
}



recEngine.suggest = function(userId, numSuggestions, cb) {
  var error = "";
  var result = [];

  var allEdges = [];
  var allUsers = RecEngineUpvotes.find().fetch()
  var allItems = [];

  var getAllItems = function() { // Gets all the items in the database so we can iterate over them
    allUsers.forEach(function(pair) {
      if (allItems.indexOf(pair.item) === -1) {
        allItems.push(pair.item);
      }
    });
  };
  getAllItems();

  RecEngine.find({ weight: { $lt: 9999999999 }}).fetch().forEach(function(x) {
    allEdges.push(x);
  }) // Finds all edges, minus user edges.
  RecEngine.find({ nodes: { $in: [userId] }}).fetch().forEach(function(x) {
    allEdges.push(x);
  }) // Finds all edges associated with the current user

  allItems.forEach(function(item) {
    var fn = new FlowNetwork(); // Must make a new flow network for each suggestion

    allEdges.forEach(function(edge) { // add all the edges
      fn.addEdge(edge.nodes[0], edge.nodes[1], edge.weight);
    })

    if (fn.maxFlow(userId, item) < 9999999999) {
      result.push({ suggestion: item, weight: fn.maxFlow(userId, item) })

    }
  })

  result.sort(function(a,b) {
    if (a.weight < b.weight) { return 1; }
    if (a.weight > b.weight) { return -1; }
    return 0;
  })

  if (numSuggestions > result.length) {
    error = "Insufficient data! Only data for " + result.length + " suggestions."
    console.error(error);
  }

  result = result.slice(0, numSuggestions);

  return cb(error, result)
}
