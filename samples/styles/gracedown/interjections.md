Gracedown Interjections
=======================

interjection icon and class 
---------------------------

The following table lists Gracedown's interjection types and the
emoji characters that serve as an "interjection icons" to mark each type. Some types
have more than one possible icon.

| interjection type                                      | interjection icon |
|--------------------------------------------------------|-------------------|
| important                                              | ‼️ 🚩             |
| danger                                                 | 🚫 ⛔ ☠️           |
| warning                                                | ⚠️                |
| question                                               | ❓                 |
| Info                                                   | ℹ️ 📌             |
| Tip                                                    | 💡                |
| positive ('yes', 'good', 'ok', 'pass', 'success', etc) | ✅                 |
| negative ('no', 'bad', 'not ok', 'fail', 'error', etc) | ❌                 |



single-chunk interjections
--------------------------

Any paragraph can be turned into an interjection simply starting
with one of the icons in the table above.

It can be a single line:

⚠️ Do not do **this** at home.

Multiple lines:

⚠️ It is highly advisable that you 
not do **this** at home.

If the first line ends with a `:`, the line will be treated and
rendered as the title/heading of the interjection:

⚠️ Warning: 
Do not do **this** at home.

or equivalently:

⚠️ Warning:
   Do not do **this** at home.

If the first colon is followed by text on the same line, it
will not be treated as a title:

⚠️ Warning: Do not do **this** at home.


✅ So I think this leaves us with the following rules:

    1. First char is one of ⚠️, ‼️, ❗️, ⛔️, ℹ️ or 📌 signifies
       an interjection
    2. Any text on the same line as the symbol ending in a colon `:`
       is treated as the title of the interjection.
    3. The remainder is treated as the body of the interjection. It
       ends on the first black line, *unless* everything is indented
       four spaces, which is covered in the next section.


left border interjections 
-------------------------

If the first element of a left border interjection starts with an
interjection icon

> ☠️ Danger!
>
> Do not do this at home!
>
> Take the following precautions:
>
> 1. Wrap a wet towel around your head.
> 2. Drink a glass of milk.
> 3. Wear open toed sandals.

✅ Decided rules for Gracedown:

  1. A first char of ⚠️, ‼️, ❗️, ⛔️, ℹ️ or 📌 signifies
     an interjection. This is consistent with the other
     forms.

     A title is extracted thusly: 

       - As with paragraphs, everything up to the the next
         punctuation on the same line as the symbol. 
         The *exact* the same rule.
       - Alternatively, no punctuation is needed if there
         is a blank line following the first line. In which
         case everything on the line with the symbol is the title.

     🟠 maybe given the nature of block quotes, aforementioned
        *exact* same rule doesn't make sense? Maybe a blank
        line is the delimiter? Should we support titles that
        span multiple sentences?

     > ⚠️ Cook your specs to 140º before consuming.
     > Half-baked specs can upset your tummy.
     >
     > Also, chocolate covered crickets may be full of protein
     > and covered in [chocolate], but *they are still
     > crickets!*

  2. If the block quote opens wth a heading, whether Setext or
     ATX, and the first character of the heading content is
     one of the trigger symbols, then we have an interjection,
     with the heading content becoming the title.

  3. The remainder of the block quote is treated as the body 
     of the interjection.


### code blocks

✅ So for Gracedown, here is the decision:

    0. hijacking indented blocks doesn't produce the best results, but Gracedown will do them for consistency
       and to avoid surprises. 
    1. A first char of ⚠️, ‼️, ❗️, ⛔️, ℹ️ or 📌 signifies an interjection, regardless of indentation. We do this for two reaons:

       - We the trigger to work consistently. Writer should
         not have to consider the context.
       - We don't want the difference between 3 space indent
         and four spaces to be a catastrophic suprise. 
         Instead, if someone accidentally uses an extra space,
         it will stil render as an interjection in degraded
         mode, even if not ideally.


### Escaping trigger symbols

Needing to start a paragraph with "⚠️" is highly unlikely. 
The most likely cases involves referencing "⚠️" just as I
did there, as a word being talked about (therefore in quotes)
rather than a word or symbol participating in the sentence.
A quoted "⚠️"  won't trigger since the first character is 
the quotation mark (or single tick, etc).

"⚠️" is a language neutral symbol signifying "caution!" or
"beware!" or "warning!"

`⚠️` acts as a trigger for warning admonitions.

**BACKSLASH ESCAPE DOESN'T WORK.** Options:

1. not a problem. no one needs to start a para with these
   symbols without quotes
2. require that an indent of 1-3 spaces be used.


### styling of each type

‼️ Important

🚩 Important

🚫 Danger!

⛔ Danger!

☠️ Danger! 

⚠️ Warning / Caution. 

❓ Question?

ℹ️ Info / Note

📌 Info / Note

💡 Tip

✅ generic positive: 'yes', 'good', 'ok', 'pass', 'success', 'recommended', etc

❌ generic negative: 'no', 'bad', 'not ok', 'fail', 'error', 'not recommended', etc
