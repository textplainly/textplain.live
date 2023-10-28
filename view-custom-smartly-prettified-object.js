// todo![rollout] make sure no non-API methods or fields are available
//   to client, and that the ones that are readonly to client have a
//   private member with only a getter

/**
 * Represents a node in the tree representation of an object
 * that is formed by treating all properties of the object as
 * tree nodes, and recursively doing the same for property values
 * that are non-primitive (objects or arrays).
 */
class KVNode {
    /** @type {KVTree} */
    root

    /** @type {KVNode | null} */
    parent

    /** @type {string} */
    key

    /** @type {*} */
    val

    /**
     * additional info when key-value isn't enough, supplied by the decorator
     *
     * todo![api] this doesn't have clear semantics, and it's only being used
     * internally in one case. i believe my original intent was to allow
     * decorators to set this value, in which would be the "human friendly"
     * value representing the object, e.g. for a person object it might be the
     * firstname + lastname fields.
     *
     * @type {string | undefined}
     */
    descriptor = undefined

    /** @type {number} */
    #depth

    /** @type {HTMLElement | undefined} */
    #view = undefined

    #viewExpanded = false

    /**
     *
     * Note: We use `null` rather than `[]` to denote zero valProps for memory
     * efficiency, as primitive properties are more common and none have
     * valProps. Note within note: This may be a silly optimization, and
     * possibly ineffectual if the JS engine already optimizes empty arrays.
     *
     * @type {KVNode[] | null | undefined}
     *   - If `undefined`, valProps unknown (value is not primitive but node not yet expanded)
     *   - If `null`, zero valProps. (actual valProps may have been excluded
     *     by {@link root.decorator}
     */
    #valProps = undefined

    /**
     * public API: readonly, automatically inits valProps, returns empty
     * array rather than `null` if no valProps.
     *
     * @returns {KVNode[]}
     */
    get valProps () {
        if (this.#valProps === undefined) {
            this.initValProps()
        }
        return this.#valProps === null ? [] : this.#valProps
    }

    /**
     * Whether the views of the {@link #valProps} views have been initialized
     * and added to this {@link #view}.
     */
    #valPropViewsInitialized = false

    /**
     *
     * @param {string | null} key, null for root node
     * @param {any} value
     * @param {KVTree} root
     * @param {KVNode | null} parent
     */
    constructor (key, value, root, parent) {
        this.root = root
        this.parent = parent
        this.key = key
        this.val = value
        this.#depth = parent ? parent.#depth + 1 : 0

        // if value is primitive, there are no valProps
        if (this.type !== 'object' && this.type !== 'array') {
            this.#valProps = null
        }
    }

    /**
     * Initializes {@link #valProps}, creating KVNodes for each property
     * that isn't excluded by {@link #root.decorator}. If this is a node
     * with no properties, sets {@link #valProps} to `null`.
     */
    initValProps () {
        if (this.#valProps !== undefined) {
            // been there, done that
            return
        }
        const valProps = []
        // todo![spec] for...in includes inherited properties.
        //   I *think* that is right/good, but maybe it should be
        //   configurable. To only include *own* properties, use
        //   one of `Object.keys`, `Object.values` or `Object.entries`
        for (const key in this.val) {
            const prop = new KVNode(
                key,
                this.val[key],
                this.root,
                this
            )

            // todo![api] properties of type "function" are not skipped.
            //   - filter them out here?
            //   - leave that to the decorator?

            if (!this.root.decorator || this.root.decorator(prop)) {
                valProps.push(prop)

                if (prop.type === 'object' || prop.type === 'array') {
                    // handle cycles by replacing with proxy ref
                    // todo: make clickable that either: (1) takes user to the
                    //   path in the tree where they can see it or (2) automatically
                    //   swaps with the other node at the given path, i.e. that node
                    //   gets the ref and this node gets the value. This is for a
                    //   better UX or (3) BEST UX MIGHT be to keep the OTVNode tree
                    //   free of cycles, but allow the DOM tree to show cycles as if
                    //   they were unique tree branches.
                    if (this.root.seenValueObjects.has(prop.val)) {
                        // todo![now] figure out how we want cycles flagged/to behave
                        // childKV.value = `ref: ${this.tree.seenValueObjects.get(childKV.value).path()}`
                    } else {
                        this.root.seenValueObjects.set(prop.val, prop)
                    }
                }
            }
        }
        this.#valProps = valProps.length > 0 ? valProps : null
    }

