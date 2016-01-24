[**DEPRECATED:** This approach does not scale. I highly recomment looking into a graph database such as Neo4j to solve this problem.]

# RecEngine

Lightweight, easily implemented recommendation engine. This package is for users who are "liking" things, "purchasing" things, or "voting" on things.

```
$ meteor add samcorcos:recengine
```

Associate items based on user "upvotes", "likes", "purchases", etc using the syntax:

```
recEngine.link('<USERID>', '<ITEMID>')
```

Then, to get a recommendation, use the syntax:

```
recEngine.suggest('<USERID>', <NUMBER OF SUGGESTIONS>, function(error, result) {
  // "result" is an array of objects
  // Within the "result" object is "suggestion" and "weight"
  // "suggestion" is the item being suggested
  // "weight" is the strength of the suggestion -- higher number means stronger suggestion
})
```

## Algorithm

Suggestions are produced using the [Ford-Fulkerson algorithm](http://en.wikipedia.org/wiki/Ford%E2%80%93Fulkerson_algorithm), which computes the maximum flow in a flow network.

To provide an analogy, think of the algorithm as finding the most efficient way to drive from point A to point B, taking into consideration the number of lanes each street has—streets with more lanes are better.

Much of the logic comes from: https://gist.github.com/methodin/1561824

Runs in `O(E*Fm)` time, where `E` is the number of edges, and `Fm` is the maximum flow.


## Basic Example

This works not only with `USERID`s, but with colloquial names and just about anything else. For example, you could install the package and write the following:

```
if (Meteor.isServer) {
  Meteor.startup(function () {
    recEngine.link("Mike", "cake");
    recEngine.link("Mike", "coffee");
    recEngine.link("Mike", "pie");
    recEngine.link("Sarah", "coffee");
    recEngine.link("Sarah", "cake");
    recEngine.link("Alex", "yogurt");
    recEngine.link("Alex", "cake");
    recEngine.link("John", "cake");
    recEngine.link("John", "coffee");
    recEngine.link("John", "pie");
    recEngine.link("Nick", "coffee");
    recEngine.link("Nick", "cake");
    recEngine.link("Sally", "yogurt");
    recEngine.link("Sally", "cake");
    recEngine.link("Zeke", "cake");

    recEngine.suggest("Zeke", 2, function(err,res) {
      if (err) console.log(err);
      console.log(res);
    })
  });
}
```

... and your server console should read:

```
[ { suggestion: 'coffee', weight: 3 },
  { suggestion: 'pie', weight: 2 } ]
```

This means that Zeke would most probably like coffee given the preferences of his peers, and would probably also like pie, though, to a lesser degree.

## More Practical Example

Say you have an app that keeps track of "likes" or "upvotes". In the method you wrote to keep track of upvotes, you can add a call to `recEngine.link('<USERID>', '<ITEMID>')` in your function. For example:

```
Meteor.methods({
  upvote: function(movie) {
    var userId = Meteor.user()._id;
    Movies.update({ _id: movie._id}, {$addToSet: { upvotes: userId} }, function(err, res) {
    if (err) console.log(err);
    recEngine.link(userId, movie._id);
    });
  }
})
```

Then, when you have enough upvotes in your database (it doesn't take very many), you can make suggestions in the following format:

```
Meteor.methods({
  suggest: function(numSuggestions) {
    var userId = Meteor.user()._id;
    recEngine.suggest(userId, numSuggestions, function(err, res) {
      if (err) console.log(err);
      return res;
    })
  }
})
```

This will give you how ever many suggestions you declared as the variable `numSuggestions` (could be any number) for the currently logged in user.

## Additional information

Keep in mind that this package only allows users to vote on each item once, which works for most voting systems, but not all.

## To Do

1. Optimize performance by storing suggestions
2. Configurable number of records stored, to allow developer to change performance `recEngine.config.numRecords`
3. Add a method for finding similar users `recEngine.similarUsers`
4. Add a method for finding similar items `recEngine.similarItems`
5. Divide inputs into contexts so retrieval can be categorized
