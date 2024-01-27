import { Control } from './Control.js'

class ProgressBar extends Control {
    constructor(element) {
        super(element)
        this.bar = this.element.querySelector('.w3-container')
    }
    get width() {
        const [num] = this.bar.style.width.split('%')
        return Number(num)
    }
    set width(value) {
        this.bar.style.width = value + '%'
        this.bar.innerText = value + '%'
    }
}

export { ProgressBar }
