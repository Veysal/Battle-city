;(function () {
    'use strict'

    class Loader{
        constructor(){
            this.loadOrder = {
                images: [],
                json: []
            }
            this.resources = {
                images: [],
                json: []
            }
        }

        addImage(name, src){
            this.loadOrder.images.push({ name, src })
        }

        addJson (name, addres){
            this.loadOrder.json.push({ name, addres })
        }

        load(callback){
            const promises = []

            for( const imageData of this.loadOrder.images){
                const { name, src } = imageData
                const promise = Loader.loadImage(src).then(image =>{
                    this.resources.images[name] = image

                    if(this.loadOrder.images.includes(imageData)){
                        const index = this.loadOrder.images.indexOf(imageData)
                        this.loadOrder.images.splice(index, 1)
                    }
                })
                promises.push(promise)
            }


            for( const jsonData of this.loadOrder.json){
                const { name, addres } = jsonData

                const promise = Loader.loadJson(addres).then(image =>{
                    this.resources.json[name] = image

                    if(this.loadOrder.json.includes(jsonData)){
                        const index = this.loadOrder.json.indexOf(jsonData)
                        this.loadOrder.json.splice(index, 1)
                    }
                })
                promises.push(promise)
            }

            Promise.all(promises).then(() => callback())
        }

        static loadImage (src){
            return new Promise((resolve, reject) =>{
                try {
                    const image = new Image
                    image.onload = () => resolve(image)
                    image.src = src
                }
                catch (err){
                    reject(err)
                }
            })
        }

        static loadJson (addres){
            return new Promise((resolve, reject) =>{
                fetch(addres)
                    .then(result => result.json()
                    .then(result => resolve(result)))
                    .catch(err => reject(err))
            })
        }
    }

    window.GameEngine = window.GameEngine  || {}
    window.GameEngine.Loader = Loader
})()