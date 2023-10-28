# How to Create Styles

This is a step-by-step introduction to writing styles.

1. It is designed to be Interactive. Please open this in [Text Plain *Live*].

2. Choose the `tutorial.ptss` stylesheet, which is designed for this tutorial.

> ### tutorial design notes:
> 1. `tutorial.ptss` should be empty OR have just a bare minimum of styles to
>     bootstrap the progressive re-renderering of this very document as we guide the 
>     user to write the styles to correctly render this document in HTML.
> 2. Alternatively start with `CommonMark.ptss` and walk the user through modifying
>    it.  OR perhaps that should be a different tutorial: *Modifying an Existing Style*.

## creating a custom container 

Let's say you'd like the following to be recognized as a block quotation:

```
| You keep using that word. I do not think
| it means what you think it means."
|
| ~ Inigo Montoya, *The Princess Bride*
```

Add the following to `tutorial.ptss`:

```
my-block-quotation {
    name:        Block Quotation
    style-type:  Container
    left-border: |
    stir-type:   block_quote
}
```

The quotation above should immediately be re-rendered differently. Easy, right?

Things to note:
  1. The values on the right hand side are not quoted. Quotations are only 
     needed when leading or trailing spaces are part of the value.
  2. "my-block-quotation" is a unique key for style withing this stylesheet.
     This allows referencing styles as follows: `CommonMark.ptss#setext-heading`
     Such references are used when extending or modifying an existing style,
     and also for error messages and *developer mode* renderings.

One of the reasons it was so easy to write that style is because we took advantage
of a number of defaults. Here it is more explicit:

```
my-block-quotation {
    name:        Block Quotation
    style-type:  Container
    left-border: |
    stir:
         type = 'block_quote'
         content = (parse, (trim, (body)))
         canInterruptParagraph = true
         min-indent = 0
         max-indent = 0
}
```

Now let's say you want the last line, when prefixed with "~", to be interpreted
as a citation. You can do that with a simple change to the style definition:















[Text Plain *Live*]: /link
