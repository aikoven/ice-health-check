#!/usr/bin/env node
var Ice = require('ice').Ice;

function check(args) {
  var initData = new Ice.InitializationData();
  initData.properties = Ice.createProperties();
  initData.properties.setProperty('Ice.Default.Host', 'localhost');
  initData.properties.setProperty('Ice.Default.InvocationTimeout', '1000');

  args = initData.properties.parseIceCommandLineOptions(args);

  var proxyString = args[2];

  var communicator = Ice.initialize(initData);

  var proxy = communicator.stringToProxy(proxyString);
  if (!proxy) {
    console.error('Invalid proxy: ' + proxyString);
    process.exit(1);
  }

  proxy.ice_ping().then(
    function() {
      return 0;
    },
    function(e) {
      console.error(e instanceof Ice.Exception ? e.ice_name() : e.toString());
      return 1;
    }
  ).then(function(code) {
    return communicator.destroy().finally(function() {
      process.exit(code);
    });
  });
}

if (process.argv.length <= 2) {
  console.log('Usage: ice-health-check <proxy>');
  process.exit(1);
}

check(process.argv);
