This text is written in Markdown. In fact, it is written in a few
variants of Markdown, starting with the basic [CommonMark]
standard in the first section, in [GitHub-favored Markdown] (GFM)
in the next, and finally in Gracedown. Gracedown adds a number
of extensions designed to degrade gracefully when treated as
generic Markdown.


> 📌 You can see how each of the variants are rendered under different
> rules. For example, to see how the GFM section fairs under standard
> CommonMark rules, use "CommonMark.ptss".
> 
> If you are viewing this within *textplain.js \*live\**, just select it
> from the stylesheet dropdown.


CommonMark
----------

1. item one
2. item two
   - sublist
   - sublist



GitHub-flavored Markdown (GFM)
------------------------------

The most significant element that GFM adds to basic Markdown is
the table:

| Markdown format | tables | interjections |
|-----------------|--------|---------------|
| CommonMark      | no     | no            |
| Github          | yes    | no            |
| GraceMark       | yes    | yes           |

    ⚠️ Notice how under `CommonMark.ptss`, the table becomes 
       entirely unreadable. It will render as intended, of 
       course, if you choose the `GFM.ptss` stylesheet. You
       can also try any other stylesheet that supports the 
       GFM plain text table format.


GraceMark
---------

GraceMark leverages fenced code blocks as a way to support
new block elements, both predefined and user definable.

> 📌 From the list of stylesheets, choose `GraceMarkup.ptss`
>    to see how it renders in full form, and choose 
>    `CommonMark.ptss` to see how it would gracefully degrade
>    using a generic Markdown parser. In fact, notice how this 
>    block itself is rendered.

### Graceful Interjections (Admonitions)

``````````````````````````````````````` ⚠️
Chocolate covered crickets may be full of protein
and covered in chocolate, but they are still
crickets!
```````````````````````````````````````

``````````````````````````````````````` 
⚠️ Warning:
Chocolate covered crickets may be full of protein
and covered in chocolate, but they are still
crickets!
```````````````````````````````````````


> ⚠️ Warning
> 
> The `⚠️` Chocolate covered crickets may be full of protein
> and covered in chocolate, but they are still
> crickets!


> ### ⚠️ Warning
> This Warning uses the ATX style for its heading
> and covered in chocolate, but they are still
> crickets!

### Graceful Tables

GraceMark supports two ways of making tables degrade gracefully.

#### Using Indentation

    | Markdown format | tables | interjections |
    |-----------------|--------|---------------|
    | CommonMark      | no     | no            |
    | Github          | yes    | no            |
    | GraceMark       | yes    | yes           |

This works under basic Markdown, because it is treated as
a code block and thus is rendered in the HTML pretty 
much the same as in the source plain text. Not as pretty 
as a fully rendered HTML table but just as readable as it
was in the plain text.

#### Using Fences

```````````````````````````````````````````` Table 1
| Markdown format | tables | interjections |
|-----------------|--------|---------------|
| CommonMark      | no     | no            |
| Github          | yes    | no            |
| GraceMark       | yes    | yes           |
````````````````````````````````````````````

Using fences achieves the same thing as indenting by four
spaces in CommonMark. But it won't work for the original
Gruber Markdown.


[CommonMark]: https://commonmark.org
[GitHub-favored Markdown]: https://github/gfm
[GFM]: https://github/gfm
[TextPlain.js]: https://github.com/textplainly/textplain.js
[Plain Text Style Sheet]: https://github.com/textplainly/ptss
[PTSS]: https://github.com/textplainly/ptss
[PTSS IR]: https://github.com/textplainly/ptss-ir

