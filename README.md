# RecEngine
==============

Simple, easily implemented recommendation engine.

```
$ meteor add samcorcos:recengine
```

Associate items based on user "likes" using the syntax:

```
recEngine.upvote('<USERID>', '<ITEMID>')
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
    recEngine.upvote("Mike", "cake");
    recEngine.upvote("Mike", "coffee");
    recEngine.upvote("Mike", "pie");
    recEngine.upvote("Bob", "coffee");
    recEngine.upvote("Bob", "cake");
    recEngine.upvote("Alex", "yogurt");
    recEngine.upvote("Alex", "cake");
    recEngine.upvote("Zeke", "cake");
    recEngine.suggest("Zeke", 3, function(err,res) {
      if (err) console.log(err);
      console.log(res);
    })
  });
}
```

... and your console should read:

```
[ { suggestion: 'yogurt', weight: 4 },
  { suggestion: 'coffee', weight: 2 },
  { suggestion: 'pie', weight: 2 } ]
```

This means that Zeke would most probably like yogurt given the preferences of his peers, and would probably also like coffee and pie, though, to a lesser degree.

## More Practical Example

Say you have an app that keeps track of "likes" or "upvotes". In the method you wrote to keep track of upvotes, you can add a call to `recEngine.upvote('<USERID>', '<ITEMID>')` in your function. For example:

```
Meteor.methods({
  upvote: function(movie) {
    var userId = Meteor.user()._id;
    Movies.update({ _id: movie._id}, {$addToSet: { upvotes: userId} }, function(err, res) {
    if (err) console.log(err);
    recEngine.upvote(userId, movie._id);
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

Keep in mind that this package only allows users to vote on each item once.
