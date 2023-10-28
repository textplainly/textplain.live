Quick links:

- [gracedown](style/gracedown)
  - [alt link](style/gracedown/README.md)
- [graceful degradation](topics/graceful-degradation.md)

- [github pages](https://square.github.io/okhttp)
  - [github.com](https://github.com/square/okhttp/blob/master/README.md) -- this DID NOT WORK, even when hosted on GitHub Pages:
    ```
    [Error] Origin https://textplainly.github.io is not allowed by Access-Control-Allow-Origin. Status code: 200
    [Error] XMLHttpRequest cannot load https://github.com/square/okhttp/blob/master/README.md due to access control checks.
    [Error] Failed to load resource: Origin https://textplainly.github.io is not allowed by Access-Control-Allow-Origin. Status code: 200 (README.md, line 0)
    ```
  - [raw.githubusercontent.com + README.MD](https://raw.githubusercontent.com/square/okhttp/master/README.md) -- this DOES work from TPL hosted anywhere. 
  - [api.github.com](https://api.github.com/repos/square/okhttp/git/trees/master) - works too. BUT:
    > "For requests using Basic Authentication or OAuth, you can make up to 5,000 requests per hour. For unauthenticated requests, the rate limit allows you to make up to 60 requests per hour. Unauthenticated requests are associated with your IP address, and not the user making requests."

- [raw.githubusercontent.com](https://raw.githubusercontent.com/vassudanagunta/htmlnorm/main/README.md)


https://api.github.com/repos/square/okhttp

> 
> # 🌶 NEW
>
> ## 🌈 INSTRUCTIONS
> 
> ### cool way to demonstrate both stylesheets and the STIR
>
> 1. On the right pane, switch to the `STIR` (not `STIR tree`) view tab
>
> 2. On the left, open an existing plain text page from the drop down OR press CLEAR if you want to write your own plain text from scratch
>    - If you opened an existing, the default stylesheet for that page will be selected for you. If you are a beginner, don't change that. If you have started to figure out what's going on, feel free to choose another stylesheet, but know that it may not recognize the format of the doc you've chosen.
>    - If you are starting form scratch, choose a stylesheet whose syntax you understand, e.g. Markdown. If you want to try a new stylesheet, you may want to go to the demo page for that stylesheet first. (WHICH YOU CAN EDIT BTW!  🌈 the demo for each stylesheet should talk about switching to the STIR view to watch "what happens behind the scenes") 
> 
> 3. Now edit existing content or add new stuff, and watch the right pane for what changes. You can see the abstract structure of your doc change *live*! 
>
> ### a cool way to see what TextPlain.js can render
>
> 1. #### 🌶🌈 TPL can download plaintext from any URL (**ONLY** if it is mime type plain text, otherwise we refuse)
>
>    we figure out the default stylesheet and render it.
>
> 2. #### 🌶🌈 WE USE ONE (or both OF THE FOLLOWING SOLUTIONS TO MAKE LINKS NAVIGABLE
>
>    We make the links in the source pane (left) navigable!!! This has the following benefits:
>
>    - This gets around the XSS limitation of the right pane!
>
>    - We can make the links navigable even if the user choose an incompatible stylesheet for rendering, because behind-the-scenes we still use the default one.
>
>    We monitor clicks on the render-preview pane (right), and maybe also on some other tabs, e.g. STIR view link nodes.
>
>    - we than "reverse engineer" the URL for the plain text source (e.g. GitHub) and load that into the left pane. 
>      If they navigate to some place we don't support, the left pane shows a "we don't know whether the page on 
>      the right has plain text source or where it is."
>
> 3. #### 🌶🌈 ALL `TextAssembly` conforming repos are completely navigable!!!      
> 
>    - 🌶🌈 side-benefit: be default, point at my own repos that I want to publicize:
>      - `TextAssembly` of course, since this ends up being a live demo of that!
>      - `htmlnorm`
>      - `blackbox testing`
>      
>    Navigation will work with GitHub conforming links (which follows TextAssembly) so
>    you get minimal nav on many repos. But if a repo follows other TextAssembly conventions,
>    these [TODO: list them] other things also work.
>
> 4. Instead of the sample page drop-down, just have the TPL home page with
>
>    - links to the sample subdir index pages, which can themselves have links to subpages. We could even support `next` `prev` navigation that we can generate on the fly for the pages in a sample subdir)
>    - links to some source plain text on GitHub, particularly ones with links to other pages in the repo.
>
> 5. replace the sample page drop-down with a drop down that shows:
>
>    1. a button for "home"
>    2. a button for "new page"
>    3. a button for "enter plain text source URL, or GitHub repo name"
>    4. below a divider line, a history list populated with 
>       - all pages visited (though these may run of the bottom if the list gets too long)
>       - all pages created. They have a 🆕 icon and they don't get dropped off the list even when it gets long.
>       - any visited pages that are edited have an ✏️ icon). (the edits are stored in memory or local storage if we want persistence across sessions.)
>
>  6. when an  edited page is shown, there is a prominent `✏️ EDITED, press to restore original` button is shown.
> 
>  7. Similarly, the Stylesheet drop down allows entry of any URL (to point to any stylesheet), and an option
>     to edit one of the existing live.



This is a live demo of **[TextPlain.js]**, which is
many things:

 - an extremely customizable plain text parser and
   renderer
   
 - the reference implementation of the [Plain Text
   Style Sheet] (PTSS) specification, in JavaScript.
   
 - completely [CommonMark] and [GFM] compatible
   
 - includes an HTML renderer, easily customizable
   via simple templates. Easy to render other formats
   from the [PTSS IR].



## 🥃 KISS announcement / intro / docs

REMINDER: KEEP THE INTRO/ETC very simple / to the point,
writing for the 80% of the audience that just wants to see
how it works in broad strokes, it advantages, and how it might
work for them.

For the geeks, those who want to critique it, provide links to
technical reference, design philosophy, explorations that drove
decisions, and all other things to geek out on in separate pages.
Perhaps even with a consistent icon such as 🧩 or 🔬 or 🧪 or ?.

