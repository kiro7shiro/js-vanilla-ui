import { construct } from './src/index.js'

async function setup() {
    const overlay = await construct(document.getElementById('myOverlay'))
    const sidebar = await construct(document.getElementById('mySidebar'))
    const popup = await construct('Popup')
    popup.hide()
    popup.on('close', function () {
        popup.hide()
        overlay.hide()
    })
    document.body.insertAdjacentElement('afterbegin', popup.element)
    sidebar.on('sidebar-close', function () {
        sidebar.hide()
        overlay.hide()
    })
    sidebar.on('overview-click', function () {
        sidebar.hide()
        overlay.show()
        popup.show()
    })
    const menuItems = ['create', 'read', 'update', 'delete']
    const navbar = await construct('Navbar', { events: ['click'], items: menuItems })
    navbar.on('sidebar-open', function () {
        if (!sidebar.visible) {
            sidebar.show()
            overlay.show()
        } else {
            sidebar.hide()
            overlay.hide()
        }
    })
    navbar.on('create-click', function () {
        overlay.show()
        popup.show()
    })
    document.body.insertAdjacentElement('afterbegin', navbar.element)
    const progressBar = await construct('ProgressBar', { width: 33 })
    const generalStats = document.getElementById('generalStats')
    generalStats.children[2].after(progressBar.element, generalStats.children[2])
    setInterval(function () {
        if (progressBar.width >= 100) progressBar.width = 0
        progressBar.width = progressBar.width + 1
    }, 333)
    // inputs
    const inputs = document.getElementById('inputs')
    const slider1 = await construct('Slider', { events: ['change'] })
    inputs.insertAdjacentElement('beforeend', slider1.element)
    slider1.on('slide', function () {
        slider1.label = `${slider1.value} si`
    })
}

setup()
