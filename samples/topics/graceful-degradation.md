Designing a Style that Degrades Gracefully as Markdown
======================================================

There are many things that Markdown, CommonMark and GFM do not support but have broad appeal:

- interjections

  The goal, of course, is to have the gracefully degraded form
  still stand apart from surrounding text and clearly look like
  an interjection despite re-using the form of non-interjection
  block.

- adding anchors to any block

- adding attributes to blocks



We'll explore various techniques for extending CommonMark / GFM in a gracefully degrading backward compatible way, and see how they'd work for the above wish-list.

> Maybe Gracedown for gracefully degrading elements using CommonMark, and GracedownGFM for one that leverages GFM elements, e.g. tables.



Requirements
----------------------

1. **Degrades gracefully.**  ***On GitHub.***

   Markdown tools can add special support for new types at their own pace or only those that matter for their target user audience. Rendering doesn't break.

2. **It's content-safe.** Content doesn't get lost or mangled even when you use legacy Markdown tools. 

   - Markdown tools know not to mess with the text within a Fenced Code Block. Even Typora which has a habit of re-writing Markdown stays out of the FCB.  This means that even if you pass your content through a tool that only supports generic Markdown, nothing will be lost.

3. **International.** Does not introduce terms from English or any language into the syntax 


### GitHub

This page appears to be maintained, as it includes the recent deprecation and
update to their admonition syntax:
https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax




hijacking container blocks
--------------------------

### block quotes

This is already a common practice by many Markdown writers
who want a way to do Caution, Warning, Note, Information and
other kinds of interjection boxes, taking advantage of the 
common rendering of blockquotes setting them apart from the
surrounding text. 

