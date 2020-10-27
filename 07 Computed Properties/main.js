const product = "Socks";
let app = new Vue({
    el: '#app',
    data: {
        name: 'Pipsi',
        product: 'Cat',
        onSale: true,
        selectedVarient: 0,
        details: ["Grey color", "Green eyes", "Cute ears"],
        varients: [
            {
                varientId: 1,
                varientColor: 'black',
                varientImage: './assets/cat-black.jpg',
                varientQuantity: 21,
            },
            {
                varientId: 2,
                varientColor: 'red',
                varientImage: './assets/cat-rainbow.jpg',
                varientQuantity: 0,
            }
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart+=1
        },
        updateProduct(index){
            this.selectedVarient = index;
            console.log(index);
        }
    },
    computed: {
        title(){
            return this.product+" - "+this.name;
        },
        image(){
            return this.varients[this.selectedVarient].varientImage;
        },
        inStock(){
            return this.varients[this.selectedVarient].varientQuantity;
        },
        saleMessage(){
            return "The "+this.product+" named "+this.name+" is on sale!";
        }
    }
})