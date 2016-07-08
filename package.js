/**
 * meteor-overhang
 * package.js
 */

Package.describe({
  name: "paulkr:overhang",
  version: "0.0.1",
  summary: "A client-side meteor package for notifications, prompts and confirmations.",
  git: "https://github.com/paulkr/meteor-overhang",
  documentation: "README.md"
});

Package.onUse(function (api) {
  api.versionsFrom("1.3.4.1");

  api.use([
    "ecmascript",
    "templating",
    "session",
    "jquery",
    "less",
  ], "client");

  api.addFiles([
    "lib/templates/body.html",
    "lib/templates/overhang.html",
    "lib/stylesheets/overhang.less",
    "lib/js/jquery.easing.js",
    "overhang.js",
  ], "client");

  api.export("overhang");
});
