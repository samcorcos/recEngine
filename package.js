Package.describe({
  name: 'samcorcos:recengine',
  version: '0.0.1',
  summary: 'Lightweight collaborative filter-like recommendation engine for Meteor',
  git: 'https://github.com/samcorcos/recEngine.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use("coffeescript")
  api.use("aldeed:collection2")
  api.use("aldeed:simple-schema")
  api.export("recEngine", "server")
  api.export("RecEngine", "server")
  api.export("RecEngineUpvotes", "server")
  api.addFiles('samcorcos:recengine.coffee');
  api.addFiles('samcorcos:recengine-database-edges.coffee')
  api.addFiles('samcorcos:recengine-database-links.coffee')
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('samcorcos:recengine');
  api.addFiles('samcorcos:recengine-tests.coffee');
});
