#!/usr/bin/env phantomjs

var page = require('webpage').create(),
    args = require('system').args,
    util = require('util');

if (args.length === 1) {
    console.log('Please specify the URL to an SSL page.');
    phantom.exit(1);
}
page.onResourceReceived = function (response) {
    if (response.stage == "start") {
        var protocol = response.url.substr(0, 8);

        console.log(util.inspect(response.url));

        if (protocol !== "https://" && response.url.substr(0, 5) !== "data:") {
            console.log("ALERT: The secure page " + args[1] + " loaded an insecure asset " + response.url + " which may trigger warnings and hurt customer perception.");
            phantom.exit(1);
        }
    }
};

page.open(args[1], function(status) {
    if (status === "success") {
        console.log("All good!");
        phantom.exit(0);
    }
    else {
        console.log("Could not open " + args[1]);
        phantom.exit(1);
    }
});