    /**
     *  @type {'array' | 'object' | 'string' | 'boolean' | 'number' | 'undefined' | 'null'}
     */
    get type () {
        if (Array.isArray(this.val)) {
            return 'array'
        } else if (this.val === undefined) {
            return 'undefined'
        } else if (this.val === null) {
            return 'null'
        }
        return typeof this.val
    }

    get path () {
        if (this.parent === null) {
            return this.descriptor ? this.descriptor : 'root'
        }
        return this.parent.path + '/' + this.key
    }

    /**
     * @param {HTMLElement} container
     *
     * todo![rollout] this should be a protected member. we can't make it
     *  private, because KVTree needs access to it. Maybe not a worry, as
     *  anyone calling it should seriously break things anyway, i.e. the
     *  exception below will be thrown.
     */
    initView (container) {
        if (this.#view !== undefined) {
            throw new Error('initView called more than once, probably because'
                + ' client code called it -- it is not public API')
        }

        // the type of view depend on whether there are valProps (and how many)
        this.initValProps()
        if (this.#valProps === null) {
            // todo![now] the leaf view needs to be updated to handle the case
            //  where the value is non primitive but all of its properties were
            //  excluded by the decorator
            //  An alternate to representing a non-primitive as having `null`
            //  valProps is to represent it as having zero valProps. i.e.
            //  and empty array `[]` instead of `null`.
            this.#initLeafView()
        } else {
            this.#initBranchView()
        }
        container.appendChild(this.#view)
    }

    /**
     * @param {number} depth: levels to expand beyond this node
     * @param {string[]} filter: deep expand only keys in this list
     * @param {boolean} filterArraysByEntries deep expand an array value
     *                   if at least one one of its entries has a key
     *                   matching the filter
     */
    expandView (depth = 0, filter = undefined, filterArraysByEntries = false) {
        if (this.#viewExpanded) {
            return
        }
        if (this.#valProps === undefined) {
            this.initValProps()
        }
        if (this.#valProps === null) {
            return
        }
        if (this.#valPropViewsInitialized) {
            this.#valProps.forEach((prop) => {
                prop.#view.classList.remove('otv-hide')
            })
        } else {
            const list = createElement('ul', {
                className: 'otv-entry-list'
            })
            this.#valProps.forEach((prop) => {
                prop.initView(list)
            })
            this.#view.appendChild(list)
            this.#valPropViewsInitialized = true
        }
        this.#setCaretIconDown()
        this.#viewExpanded = true
        if (depth > 0) {
            this.#valProps.forEach((prop) => {
                if (filter === undefined) {
                    prop.expandView(depth - 1)
                } else if (filter.indexOf(prop.key) !== -1) {
                    prop.expandView(depth - 1, filter, filterArraysByEntries)
                } else if (filterArraysByEntries && this.type === 'array' && prop.type === 'object') {
                    // if its an array prop (i.e. key is a number) it normally
                    //  wouldn't be expanded unless the number is in the filter.
                    //  BUT if filterArraysByEntries, and one of the entries in
                    //  the array matches the filter, then we'll expand the array.
                    let matched = false
                    for (const entryProp of prop.valProps) {
                        if (filter.indexOf(entryProp.key) !== -1) {
                            matched = true
                            break
                        }
                    }
                    if (matched) {
                        prop.expandView(depth - 1, filter, true)
                    }
                }
            })
        }
    }

    collapseView () {
        if (!this.#viewExpanded) {
            return
        }
        if (this.#valProps !== null && this.#viewExpanded === true) {
            this.#valProps.forEach((prop) => {
                prop.#view.classList.add('otv-hide')
            })
            this.#setCaretIconRight()
            this.#viewExpanded = false
        }
    }

    toggleView () {
        this.#viewExpanded ? this.collapseView() : this.expandView()
    }

    #setCaretIconRight () {
        // todo![now] make sure all these query selectors aren't select beyond
        //  the current item's view now now that we are switching to a
        //  hierarchical element tree.
        const icon = this.#view.querySelector('.otv-fas')
        icon.classList.replace('otv-fa-caret-down', 'otv-fa-caret-right')
    }

    #setCaretIconDown () {
        const icon = this.#view.querySelector('.otv-fas')
        icon.classList.replace('otv-fa-caret-right', 'otv-fa-caret-down')
    }

    /** internal, only to be called by {@link initView} */
    #initLeafView () {
        const caretElem = createElement('div', {
            className: 'otv-empty-icon',
        })

        const keyElem = createElement('div', {
            className: 'otv-json-key',
            content: this.key
        })

        const separatorElement = createElement('div', {
            className: 'otv-json-separator',
            content: ':'
        })

        const valueType = ' otv-json-' + this.type
        let valueElement
        if (this.type === 'string' &&
            // if leading space or trailing space, two or more spaces in
            // a row, or newlines, use a PRE block
            this.val.search(/^\s|[\t|\n]|\s{2}|\s$/) !== -1) {
            // wrap in PRE element
            valueElement = createElement('div', {
                className: 'otv-json-value' + valueType,
                childNodes: [createElement('pre', {
                    content: escapeAllButNewlines(this.val)
                })]
            })
        } else {
            let valueContent
            switch (this.type) {
                case 'array':
                    valueContent = '[]'
                    break
                case 'object':
                    valueContent = '{}'
                    break
                case 'undefined':
                    valueContent = 'undefined'
                    break
                case 'null':
                    valueContent = 'null'
                    break
                case 'string':
                    valueContent = escapeAllButNewlines(this.val)
                    break
                default:
                    valueContent = this.val
            }
            valueElement = createElement('div', {
                className: 'otv-json-value' + valueType,
                content: valueContent
            })
        }

        let lineParts
        if (this.key === null) {
            lineParts = [valueElement]
        } else {
            lineParts = [caretElem, keyElem, separatorElement, valueElement]
        }


        const lineElem = createElement('div', {
            className: 'otv-line',
            childNodes: lineParts
        })

        this.#view = createElement('li', {
            className: 'otv-entry',
            childNodes: [lineElem]
        })
    }

    /** internal, only to be called by {@link initView} */
    #initBranchView () {
        //todo![now] use `::marker` for caret: https://developer.mozilla.org/en-US/docs/Web/CSS/::marker
        let caretElem
        let propCount
        if (this.#valProps === null || this.#valProps.length === 0) {
            caretElem = createElement('div', {
                className: 'otv-empty-icon',
            })
            propCount = 0
        } else {
            // the ▽ or ▷ symbol
            const downOrRightCaret = createElement('i')
            if (this.#viewExpanded) {
                downOrRightCaret.className = 'otv-fas otv-fa-caret-down'
            } else {
                downOrRightCaret.className = 'otv-fas otv-fa-caret-right'
            }
            caretElem = createElement('div', {
                className: 'otv-caret-icon',
                childNodes: [downOrRightCaret],
            })
            const handleClick = this.toggleView.bind(this)
            caretElem.addEventListener('click', handleClick)
            propCount = this.#valProps.length
        }

        const indexElem = createElement('div', { //! index of array item
            className: 'otv-json-index',
            content: this.key,
        })

        const typeElem = createElement('div', {   //! only seen on root as "object"
            className: 'otv-json-type',
            content: this.type,
        })

        const keyElem = createElement('div', {    //! property name
            className: 'otv-json-key',
            content: this.key,
        })

        const sizeElem = createElement('div', {    //! size of array or object
            className: 'otv-json-size'
        })

        if (this.type === 'array') {
            sizeElem.innerText = `[${propCount > 0 ? propCount : ''}]`
        } else if (this.type === 'object') {
            sizeElem.innerText = `{${propCount > 0 ? propCount : ''}}`
        }

        let lineParts
        if (this.descriptor) {
            const nameElem = createElement('div', {
                className: 'otv-json-index',
                content: this.descriptor
            })

            if (this.key === null) {
                lineParts = [caretElem, nameElem, sizeElem]
            } else if (this.parent.type === 'array') {
                lineParts = [caretElem, indexElem, nameElem]
            } else {

                const separatorElement = createElement('div', {
                    className: 'otv-json-separator',
                    content: ':'
                })

                lineParts = [caretElem, keyElem, separatorElement, nameElem]
            }
        } else {
            if (this.key === null) {
                lineParts = [caretElem, sizeElem]
            } else if (this.parent.type === 'array') {
                lineParts = [caretElem, indexElem, sizeElem]
            } else {
                lineParts = [caretElem, keyElem, sizeElem]
            }
        }

        const lineElem = createElement('div', {
            className: 'otv-line',
            childNodes: lineParts
        })

        this.#view = createElement('li', {
            className: 'otv-entry',
            childNodes: [lineElem]
        })
    }
}

