import * as controls from './index.js'

// Maybe not needed? A little bit to much?
// Works fine so far without it
let templates = null
export async function preload() {
    const resp = await fetch(`/views`)
    if (resp.status !== 200) {
        console.log(resp)
        return
    }
    const json = await resp.json()
    templates = json
}

/**
 * Request and render template files from the server.
 * @param {String} name of the template file to render
 * @param {Object} locals values to render into the template
 * @returns {String}
 */
export async function render(name, locals = {}) {
    const resp = await fetch(`/views/${name}`)
    const text = await resp.text()
    if (resp.status !== 200) throw new Error(text)
    const renderer = ejs.compile(text, { client: true, async: true })
    const html = await renderer(locals, null, async function (path, d) {
        const temp = await render(path, d)
        return temp
    })
    return html
}

/**
 * Construct a new instance of a control class.
 * Requests the html from the server, renders it and
 * makes a new wrapper instance with the resulting html element
 * attached.
 * @param {String} source of the class to construct
 * @param {Object} options to apply to the new instance
 * @returns {controls.Control}
 */
export async function construct(source, options = {}) {
    // assign defaults
    options = Object.assign({}, { events: true }, options)
    // construct new instance
    let constructor = null
    let result = null
    if (typeof source === 'string') {
        constructor = controls[source]
        if (!constructor) constructor = controls.Control
        const html = await render(`${source}.ejs`, options)
        result = new constructor(html, options)
    } else {
        result = new controls.Control(source, options)
    }
    // add events
    if (options.events) {
        if (Array.isArray(options.events)) {
            controls.addEvents(result, options.events)
        } else {
            controls.addEvents(result)
        }
    }
    return result
}