(link to Coding Horror's comment). 

> ⚠️ Warning
>
> Chocolate covered crickets may be full of protein
> and covered in [chocolate], but *they are still
> crickets!*
>
> Do not do **this** at home.

One nice advantage: any embedded headings do not participate in the section
hierarchy, outlines and TOC. 


#### example: interjections

Advantages:

1. ALL the benefits of *repurposed paragraphs*
2. container, so multiple paragraphs, etc
3. can have heading, bolder, stands out more in degraded form

Disadvantages:

1. Not as clean or pretty in the plain text. 
   Lazy continuation can help if it's
   only a single paragraph, but gets ugly again when
   there are more than one.


> ⚠️ Chocolate covered crickets may be full of protein
> and covered in [chocolate], but *they are still
> crickets!*

prettier:

>⚠️ Chocolate covered crickets may be full of protein 
and covered in [chocolate], but *they are still
crickets!*

but gets ugly again with multiple paragraphs:

>⚠️ Chocolate covered crickets may be full of protein
and covered in [chocolate], but *they are still
crickets!*
>
> Do not do **this** at home.

Symbol on own line:

> ⚠️
> Chocolate covered crickets may be full of protein
> and covered in [chocolate], but *they are still
> crickets!*

With titles:

> ⚠️ Warning
>
> Chocolate covered crickets may be full of protein
> and covered in [chocolate], but *they are still
> crickets!*
>
> Do not do **this** at home.

Failed attempt to make it cleaner:

> ⚠️ Warning
>
> Chocolate covered crickets may be full of protein
> and covered in [chocolate], but *they are still
> crickets!*
>
> Do not do **this** at home.


Better titles in the degraded form:

> ⚠️ Warning
> ---------
>
> This warning uses the Setext style for its heading
> and covered in [chocolate], but *they are still
> crickets!*

or:

> ⚠️ Cook your specs to 140º before consuming
> ------------------------------------
>
> Half-baked specs can upset your tummy.
>
> Also, chocolate covered crickets may be full of protein
> and covered in [chocolate], but *they are still
> crickets!*

Failed attempt to clean:

> ⚠️ Cook your specs to 140º before consuming
> ------------------------------------
>
> Half-baked specs can upset your tummy.
>
> Also, chocolate covered crickets may be full of protein
> and covered in [chocolate], but *they are still
> crickets!*



#### example: quotation w/ citation

The last line contains a convention for citing the source work. This pattern could be the basis of changing this "indented code block" to a block quotation with citation metadata.

```
yada yada

> Why? I came into this game for the action, the excitement. Go
> anywhere, travel light, get in, get out, wherever there's trouble,
> a man alone. Now they got the whole country sectioned off, you
> can't make a move without a form.
>
> ~ Harry Tuttle in *Brazil*

blah blah blah somehow the above quote seems relevant here blah blah think about it.
```




#### example: pull quotes

I've also block quote syntax combined with heading syntax and sometimes nice quotation mark chars to simulate [pull quotes](link-to-def):

> ### *〝Only those with money to lose have money to win.〞*




### list items

*   ⚠️ Warning

    From the list of stylesheets, switch between
    "CommonMark" and "GraceMark" to see how the
    following extensions are readable under both.
    In fact, notice how this block itself is rendered.

Added emphasis in both plain text and degraded renderings:

*   ***⚠️ Warning***

    From the list of stylesheets, switch between
    "CommonMark" and "GraceMark" to see how the
    following extensions are readable under both.
    In fact, notice how this block itself is rendered.

Using a Setext title: 

*   ⚠️ Warning
    ----------
    From the list of stylesheets, switch between
    "CommonMark" and "GraceMark" to see how the
    following extensions are readable under both.
    In fact, notice how this block itself is rendered.

Using an ATX title: 

*   ## ⚠️ Warning
    From the list of stylesheets, switch between
    "CommonMark" and "GraceMark" to see how the
    following extensions are readable under both.
    In fact, notice how this block itself is rendered.



This stands out even more in the plain text and degraded rendering:

*   #### ⚠️ Warning ##################################

    From the list of stylesheets, switch between
    "CommonMark" and "GraceMark" to see how the
    following extensions are readable under both.
    In fact, notice how this block itself is rendered.


#### one of the list bullets

A style could reserve one of the three bullet chars
`-`, `+` or `*` for a new purpose. For example, 
could treat all `*` bullet items as an interjection:

*   Warning

    From the list of stylesheets, switch between
    "CommonMark" and "GraceMark" to see how the
    following extensions are readable under both.
    In fact, notice how this block itself is rendered.


#### bullet item as a subtitle

+ #### *how a - bullet + emphasis right after title makes a subtitle*



### indented code blocks



#### example: interjections

A 4+ indent triggers an  *indented container*. 

    ⚠️ Do not do **this** at home.
    
    It's a really bad idea.

With title:

         ⚠️ Warning
    
    Do not do **this** at home.
    
    It's a really bad idea.

While the plain text looks much like the repurposed paragraph forms above, and while the Gracedown output will also be treated the same 
(with exception that title doesn't require punctuation to separate it
from the body), the degraded Markdown rendering will differ as follows:

    1. code block monospace formatting
    2. No soft line wrapping or reflowing of the text.
    3. No Markdown processing.

As you can see in the above examples, it works fine, perhaps even
beautifully for short interjections. But it breaks down if the 
interjection is longer or has styled text or links.


    ⚠️ Cook your specs to 140º before consuming.
    --------------------------------------------
    Half-baked specs can upset your tummy.
    
    Also, chocolate covered crickets may be full of protein
    and covered in [chocolate], but *they are still
    crickets!*


It does allow other forms not requiring a unique symbol
trigger:

    ---- Warning ----
    Cook your specs to 140º before consuming. 


The latter doesn't seem worth supporting.



### fences



#### example: plugins

See Typora's usage.



#### example: interjections

Fenced approaches have the same disadvantages as the indented
approach explored above:

    1. code block monospace formatting
    2. No soft line wrapping or reflowing of the text.
    3. No Markdown processing.

It has exactly two differences

    1. it appears differently in the plain text. A different
       aesthetic.
    2. it supports an info string that appears in the pain text
       but ignored for the Markdown rendering (we won't be using
       language names that trigger code formatting)

Difference 2 can be exploited for other purposes (see 
*hijacking info strings*), but it doesn't really do anything
for interjections. We want the symbol to be visible in the 
degraded form, so it must be included in the content of the
fenced block. There really isn't any metadata not already
embedded within the symbol choice that we'd put in the 
info string.

Though arguably ⚠️ in the info string is the cross-lingual 
way to trigger an interjection without having that symbol
be in the output, either Gracedown or degraded as Markdown: 


``````````````````````````````````````` ⚠️
             WARNING
Chocolate covered crickets may be full of protein
and covered in chocolate, but they are still
crickets!
```````````````````````````````````````

``````````````````````````````````````` ⚠️
                హెచ్చరిక
                
చాక్లెట్ కవర్ క్రికెట్స్ ప్రోటీన్ నిండి ఉండవచ్చు
మరియు చాక్లెట్లో కప్పబడి ఉంటుంది, కానీ అవి
ఇప్పటికీ ఉన్నాయి క్రికెట్స్!
```````````````````````````````````````

We could even allow this:

~~~~~~~~~~~~~~ ⚠️ ~~~~~~~~~~~~~~~
УВАГА

Цвіркуни, покриті шоколадом, можуть бути насичені білком
і в шоколаді, але вони все ще є
цвіркуни!
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

But it doesn't make a whole lot of sense. I think the
degraded versions with the symbol in the content are much
better:

```````````````````````````````````````
            ⚠️ WARNING
Chocolate covered crickets may be full of protein
and covered in chocolate, but they are still
crickets!
```````````````````````````````````````

```````````````````````````````````````
            ⚠️ హెచ్చరిక
                
చాక్లెట్ కవర్ క్రికెట్స్ ప్రోటీన్ నిండి ఉండవచ్చు
మరియు చాక్లెట్లో కప్పబడి ఉంటుంది, కానీ అవి
ఇప్పటికీ ఉన్నాయి క్రికెట్స్!
```````````````````````````````````````

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
⚠️ УВАГА

Цвіркуни, покриті шоколадом, можуть бути насичені білком
і в шоколаді, але вони все ще є
цвіркуни!
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


We could also allow the following, stripping both symbols
from the title for the full Gracedown rendering:

``````````````````````````````````````````````````````````
              ⚠️ ADVERTENCIA ⚠️
     
Los grillos cubiertos de chocolate pueden estar
llenos de proteínas y cubiertos de chocolate, 
pero todavía están grillos!
```````````````````````````````````````````````````````````

BUT AS NOTED BEFORE, we have no line wrapping or
formatting, so should only be used for short
interjections:

````````````````````````````````````````````
    ⚠️ Do not do this at home.
````````````````````````````````````````````

But the above would look so much better without 
the fences!

##### Embedding the title in the fence

Unfortunately, even though this looks really
good in its plain text form, "Warning" is
not visible when rendered as Markdown. But
if the title is enough to make its purpose
clear, maybe support this?

   ~~~~~~~~~~~~~~~~ Warning ~~~~~~~~~~~~~~
   Do Not Do this at Home!

   If one prefers, an interjection title
   can be made using the form of a fenced
   code block. 
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



#### leveraging the two distinct fence characters

**Because there are two fenced chars "`" and "~", one can *always* force code block interpretation**. How does one show code that happens to look like a Fenced Type Block? Simply by using the other fence char. Only one is ever interpreted as an FTB. 


#### for AG / clean tables

- For simple tables, this doesn't buy us anything in terms of adding new
  features (since GFM supports pipe SV tables), but it allows for cleaner
  tables in the source, which may be valuable to those for which GitHub.com
  rendering isn't primary, just desirable for convenient source browsing.
  
  ```
  Col A     Col B
  -----     -----
  one       two
  three     four
            five
  six
  ```
  
- For complex tables, it certainly adds features, e.g. row and column spanning,
  and anything else AG tables will support.

  ```
  Col A   |  Col B
          |  sub col b1  |  sub col b2
  -----   |  ---------   |  ----------
  one     |  two         |
  three   |  four
          |  five        |
  six     |
  ```



hijacking leaf blocks
---------------------

### paragraphs


#### example: single chunk interjections

Advantages:

1. couldn't get easier
2. yet looks like an interjection in plain text
3. as well as in the degraded rendering.
4. supports markdown formatting
5. flexible plaintext layouts (see below)

⚠️ Do not do **this** at home.

Notice how newlines are ignored in the degraded form of the
next example. We probably shouldn't give them any significance
in a gracefully degrading style: 

⚠️ Warning!
Do not do **this** at home.

Indention is a natural way for humans to make things stand out. 
This works great for interjections in Gracedown, though in 
Markdown, 1-3 space indents will be ignored:

   ⚠️ Do not do **this** at home.

BUT a 4+ indent triggers an  *indented container*. See next
section.

We shouldn't assume the first line is a title for at least two reason:
- The author's intent is isn't clear. There may be no title.
- They don't degrade well:

   ⚠️ Should this line be taken as the a title? Clearly it
   should not. What about the first sentence? It might work in
   some cases, but not all. We should leave the choice to the
   author, providing an explicit means to demarcate the title, 
   if any.

   ⚠️ **What if the title had strong emphasis markup?**
   It does make it stand out like a title. But in degraded rendering
   it runs together with these body lines, which is less than ideal.
   But for some people this approach may be fine.

Using a trailing `\` on the first line to delimit it as the title works great
because the degrade form retains the line break, keeping the intended title on 
its own line. Combined with the icon, it clearly looks like a title just as it
does in the plain text:

   ⚠️ Warning \
   Do not do **this** at home.

Two trailing whitespaces has the same degraded behavior as a `\`,
but without the visual clutter. 

   ⚠️ Warning  
   Do not do **this** at home.

On the other hand, invisible indicators are error prone, and trailing
whitespace sometimes gets stripped by some editors.

One can combining optional strong emphasis markup with the required title
delimiter to make the degraded rendering look even better (the style can 
be designed to ignore the emphais markup in its normal rendering):

   ⚠️ **Warning** \
   Do not do **this** at home.



hijacking GFM tables
--------------------

If we're extending GFM, we can hijack table syntax.

For example, this tables syntax:

```
   | ⚠️ Warning                               |
   | ---------------------------------------- |
   | Cook your specs to 140º before consuming. |
```

becomes:

   | ⚠️ Warning                                |
   |-------------------------------------------|
   | Cook your specs to 140º before consuming. |


> ### ‼️ These look real good on GitHub, but in some other renderings not.
> Some table renderings, such as on markdown-it's demo or the Typora theme
> I'm using, tables have full page width and no side borders.


> #### ❓ How would a PTSS style be designed to take advantage of this?
>
> - We could simply create a table, but with a different class due to the trigger?
>
> - Can PTSS parse the above into something other than a table? i.e. a style with higher precedence than table and maps it to an IT interjection element?
>   - Would involve:
>
>     - a prefix block delim `|`
>     - and ?



This SO answer uses just the header row: https://stackoverflow.com/a/58758521/8910547:

   | ‼️  This is very important |
   |----------------------------|

and

   | 🚫  Ignore at your own risk! |
   |------------------------------|

and

   | 🚩  | Take note of this       |
   |-----|-------------------------|

and

   | 📌  | Remember to not forget! |
   |-----|-------------------------|

and

   | ⚠️ WARNING            |
   |-----------------------|
   | I should warn you ... |

and

   |         ☠️ DANGER          |
   |:--------------------------:|
   | Will explode when clicked! |



hijacking inlines
-----------------

### code spans

#### putting whole sentences or paragraphs in a code span

`📌 From the list of stylesheets, switch between
   "CommonMark" and "GraceMark" to see how the
   following extensions are readable under both.
   In fact, notice how this block itself is rendered.`

📌 `From the list of stylesheets, switch between
   "CommonMark" and "GraceMark" to see how the
   following extensions are readable under both.
   In fact, notice how this block itself is rendered.`

This look awesome as special text that is set apart from the normal text,
*BUT only in cases where inline formatting (emphasis, links, etc) is not needed.*
If that isn't a problem, and there is a need for special text other than
interjections that needs to look different form interjections in the plain text, 
then this can be a good approach.

#### using code spans to represent special symbol using ASCII rather than Unicode/emojis

##### new form of list marker

For example, multiple choice answers:

`A:` try this

`B:` or this

`C:` or maybe this

`D:` all of the above

##### For annotations

e.g. annotation of a paragraph:

`TBD:` paragraph text goes here.

`TENTATIVE:` paragraph text goes here.

`NEEDS REWRITE:` paragraph text goes here.

`NEEDS RETHINK:` paragraph text goes here.


##### As targetable labels and links

`step 1:` preheat oven to 350º

`step 1:` soak the beans in warm water 10 minutes.

`step 3:` about 5 minutes before `step 1` is done, ...


### alternate emphasis/strong syntax

Markdown supports both `*` and `_` to create *emphasis* and *strong* HTML elements.

But we could repurpose one  form with different semantics that would still be fine if rendered as `<em>` and `<strong>`. For example:

| syntax | as Markdown | as Gracedown |
|--------|-------------|--------------|
| `*`    | `<em>`      | `<em>`       |
| `_`    | `<em>`      | `<cite>`     |
| `**`   | `<strong>`  | `<strong>`   |
| `__`   | `<strong>`  | `<u>`        |
|        |             | `<i>`[^2]    |

[^2]: when `i` is specifically what you want, not an indeterminate "emphasis".



hijacking combinations
----------------------
Ideas where a combination of two Markdown markup types when used
in combination might (1) prove useful and (2) be unlikely to exist
in such combination normally so would be safe to use



hijacking HTML
--------------

e.g. `<br>`

### what HTML does GitHub not strip?

https://github.com/github/markup#github-markup

This is out-of-date (no longer used by GitHub) but is likely close to if not
identical to the current whitelist: https://github.com/gjtorikian/html-pipeline/tree/main
(the ab above github/markup page use to point to it directly).




### HTML inlines

### HTML paired blocks ?


### where HTML cause remainder of line to be ignored



hijacking front matter
----------------------
- Github renders front matter
  - though maybe only in the repo browser?


hijacking Mermaid diagrams
--------------------------

idea: a mermaid diagram that when rendered by GitHub is useful,
but does even more when rendered by Gracedown.

in other words, if the diagram contains very specific keywords, then
something additional happens for Gracedown.



hijacking "silent" syntax
-------------------------

> 🌈 regardless of what i choose for Gracedown, demonstrate all of
> this in `kitchen-sink.ptss` to show the power of PTSS and also to
> supply cut-n-paste code for people who want it.



### info strings 

#### attribution blocks ???

a fenced block with `{ }` in the info string:

```{class=aside id=definition-1}
This will be a normal Markdown paragraph under
Gracedown, but with the above attributes
```

### empty fenced blocks

What about an empty fenced block? They are visible, but not in any real bad way,
they look like a think horizontal rule.

``` some invisible directives go here
```


### HTML tags that aren't used 

🌈 should we take advantage of embedded HTML rules somehow?

i.e. use embedded HTML comments in special contexts that will get interpreted by PTSS, but will get ignored and just passed through under Markdown?

examples:
- d


### HTML comments

This uses html comments which are nicely hidden in
the output in Markdown as well as Gracedown:

<!--@class=aside id=definition-1-->
This will be a normal Markdown paragraph under
Markdown or Gracedown, but Gracedown gets the
above attributes.

> ###### likewise this heading with class and ID <!--#id .class-->


### SGML/XML/DOM Processing Instructions

SGML:
(see, for example, <?xml-stylesheet >)

XML:
(see, for example, <?xml-stylesheet ?>)

DOM spec:

https://dom.spec.whatwg.org/#processinginstruction


### any other html tags?

https://spec.commonmark.org/0.29/#html-blocks

- types 2, 3, 4, 5 and 7 are candidates

https://spec.commonmark.org/0.29/#raw-html

- what sets these apart from HTML Blocks?



### link ref defs

#### assign id to para

[abc123]::
paragraph

#### assign id and attribs to para

[abc123]:: (.class font-size=16)
paragraph

#### assign attribs only to para

[#]:: (.class font-size=16)
paragraph


#### comments that don't get rendered

[//]:: (comment goes here)

[//]: # (This is Jetbrains IDEAs form)


#### 🌶 take advantage of BOTH the URL and title fields of a link ref def


#### ANY OTHER USAGES THAT MAKE SENSE?
BESIDES DEFINING anchors, that is? Anchors
make most sense semantically.



hijacking footnotes
-------------------
Two ways:
1. as invisible data, e.g. same as hijacking link ref defs
2. as visible content that has added features when rendered as Gracedown.
   e.g.
   - a footnote with a certain key pattern could be treated as a
     citation ref.
     ```
     A mathematical basis for karma is a recent concept.[^@srinivas2017]

     [^@srinivas2017]: K. Srinivas, *The Karma of Nature, the Nature of Karma*, 2017, Independent Press     
     ```     
   - auto-updating transclusions. the footnote contains a link to the source
     of the transclusion. The author should include


MORE TO ANALYZE
---------------
Compare how the following renders on GitHub:

🚩 This is a [long](url) special text
with **bold** *words*

<kbd>🚩 This is a [long](url) special text
with **bold** *words*

<samp>🚩 This is a [long](url) special text
with **bold** *words*

> 🚩 This is a [long](url) special text
with **bold** *words*

+  🚩 This is a [long](url) special text
   with **bold** *words*

`+  🚩 This is a [long](url) special text
with **bold** *words*`

```
🚩 This is a [long](url) special text
with **bold** *words*
```



control over what is visible in the output
------------------------------------------

Given the flexibility of PTSS, we could hijack a fenced
block triggered either by the info string or the beginning
of the internal content:

~~~markdown
``` trigger
The regular content.
```
~~~

or

~~~markdown
```
trigger
The regular content.
```
~~~

or even

~~~markdown
```
Trigger leading the regular content.
```
~~~

The difference won't matter to a PTSS-based rendering, but
it does matter to how it renders under basic Markdown. In 
the first case the trigger won't be visible, and in the 
latter cases it will.

So a gracefully degrading style could choose either approach,
or even support both, leaving it to the author to decide 
whether they want the trigger rendered.

Here are some examples where fenced blocks are used for 
a Mermaid plugin. They illustrate the flexibility of the option
on what info to show in the gracefully degraded rendering:

1. The trigger "mermaid" and the setting "graph LR" are not rendered

   ~~~markdown
   ``` mermaid: graph LR
   A[Hard edge] -->B(Round edge)
   B --> C{Decision}
   C -->|One| D[Result one]
   C -->|Two| E[Result two]
   ```
   ~~~

2. "Mermaid diagram:" is the trigger and is rendered, but the 
   the setting "graph LR" is not:

   ~~~markdown
   ``` graph LR
   Mermaid diagram:
   A[Hard edge] -->B(Round edge)
   B --> C{Decision}
   C -->|One| D[Result one]
   C -->|Two| E[Result two]
   ```         
   ~~~

3. treat it all as visible content:

   ~~~markdown
   ````
   mermaid:graph LR
   A[Hard edge] -->B(Round edge)
   B --> C{Decision}
   C -->|One| D[Result one]
   C -->|Two| E[Result two]
   ````
   ~~~


One could use fenced blocks to attach attributes to sections
of text. And the style could be designed allowing the author
to decide whether the attributes should be visible in the 
degraded form (**for example, if its not going to render 
correctly, maybe showing the attributes is the next best thing**).
In this case, we could define the style like this: 

> if either the first character of the info string or the content
> is `{-`, the fenced block is treated as a block to be assigned
> attributes, and the attributes are within the `{-   -}` whether 
> they are in the info string or first line of content.



### example: visibility options for interjections

We could support the following distinction:

- If you want to set the interjection class AND
  do not need it visible in the rich rendering
  (e.g. because the class will be rendered
  distinctly) AND are ok with it not being visible
  in the generic Markdown rendering, use
  `typed fenced blocks`.

   ~~~~~~~~~~~~~~~~ Warning ~~~~~~~~~~~~~~
   Do Not Do this at Home!

   If one prefers, an interjection title
   can be made using the form of a fenced
   code block. 
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


- If you want to set a **visible title** as well:

  ``````````````````````````````````````` 
  WARNING!
   
  Chocolate covered crickets may be full of protein
  and covered in chocolate, but they are still
  crickets!
  ```````````````````````````````````````

- If you want to set the interjection class independently
  from a **visible title**, the emoji classifies, and 
  what follows is an arbitrary title:

   ``````````````````````````````````````` 
   ⚠️ Do Not Do This at Home!
  
   Chocolate covered crickets may be full of protein
   and covered in chocolate, but they are still
   crickets!
   ```````````````````````````````````````





### example: alternate text (like alt text for `<img>`) or description

- Perhaps the syntax could include a section of alternate text the renderer should display if the type is unsupported, similar to how image tags include alternate text to display.

  ~~~markdown
  ``` mermaid diagram
  This diagram depicts X, Y and Z
  ---
  (diagram code here)
  ```
  ~~~

- Perhaps a way to distinguish which parts of the block content should be rendered for the reader to read, as opposed to code that would be gibberish (e.g. some complex code for rendering a certain kind of diagram)?





## How to achieve 3 heading levels with Setext

> ### ❌ This idea should probably be abandoned.
> See notes about sections that are more than two deep being BAD WRITING.
>  - the rare exception, e.g. legal docs, technical reference docs,
     >    aren't forms that a natural style needs to target. Those forms
     >    can have their own style sheets.
>
> [//]: # (todo[docs] delete this section once we commit to the above)


### Just use Setext 1, Setext 2 and ATX 3

This is an example where it makes sense for Gracedown NOT add to Markdown but subtracts: ATX 1 and ATX 2 would be expressly disallowed. 

```
Heading
=======

Subheading
----------

### Minor Heading

The above actually looks very intuitive, unlike:

# Heading

## Subheading

### Minor Heading
```







## VisualComparison

### Showcase all the differences

> using blockquote blocks vs fenced code blocks vs indented code blocks, you can get the same PTSS rendering, but they will look different in the source plain text, and will degrade gracefully but differently  when treated as standard Markdown. 



### Comparing Plain Text Appearance



### Comparing HTML Appearance

|                                                                            | bird track | fenced code block                                   | indented code block                                                                                                       | custom |
|----------------------------------------------------------------------------|------------|-----------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|--------|
| text line wrapped in HTML output?                                          | yes        | no. this is the biggest drawback to using this form | less an issue since you are forced to wrap in the source anyway, but not perfect because you have to manually break lines | yes    |
| formats content in HTML output                                             | yes        | no                                                  | no                                                                                                                        | yes    |
| has a component not rendered in HTML output that can be used for metadata? | no         | yes, info string                                    | no                                                                                                                        | can    |
| text alignment that survives HTML rendering?                               | no         | yes, rendered using monospace                       | yes, rendered using monospace                                                                                             | can    |







Combined utility with PTSS
---------------------------------------------------

Any of these methods can be employed by a new plain text format to extend Markdown with needed features. While implementing an all-new parser or an extension to an existing parser isn't easy but it's doable. What's nearly impossible is getting you format adopted as an option by other tools in the ecosystem.

But imagine a world where PTSS had some degree of broad adoption. Now tens or hundreds of new formats and extensions can blossom in this new ecosystem, because only one thing needed to get adopted for all of them. *Force multiplier.*

 

Consider:

````````
``` Warning
Don't do *this* at home.
```
````````

or

```
  > :Warning:
  > Don't do *this* at home.
```



### w/o PTSS, today

1. you need a tool that recognizes this form
2. OR, you need to write a custom plugin or renderer tied to that tool
   - involves programming
   - is tied to that tool. vendor lock-ibn



### w/o PTSS, but part of CommonMark standard

1. Add some rules, such as: 
   - code block: if the info string token starts with a `.`, lowercase it and treat it as a **class name**, and treat the content as Markdown, not code.
   - birdtracks: if the first content line begins and ends with `:`, lowercase it and treat it as a **class name**, 

This:

- is unlikely to happen
- seems to be HTML specific
- is UGLY, as you need 



### w/ PTSS

1. Write cross platform style that maps to the interjection node.







<!-- link ref defs -->

[chocolate]:  https://blazeminds.com/blog/wp-content/uploads/2015/03/Chocolate-Souffle.jpg


[TextPlain.js]: https://github.com/textplainly/textplain.js
[Plain Text Style Sheet]: https://github.com/textplainly/ptss
[PTSS]: https://github.com/textplainly/ptss
[PTSS IR]: https://github.com/textplainly/ptss-ir
[CommonMark]: https://commonmark.org
[GFM]: https://github/gfm
[GraceMark]: https://github.com/textplainly/gracemark





## references

See [this CommonMark discussion](https://talk.commonmark.org/t/feature-request-admonitions-in-commonmark/3619/9?u=vas)

