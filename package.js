Package.describe({
  name: 'samcorcos:recengine',
  version: '1.0.0',
  summary: 'Lightweight recommendation engine for Meteor',
  git: 'https://github.com/samcorcos/recEngine.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use("coffeescript")
  api.use("underscore")
  api.use("aldeed:collection2")
  api.use("aldeed:simple-schema")
  api.export("recEngine", "server")
  api.export("RecEngine", "server")
  api.export("RecEngineUpvotes", "server")
  api.addFiles('samcorcos:recengine.js')
  api.addFiles('samcorcos:collections.coffee')
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('samcorcos:recengine');
  api.addFiles('samcorcos:recengine-tests.coffee');
});
