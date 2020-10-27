const product = "Socks";
let app = new Vue({
    el: '#app',
    data: {
        product: 'Cat',
        description: 'Like dog, but smaller',
        image: './assets/cat.jpg',
        website: 'https://en.wikipedia.org/wiki/Cat',
        inventory: 10,
        onSale: true
    }
})