Package.describe({
  name: 'samcorcos:recengine',
  version: '1.0.6',
  summary: 'Lightweight recommendation engine for Meteor',
  git: 'https://github.com/samcorcos/recEngine.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use([
    'underscore',
    'coffeescript',
    'ccorcos:ford-fulkerson@1.0.0'
  ])
  api.export('recEngine', 'server')
  api.export('RecEngine', 'server')

  api.export('RecEngineLinks', 'server')
  api.addFiles('samcorcos:recengine.js')
  api.addFiles('samcorcos:recengine.coffee')
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('samcorcos:recengine');
  api.addFiles('samcorcos:recengine-tests.js');
});
