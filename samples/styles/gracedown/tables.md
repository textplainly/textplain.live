
## block content in tables

paragraphs:

| heading |
| ------- |
| para one<br><br>para two |


list items:

| heading |
| ------- |
| - item one<br>- item two |


interjections even!

| interjection icon | sample |
| ----------------- | ------ | 
| ‼️ | a paragraph, followed by an<br><br>‼️ an important message |
| ⚠️ | ⚠️ Do not feed your dragon mangoes!<br><br>A safe fruit for dragons are bananas.|
| ✅ vs ❌  | - ✅ success!<br> - ❌ epic fail! |



taking Gracedown further than intended, but nothing stopping you from:

| heading |
| ------- |
| - item one<br>- item two<br>  - sub item a<br>  - sub item b<br>- item three |



## gracefully degrading tables

Gracedown extends GFM.ptss, so one can used GFM tables.

But if you wanted a table that degrades gracefully under generic Markdown processing,
or one the sticks with CommonMark without the GFM table extension, you can
used Gracedown's own *gracefully degrading* align-grid tables placed within
regular Markdown code fences:

```````````````````````````````````````````
             Diameter (km)   Size vs Earth  
  Mercury    4,879.4         38% 
  Venus      12,104          95%  
  Earth      12,756          100% 
  Mars       6,779           53%
```````````````````````````````````````````
