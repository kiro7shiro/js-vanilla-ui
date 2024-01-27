### JS-VANILLA-UI

This project is a programming style to avoid code repetition. To construct individual behaviors for different controls and use less external dependencies.
The current approach is to use ejs to render several individual html templates and store the event handling of each control in a separate class.
Each class derives from a base class. 
??? Which handles all functionality to add the html to the dom. The base class adds convenience functions, too. ???
