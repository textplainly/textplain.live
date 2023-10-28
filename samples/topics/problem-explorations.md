#### Problem Explorations


The idea herein is to take a topic such as "laziness" or "respecting line breaks" and present a number of plain text examples, especially problem areas. Then instruct the user to see how different stylesheets handle them.

To be compact and not have the reader deal with reading exposition intertwined with meaningless sample text, try to have the exposition simultaneously serve as the content to be rendered. e.g.

```````````````````````````````````````````` warning
See how this box is rendered by `Markdown`,
`Plain Jane` and `GraceMark`.
````````````````````````````````````````````

   ``````````````````````````````````````````````` warning
   Notice how `Plain Jane` treats the indentation
   of this box as a plain text artifact (to set it 
   apart in that format) but unecessary in an
   HTML rendering.
   ```````````````````````````````````````````````

   ``````````` warning `````````````
   Plain Jane allows you to embed the title
   anywhere in the top border.
   `````````````````````````````````

   `````````````````````````````````
               WARNING
   This style is nice because of how
   well it degrades under normal Markdown
   rendering.
   `````````````````````````````````
