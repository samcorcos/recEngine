// RecEngine = new Meteor.Collection('recEngine')
//
// if (Meteor.isServer) {
//   Meteor.publish('recEngine', function() {
//     RecEngine.find({})
//   });
// }
//
// RecEngineLinks = new Meteor.Collection('recEngineLinks')
//
// if (Meteor.isServer) {
//   Meteor.publish('recEngineLinks', function() {
//     RecEngineLinks.find({})
//   });
// }
// recEngine = {}
//
// recEngine.link = function(user, item) {
//   // var allItems = [];
//   // var allEdges = RecEngine.find().fetch()
//   // var allUsers = RecEngineLinks.find().fetch()
//
//   // Add 1 to the weight if the items have been upvoted by similar people
//   var incrementWeight = function() {
//     var temp = RecEngineLinks.find({ user: user }).fetch();
//     temp.forEach(function(link) {
//       var tempArray;
//       if (link.item !== item) { // Makes sure item isnt associated with itself
//         tempArray = [link.item, item];
//         tempArray.sort();
//         RecEngine.upsert({ nodes: tempArray }, { $inc: { weight: 1 }});
//       }
//     });
//   };
//
//   // Add user pair to a separate database
//   var addUserPair = function() {
//     if (!RecEngineLinks.findOne({ user: user, item: item })) {
//       RecEngineLinks.insert({ user: user, item: item });
//       RecEngine.upsert({ nodes: [user, item]}, {$set: {weight: 9999999999}})
//       incrementWeight();
//     }
//   };
//   addUserPair();
//
//   // // Get all items in an array
//   // var getAllItems = function() {
//   //   allUsers.forEach(function(pair) {
//   //     if (allItems.indexOf(pair.item) === -1) {
//   //       allItems.push(pair.item);
//   //     }
//   //   });
//   // };
//   // getAllItems();
//
//   // // Do we need to set the default value?
//   // var setDefaultValue = function() {
//   //   allItems.forEach(function(xitem) {
//   //     var tempArray;
//   //     if (xitem !== item) {
//   //       tempArray = [item, xitem];
//   //       tempArray.sort();
//   //       if (RecEngine.find({nodes: tempArray}).fetch().length === 0) {
//   //         RecEngine.insert({ nodes: tempArray, weight: 0 });
//   //       }
//   //     }
//   //   });
//   // };
//   // setDefaultValue();
//
//   return "Successfully Linked"
// }
//
// recEngine.suggest = function(userId, numSuggestions, cb) {
//   var error = "";
//   var result = [];
//
//   var allEdges = [];
//   var allUsers = RecEngineLinks.find().fetch()
//   var allItems = [];
//
//   var getAllItems = function() { // Gets all the items in the database so we can iterate over them
//     allUsers.forEach(function(pair) {
//       if (allItems.indexOf(pair.item) === -1) {
//         allItems.push(pair.item);
//       }
//     });
//   };
//   getAllItems();
//
//   if (RecEngine.find({nodes: { $in: [userId]}}).fetch().length > 0) { // Error handles if suggesting for user that does not exist
//     RecEngine.find({ weight: { $lt: 9999999999 }}).fetch().forEach(function(x) {
//       allEdges.push(x);
//     }) // Finds all edges, minus user edges.
//     RecEngine.find({ nodes: { $in: [userId] }}).fetch().forEach(function(x) {
//       allEdges.push(x);
//     }) // Finds all edges associated with the current user
//
//
//
//     allItems.forEach(function(item) {
//       var fn = new FlowNetwork(); // Must make a new flow network for each suggestion
//       console.log("ITEM", item);
//       allEdges.forEach(function(edge) { // add all the edges
//         console.log("EDGE", edge); // ERROR -------------------------------- Gets two in, then breaks
//         fn.addEdge(edge.nodes[0], edge.nodes[1], edge.weight);
//
//       })
//
//       if (fn.maxFlow(userId, item) < 9999999999) {
//         result.push({ suggestion: item, weight: fn.maxFlow(userId, item) })
//       }
//       // As long as the item isn't directly touching the user, add it to the results array
//
//     })
//
//
//     // Sort the results in order of weight
//     result.sort(function(a,b) {
//       if (a.weight < b.weight) { return 1; }
//       if (a.weight > b.weight) { return -1; }
//       return 0;
//     })
//
//     // Error handle for insufficient data
//     if (numSuggestions > result.length) {
//       error = "Insufficient data! Only data for " + result.length + " suggestions."
//       console.error(error);
//     }
//   } else {
//     error = "User does not exist!"
//     console.error(error);
//   }
//
//
//   // Slice the results to handle
//   result = result.slice(0, numSuggestions);
//
//   // Return with any errors and the result
//   return cb(error, result)
// }
