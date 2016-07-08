/**
 * meteor-overhang
 * overhang.js
 */

class Overhang {

  constructor () {

    // Default themes
    this.themes = {
      "success" : ["#2ECC71", "#27AE60"],
      "error"   : ["#E74C3C", "#C0392B"],
      "warn"    : ["#E67E22", "#D35400"],
      "info"    : ["#3498DB", "#2980B9"],
      "prompt"  : ["#9B59B6", "#8E44AD"],
      "confirm" : ["#1ABC9C", "#16A085"],
      "blank"   : ["#34495E", "#2C3E50"]
    };

    // Defaults attributes
    this.defaults = {
      type         : "success",
      message      : "This is an overhang.js message!",
      textColor    : "#FFFFFF",
      yesMessage   : "Yes",
      noMessage    : "No",
      yesColor     : "#2ECC71",
      noColor      : "#E74C3C",
      duration     : 1.5,
      speed        : 500,
      closeConfirm : false,
      upper        : false,
      easing       : "easeOutBounce"
    };
  }

  notify (args) {

    // Remove old instances of elements
    $(".close").remove();
    $(".yes-option").remove();
    $(".no-option").remove();
    $(".prompt-field").remove();

    const element = $(".overhang"); // Element
    const attributes = $.extend(this.defaults, args); // Attributes

    // Set default value
    const validTypes = ["success", "error", "warn", "info", "prompt", "confirm"];
    if ($.inArray(attributes.type, validTypes) === -1) {
      attributes.type = "blank";

      // Notify the user
      console.log("You have entered invalid type name for an overhang message.");
    }

    // Set attribute primary and accent colors
    if (args.custom) {
      attributes.primary = args.primary;
      attributes.accent  = args.accent;
    } else {
      attributes.primary = this.themes[attributes.type][0] || "#ECF0F1";
      attributes.accent  = this.themes[attributes.type][1] || "#BDC3C7";
    }

    if (attributes.type === "prompt" || attributes.type === "confirm") {
      attributes.primary      = args.primary || this.themes[attributes.type][0];
      attributes.accent       = args.accent  || this.themes[attributes.type][1];
      attributes.closeConfirm = true;
    }

    // Style overhang colors
    element.css("background-color", attributes.primary);
    element.css("border-bottom", "6px solid " + attributes.accent);

    // Message
    $(".overhang .message").css("color", attributes.textColor);
    $(".overhang .message").text(attributes.upper ? attributes.message.toUpperCase() : attributes.message);

    // Additional overhang elements
    const inputField = $("<input class='prompt-field' />");
    const yesButton = $("<button class='yes-option'>" + attributes.yesMessage + "</button>");
    const noButton = $("<button class='no-option'>" + attributes.noMessage + "</button>");

    yesButton.css("background-color", attributes.yesColor);
    noButton.css("background-color", attributes.noColor);

    let close; // Close button

    // Handle close button
    if (attributes.closeConfirm) {

      // Create and append the close button to the overhang alert
      close = $("<div class='close'></div>");
      element.append(close);

      // Set the accent color to the close button
      $(".overhang .close").css("color", attributes.accent);
    }

    // Prompt alert
    if (attributes.type === "prompt") {
      element.append(inputField);

      // Reset the session variable to null
      Session.set("overhangPrompt", null);

      // Submit action
      inputField.keydown(function (e) {
        if (e.keyCode == 13) {

          // Add the value to a session variable
          Session.set("overhangPrompt", inputField.val());
          element.slideUp(attributes.speed);
        }
      });

      // Confirmation alert
    } else if (attributes.type === "confirm") {

      // Append the buttons
      element.append(yesButton);
      element.append(noButton);
      element.append(close);

      // Reset the session variable to null
      Session.set("overhangConfirm", null);

      // Append the boolean selection to a session variable
      yesButton.click(function () {
        Session.set("overhangConfirm", true);
        element.slideUp(attributes.speed);
      });

      noButton.click(function () {
        Session.set("overhangConfirm", false);
        element.slideUp(attributes.speed);
      });
    }

    // Animate drop down and up
    if (attributes.closeConfirm) {
      element.slideDown(attributes.speed, attributes.easing);

      // Allow click to close
      $(".overhang .close").click(function () {
        element.slideUp(attributes.speed);
      });

    } else {
      element
        .slideDown(attributes.speed, attributes.easing)
        .delay(attributes.duration * 1000)
        .slideUp(attributes.speed);
    }
  }
}

overhang = new Overhang();
