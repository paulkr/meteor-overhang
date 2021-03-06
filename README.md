meteor-overhang
===============

`overhang` is a client-side package for notifications, prompts and confirmations in meteor.

[Check out a demo!](http://meteor-overhang.herokuapp.com)


Usage
-----

To add the package to your project, run the following command in your project directory

```shell
$ meteor add paulkr:overhang
```


Configuration Parameters
------------------------

`overhang` has 3 primary features - notifications, prompts and confirmations. Most of the options are customizable for all of these features.

### Defaults

##### `type`

This is the type of the notification that you want to display.
The preset types are `success`, `error`, `warn`, `info`, `prompt` and `confirm`.

If you would like to use a custom theme, leave this parameter blank and follow the rules for setting a custom theme.

```javascript
overhang.notify({
	custom: true,       // Set custom to true
	primary: "#34495E", // Your custom primary color
	accent: "#F4B350"   // Your custom accent color
});
```

If you want to display either a prompt or confirmation alert, set the type to `prompt` or `confirm`, respectively. Prompts and confirmations both have preset themes, but you can customize them by using the `custom` option.

```javascript
// Basic notification defaults :)
overhang.notify({
	primary: "#2ECC71",      // The background color of the alert.
	accent: "#27AE60",       // The bottom border color.
	textColor: "#FFFFF",     // The color of the text.
	message: "What's up?",   // The message to be displayed in your alert.
	duration: 1.5,           // The duration in seconds to show the alert for.
	speed: 500,              // The speed to drop and raise the alert in milliseconds.
	closeConfirm: false,     // Set this to true if you would like the user to have to close the alert rather than it disappearing by itself.
	upper: false,            // Boolean if the text should be uppercased
	easing: "easeOutBounce", // JQuery UI easing option for the drop effect.
	html: false              // If the message should be rendered as HTML
});
```

#### Basic Alert Notification Example

```javascript
// Some error notification
overhang.notify({
	type: "error",
	message: "You could not be logged in at this time.",
	closeConfirm: "true"
});
```

### Prompts

When using prompts, all you need to do is set the `type` parameter to `"prompt"`.

#### Prompt Example

```javascript
// Some prompt notification
overhang.notify({
	type: "prompt",
	message: "What is your name"
});
```

### Confirmations

When using confirmations, there are additional options that you can customize.

```javascript
// Confirmation alert defaults :)
overhang.notify({
	yesMessage: "Yes",      // The text for the "true" option button.
	noMessage: "No",        // The text for the "false" option button.
	yesColor: "#2ECC71",    // The "true" button color,
	noColor: "#E74C3C"      // The "false" button color
});
```

#### Confirmation Example

```javascript
// Some confirmation
overhang.notify({
	type: "confirm",
	yesMessage: "Yes please!",
	noMessage: "No thanks."
});
```


Retrieving the Data
------------------

Both the `prompt` and `confirm` features allow you to get input from the user. The data is stored as Session variables.

To retrieve the data, you simply pass in a callback function with one parameter:

```javascript
overhang.notify({
   type: "prompt",
   message: "What is your name",
   callback: function (value) {
      alert("You entered " + value);
   }
});
```

or you can access it manually as so:

```javascript
alert(Session.get("overhangPrompt")); // From a prompt
alert(Session.get("overhangConfirm")); // From a confirmation
```

Callbacks
---------

The option callback argument is a function that will run once the user has made an action on the overhang notification. The callback will run after any of these cases:

- The submission of a prompt
- The selection on a confirmation
- The close button on a normal notification with a true `closeConfirm`
- The raise of a normal notification

Note: For confirmations or prompts, the callback will not run when the close button is clicked and nothing is selected.

#### Example
```javascript
overhang.notify({
	type: "confirm",
	message: "Are you sure?",

  // This code will run once an option is clicked.
	callback: (selection) => {
		var answer = selection ? "yes" : "no";
		alert("You made your selection of " + answer);
	}
});
```
