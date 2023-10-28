RubyRhod
========


``` mermaid
graph LR;
RR(RubyRhod.ptss)
RD(RepoDoc.ptss)
GD(Gracedown.ptss)
GFM(GFM.ptss)
CM(CommonMark.ptss)

RR -- extends --> RD -- extends --> GD -- extends --> GFM -- extends --> CM
```


Editorial Annotations
---------------------


### a settled section

settled content

### 🟧 an unsettled section

unsettled content

### another settled section

more settled content


[//]: # (this editorial comment will not render under GitHub.com,
         as you see by switching to `GFM.ptss`. You can of course
         see it in the source. [RepoDoc] gives you the option to
         make it visible, rendered nicely as an aside or
         interjection as you can see by using switching to
         `RubyRhod.ptss`, **with full markup rendering**.)


[RepoDoc]: https://textplainly.org/repodoc
