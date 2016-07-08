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
			"blank"   : ["#34495E", "#2C3E50"]
		};

		// Defaults attributes
		this.defaults = {
	    type         : "success",
	    message      : "This is an overhang.js message!",
	    textColor    : "#FFFFFF",
	    duration     : 1.5,
	    speed        : 500,
	    closeConfirm : false,
	    upper        : false,
	    easing       : "easeOutBounce",
	  };
	}

	alert (args) {

		$(".close").remove();

		const element = $(".overhang"); // Element
		const attributes = $.extend(this.defaults, args); // Attributes

		// Set default value
		const validTypes = ["success", "error", "warn", "info"];
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

		// Style overhang colors
	  element.css("background-color", attributes.primary);
	  element.css("border-bottom", "6px solid " + attributes.accent);

		// Message
		$(".overhang .message").css("color", attributes.textColor);
	  $(".overhang .message").text(attributes.upper ? attributes.message.toUpperCase() : attributes.message);

		// Close button
		if (attributes.closeConfirm) {

			// Create and append the close button to the overhang alert
			const close = $("<div class='close'></div>");
			element.append(close);

			// Set the accent color to the close button
	    $(".overhang .close").css("color", attributes.accent);
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
