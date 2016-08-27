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
  }

  /**
   * Defaults attributes
   */
  getDefaults () {
    return {
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
      easing       : "easeOutBounce",
      html         : false,
      callback     : () => {}
    };
  }

  notify (args) {

    const element = $(".overhang"); // Element

    // Reset overhang if it is called again while the animation is not finished
    element.finish();
    element.slideUp(50);
  
    const attributes = $.extend(this.getDefaults(), args); // Attributes
    
    // Overhang properties
    const closeButton = $(".overhang-close");
    const inputField  = $(".overhang-prompt-field");
    const yesButton   = $(".overhang-yes-option");
    const noButton    = $(".overhang-no-option");
    const message     = $(".overhang-message");
  
    // Remove old instances of elements
    closeButton.hide();
    inputField.hide();
    yesButton.hide();
    noButton.hide();

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

    // Style message
    message.css("color", attributes.textColor);

    // Assign html or text
    if (attributes.html) {
      message.html(attributes.message);
    } else {
      message.text(attributes.upper ? attributes.message.toUpperCase() : attributes.message);
    }

    // Add the text to the buttons
    yesButton.text(attributes.yesMessage);
    noButton.text(attributes.noMessage);

    yesButton.css("background-color", attributes.yesColor);
    noButton.css("background-color", attributes.noColor);

    // Handle close button
    if (attributes.closeConfirm) {

      // Set the accent color to the close button
      closeButton.css("color", attributes.accent);

      closeButton.show();
    }

    // Prompt alert
    if (attributes.type === "prompt") {

      // Reset the session variable to null
      Session.set("overhangPrompt", null);

      // Show and focus the input field
      inputField.show();
      inputField.focus();

      // Submit action
      inputField.keydown((e) => {
        if (e.keyCode == 13 && inputField.is(":focus")) {

          // Add the value to a session variable
          Session.set("overhangPrompt", inputField.val());

          element.slideUp(attributes.speed, () => {
            attributes.callback(Session.get("overhangPrompt"));
            inputField.val(""); // Reset input
            inputField.unbind("keydown"); // Unbind keydown event
          });
        }

      });

      // Confirmation alert
    } else if (attributes.type === "confirm") {

      // Show the option buttons
      yesButton.show();
      noButton.show();

      // Reset the session variable to null
      Session.set("overhangConfirm", null);

      // Append the boolean selection to a session variable
      yesButton.click(() => {
        Session.set("overhangConfirm", true);
        element.slideUp(attributes.speed, () => {
          attributes.callback(Session.get("overhangConfirm"));

          // Unbind click events
          yesButton.unbind("click");
          noButton.unbind("click");
        });
      });

      noButton.click(() => {
        Session.set("overhangConfirm", false);

        element.slideUp(attributes.speed, () => {
          attributes.callback(Session.get("overhangConfirm"));

          // Unbind click events
          noButton.unbind("click");
          yesButton.unbind("click");
        });
      });
    }

    // Animate drop down and up
    if (attributes.closeConfirm) {
      element.slideDown(attributes.speed, attributes.easing);

      // Allow click to close
      closeButton.click(() => {
        if (attributes.type !== "prompt" && attributes.type !== "confirm") {
         
          element.slideUp(attributes.speed, () => {
            attributes.callback();
            closeButton.unbind("click"); // Unbind click event
          });
        } else {
          element.slideUp(attributes.speed);
        }
      });

    } else {
      element
        .slideDown(attributes.speed, attributes.easing)
        .delay(attributes.duration * 1000)
        .slideUp(attributes.speed, () => {
          attributes.callback();
        });
    }
  }
}

overhang = new Overhang();
