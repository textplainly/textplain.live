> *Mark is old-fashioned. Grace has some new moves.*

Gracedown
=========

Gracedown is a *backward compatible* superset of CommonMark & GFM.

> ℹ️ Technically "superset" may not be the correct word with regard to GFM. 
> Because both of the following are true:
>  - All GFM content is valid Gracedown.
>  - All Gracedown content it valid GFM.
> 
> Both are true not just in the technical sense (per Markdown rules, everything
> is valid), but in the visual semantics sense: Gracedown might not look as
> great when rendered as standard GFM, but it still has the same visual structure.

It adds many new capabilities, such as interjections (aka admonitions or alerts), X, Y and Z. 
It achieves backward compatibility by hijacking standard
Markdown structures in a way that gracefully degrades when processed
or rendered by non-Gracedown-aware tools.

The design was based on an exploration of [the many ways this
could be achieved](../../topics/graceful-degradation.md).

ℹ️ Switch between `Gracedown.ptss` and `CommonMark.ptss` to see for
yourself how it renders normally and how it gracefully degrades when
treated as regular Markdown.


> ??? keep this?:
>
> The different options below result in different
> combinations of `plain text form` X `degraded HTML form`
> X `full HTML form`. Gracedown can support ALL of them, 
> giving the author choice... they can choose whichever
> they like or better suits their purpose.


- [Interjections](Interjections.md)
- [Tables](Tables.md)
