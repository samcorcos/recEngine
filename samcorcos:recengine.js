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
      var flow = 999999;
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

  var addUserPair = function() {
    if (!RecEngineUpvotes.findOne({ user: user, item: item })) {
      RecEngineUpvotes.insert({ user: user, item: item });
      RecEngine.upsert({ nodes: [user, item]}, {$set: {weight: 9999999999}})
      incrementWeight();
    }
  };
  addUserPair();

  var getAllItems = function() {
    allUsers.forEach(function(pair) {
      if (allItems.indexOf(pair.item) === -1) {
        allItems.push(pair.item);
      }
    });
  };
  getAllItems();

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



recEngine.suggest = function(userId, numberOfRecs, cb) {
  var error = "";
  var result = {};

  var allEdges = RecEngine.find().fetch()
  var allUsers = RecEngineUpvotes.find().fetch()



  // _.invert(result);

  // set result to the top "numberOfRecs"
  return cb(error, result)
}


//
//
//
// var fn = new FlowNetwork();
// fn.addEdge('s','o',3);
// fn.addEdge('s','p',3);
// fn.addEdge('o','p',2);
// fn.addEdge('o','q',3);
// fn.addEdge('p','r',2);
// fn.addEdge('r','t',3);
// fn.addEdge('q','r',4);
// fn.addEdge('q','t',2);
// var max = fn.maxFlow('s','t');
//
// console.log(max);
