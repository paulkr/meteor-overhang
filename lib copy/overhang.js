/**
 * meteor-overhang
 * overhang.js
 */

$.fn.overhang = function (arguments) {

  var $element = $("body");
  var $overhang = $("<div class='overhang'></div>");

  $(".overhang").remove();

  // FlatUI color themes
  var themes = {
    "success" : ["#2ECC71", "#27AE60"],
    "error"   : ["#E74C3C", "#C0392B"],
    "warn"    : ["#E67E22", "#D35400"],
    "info"    : ["#3498DB", "#2980B9"]
  };

  // Default attributes
  var defaults = {
    type         : "success",
    message      : "This is an overhang.js message!",
    textColor    : "#FFFFFF",
    duration     : 1.5,
    speed        : 500,
    closeConfirm : false,
    upper        : false,
    easing       : "easeOutBounce",
  };

  // Raise the overhang alert
  function raise () {
    $overhang.slideUp(attributes.speed);
  }

  var attributes = $.extend(defaults, arguments);

  // Set attribut primary and accent colors
  if (arguments.custom) {
    attributes.primary = arguments.primary;
    attributes.accent  = arguments.accent;
  } else {
    attributes.primary = themes[attributes.type][0] || "#ECF0F1";
    attributes.accent  = themes[attributes.type][1] || "#BDC3C7";
  }

  // Style colors
  $overhang.css("background-color", attributes.primary);
  $overhang.css("border-bottom", "6px solid " + attributes.accent);

  // Message
  var $message = $("<span class='message'></span>");
  $message.css("color", attributes.textColor);
  $message.text(attributes.upper ? attributes.message.toUpperCase() : attributes.message);

  $overhang.append($message);

  // Close button
  if (attributes.closeConfirm) {
    var $close = $("<span class='close'></span>");
    $close.css("color", attributes.accent);

    if (attributes.type !== "confirm") {
      $overhang.append($close);
    }
  }

  // Attack overhang to element
  $element.append($overhang);

  // Animate drop down and up
  if (attributes.closeConfirm) {
    $overhang.slideDown(attributes.speed, attributes.easing);

    $close.click(function () {
      raise();
    })
  } else {
    $overhang
      .slideDown(attributes.speed, attributes.easing)
      .delay(attributes.duration * 1000)
      .slideUp(attributes.speed);
  }

}
