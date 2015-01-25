Package.describe({
  name: 'samcorcos:recengine',
  version: '0.0.1',
  summary: 'Lightweight collaborative filter-like recommendation engine for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.addFiles('samcorcos:recengine.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('samcorcos:recengine');
  api.addFiles('samcorcos:recengine-tests.js');
});