/**
 * Create html element
 * @param {String} type html element
 * @param {Object} config
 * @return {HTMLElement}
 */
function createElement (type, config = undefined) {
    const htmlElement = document.createElement(type)

    if (config === undefined) {
        return htmlElement
    }

    if (config.className) {
        htmlElement.className = config.className
    }

    if (config.content) {
        htmlElement.textContent = config.content
    }

    if (config.childNodes) {
        config.childNodes.forEach((el) => {
            if (el !== null) {
                htmlElement.appendChild(el)
            }
        })
    }

    return htmlElement
}

/**
 * Decorator customizes tree and element rendering
 *
 * @callback Decorator
 * @param {KVNode} node
 * @returns {boolean}
 */


// todo![api] add methods so tree and editor pane can interact, e.g.
//  clicking a node can highlight corresponding line in source, or vice-versa.
class KVTree extends KVNode {
    //todo![arch] we don't necessarily need to keep a handle on all
    //  of the items referenced by instance properties below. TBD.

    /**
     * todo![rollout] rename. This is not a Decorator
     *
     * @type {Decorator}
     */
    decorator

    /**
     * used to track graph cycles.
     *
     * maps non-primitive values that "have been seen before"
     * to the node at which they were first seen (the one node
     * that represents the object as-is, whereas all other
     * occurrences of the value in the tree will be proxies
     * indicating the repeat ref/cycle).
     *
     * @type {Map<Object | Array, KVNode>}
     */
    seenValueObjects = new Map()

