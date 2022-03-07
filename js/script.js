window.onload = () => {
    const colors = ['#F6BF75FF', '#D77185FF', '#8766ACFF', '#4150B1FF']
    colors.random = function() {
        return this[Math.floor(Math.random()*this.length)]
    }

    const drag = document.getElementById('drag')
    const newElementBlock = document.getElementById('new-element')
    const dropGriding = document.getElementById('drop-griding')
    const dropRandom = document.getElementById('drop-random')

    document.addEventListener("dragend", (event) => {
        newElementBlock.innerHTML = ''
    }, false);

    drag.addEventListener("dragstart", (event) => {
        const element = document.createElement('div')
        element.classList.add('single-element')
        element.style.backgroundColor = colors.random()
        newElementBlock.appendChild(element)
        event.dataTransfer.setDragImage(element, 50, 50)
    }, false)

    dropGriding.addEventListener("dragover", (event) => {
        event.preventDefault();
    }, false);

    dropGriding.addEventListener("drop", function (event) {
        event.preventDefault();
        const draggableElement = newElementBlock.firstChild
        this.appendChild(draggableElement)
    }, false);

    dropRandom.addEventListener("dragover", (event) => {
        event.preventDefault();
    }, false);

    dropRandom.addEventListener("drop", function (event) {
        event.preventDefault();
        const draggableElement = newElementBlock.firstChild
        const targetCoords = this.getBoundingClientRect();
        const x = event.clientX - targetCoords.left - draggableElement.offsetHeight / 2;
        const y = event.clientY - targetCoords.top - draggableElement.offsetHeight / 2;
        draggableElement.style.position = 'absolute'
        draggableElement.style.zIndex = this.children.length.toString()
        draggableElement.style.top = `${y}px`
        draggableElement.style.left = `${x}px`
        this.appendChild(draggableElement)
    }, false);
}