#!/usr/bin/env node
var Ice = require('ice').Ice;

function check(proxyString) {
  var initData = new Ice.InitializationData();
  initData.properties = Ice.createProperties();
  initData.properties.setProperty('Ice.Default.Host', 'localhost');

  var communicator = Ice.initialize(initData);

  var proxy = communicator.stringToProxy(proxyString);
  if (!proxy) {
    console.error('Invalid proxy: ' + proxyString);
    process.exit(1);
  }

  proxy.ice_ping().then(
    function() {
      process.exit(0);
    },
    function(e) {
      console.error(e instanceof Ice.Exception ? e.ice_name() : e.toString());
      process.exit(1);
    }
  );
}

if (process.argv.length <= 2) {
  console.log('Usage: ice-health-check <proxy>');
  process.exit(1);
}

check(process.argv[2]);
