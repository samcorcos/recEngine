# RecEngine
==============

Simple, easily implemented recommendation engine.

`meteor add samcorcos:recengine`

Associate items based on user "likes" using the syntax:

`recEngine.link('<USERID>', '<ITEMID>')`

Then, to get a recommendation, use the syntax:

`recEngine.suggest('<USERID>', <NUMBER OF SUGGESTIONS>, function(error, result) {
  // "result" is an array of recommendations
  })`
