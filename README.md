react-action-tabs
=================

A tab widget that triggers actions and supports dropdown options. Also supports panels. Still in beta, more to come once I have a chance to work with it.

Why not just use other tab systems? Sometimes I want a tab that only fires an action, it does not need to have a panel. Action-Tabs will trigger an action when they are clicked. If there is an associated panel, they will open that panel. Otherwise, they leave everything alone. Optionally, you can add a `hidePanels` attribute to an action that will hide any other open panels (if any are open). There is also a `toggleable` attribute that allows the option to toggle its panel on click.


## Dev Notes

Note: this readme is not up to beta standards. It is ugly and not ready to be read. If you need to use project, please look at the tests folder and teh App.js example.

Note: these components need different names, TabXYZ is a terrible name

Option Attributes
  name
  action
  hideOtherPanels
  toggleable

widget attributes
  allowMultiplePanels


TabOption will use name if no children
  takes a single child element (root)
  generally, I use spans in tab options
  can probably do other things, with undefined results
  - noActivePassthrough - set when tabbar should not set an `active` prop to selected options/panels

TODO
  - remove radium (dev dep only)
  - add stub for styles object in tests

Can set className for each element
can set style for each element
talk about default styles (default because I find them useful in my project).
