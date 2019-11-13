;(function () {
    'use strict'

    class Container{
        constructor() {
            this.displayObjects = []
        }

        add(displayObjects){
            if(!this.displayObjects.includes(displayObjects)){
                this.displayObjects.push(displayObjects)
            }
        }

        remove(){}

        draw(canvas, context){
            for( const displayObjects of this.displayObjects){
                displayObjects.draw(canvas, context)
            }
        }
    }

    window.GameEngine = window.GameEngine  || {}
    window.GameEngine.Container = Container
})()