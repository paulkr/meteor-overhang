meteor-overhang
===============

overhang is a client-side package for notifications, prompts and confirmations in meteor.
It was created after the [overhang.js jQuery Plugin](http://github.com/paulkr/overhang.js).


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
$("body").overhang({
   custom: true, // Set custom to true
   primary: "#34495E", // Your custom primary color
   accent: "#F4B350" // Your custom accent color
});
```

`primary` - The background color of the alert.

`accent` - The bottom border color.

If you want to display either a prompt or confirmation alert, set the type to `prompt` or `confirm`, respectively. Prompts and confirmations both have preset themes, but you can customize them by using the `custom` option.

##### `textColor`

The color of the text. The default is set to white.

##### `message`

The message to be displayed in your alert.

##### `duration`

The duration in seconds to show the alert for. The default is `1.5` seconds.

##### `speed`

The speed to drop and raise the alert in milliseconds. The default is set to `500`.

##### `closeConfirm`

Set this to true if you would like the user to have to close the alert rather than it disappearing by itself. The default is set to `false`.

##### `upper`

Set this to true if you would like your message in all uppercase letters. The default is set to `false`.

##### `easing`

JQuery UI easing option for the drop effect. The default is set to `"easeOutBounce"`

#### Basic Alert Notification Example

```javascript
// Some error notification
$("body").overhang({
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
$("body").overhang({
   type: "prompt",
   message: "What is your name"
});
```

### Confirmations

When using confirmations, there are additional options that you can customize.

##### `yesMessage`

This is the text on the "true" button that would to display. The default is set to `"Yes"`.

##### `noMessage`

This is the text on the "false" button that would to display. The default is set to `"No"`.

##### `yesColor`

This is the color of the "true" button. The default is set to `"#2ECC71"`.

##### `noColor`

This is the color of the "false" button. The default is set to `"#E74C3C"`.

#### Confirmation Example

```javascript
// Some confirmation
$("body").overhang({
   type: "confirm",
   yesMessage: "Yes please!",
   noMessage: "No thanks."
});
```


Retrieving the Data
------------------

Both the `prompt` and `confirm` features allow you to get input from the user. The data is stored as Session variables.

```javascript

// From a prompt
alert(Session.get("overhangPrompt"));

// From a confirmation (returns either true or false)
alert(Session.get("overhangConfirm"));

```

