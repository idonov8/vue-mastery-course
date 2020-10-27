const product = "Socks";
let app = new Vue({
    el: '#app',
    data: {
        product: 'Cat',
        description: 'Like dog, but smaller',
        image: './assets/cat.jpg',
        inStock: true,
        details: ["Grey color", "Green eyes", "Cute ears"],
        varients: [
            {
                varientId: 1,
                varientColor: 'black'
            },
            {
                varientId: 2,
                varientColor: 'rainbow'
            }
        ],
        sizes: ["fat", "very fat", "wow this cat is fat"]
    }
})