    /** @type {HTMLElement} */
    container

    /**
     * Render Object into DOM container
     *
     * todo![api, test] what happens when obj is a primitive type?
     *
     * @param {Object} obj
     * @param {HTMLElement} container
     * @param {Decorator} [decorator]
     */
    constructor (obj, container, decorator) {
        super(null, obj, null, null)
        this.root = this
        this.seenValueObjects.set(obj, this)

        if (decorator) {
            this.decorator = decorator
            //todo![api] we are also assuming the decorator hasn't returned false
            // as this is the root node. Should we all the root be be rejected?
            decorator(this)
        }

        this.container = container
        const list = createElement('ul', {
            className: 'otv-root'
        })
        container.appendChild(list)
        this.initView(list)
    }
}


/**
 * Render Object as a DOM tree control  DOM container
 * @param {Object} obj
 * @param {HTMLElement | string} container
 * @param {Decorator} [decorator]
 * @returns {KVNode}
 *
 * //todo![now, api] ALSO accept JSON5 text instead of object
 */
export function viewCustomSmartlyPrettifiedObject (obj, container, decorator) {
    if (typeof container === 'string') {
        container = document.querySelector(container)
    }

    return new KVTree(obj, container, decorator).root
}

function escapeAllButNewlines (s) {
    // JSON.stringify has a lot of smarts. Let's see how it works
    // before we do our own manipulation
    s = JSON.stringify(s)
    // put back newlines since we use PRE blocks for those already
    s = s.replaceAll('\\n', '\n')
    s = s.slice(1, -1) // remove quotes
    return s
}

const RE_USE_JSON_STRINGIFY = /^\s|\s$|\p{C}/u
const RE_UNICODE_CONTROL_CHARS = /\p{C}/u
const RE_NON_PRINTABLE_ASCII = /[^ -~]/
