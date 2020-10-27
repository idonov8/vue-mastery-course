const product = "Socks";
let app = new Vue({
    el: '#app',
    data: {
        product: 'Cat',
        image: './assets/cat-black.jpg',
        inStock: true,
        details: ["Grey color", "Green eyes", "Cute ears"],
        varients: [
            {
                varientId: 1,
                varientColor: 'black',
                varientImage: './assets/cat-black.jpg',
            },
            {
                varientId: 2,
                varientColor: 'rainbow',
                varientImage: './assets/cat-rainbow.jpg',
            }
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart+=1
        },
        updateProduct(variengImg){
            this.image = variengImg
        },
        removeFromCart(){
            this.cart-=1
        }
    }
})