Vue.component('product-details', {
    props: ['details'],
    template: `
    <p style="color: red">{{details}}</p>
    `
})
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
    <div class="product-image">
        <img :src="image">
    </div>
    <div class="product-info">
        <h1>{{title}}</h1>
        <product-details details="Like a dog, but smaller."></product-details>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{shipping}}</p>
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
        <div v-for="(varient, index) in varients" 
            :key="varientId"
            class="color-box"
            :style="{backgroundColor: varient.varientColor}"
            @mouseover="updateProduct(index)">
        </div>
        <button v-on:click="addToCart()" 
                :disabled="!inStock"
                :class="{ disabledButton: !inStock}">Add to Cart</button>
        <div class="cart">
            <p>Cart({{cart}})</p>
        </div>
    </div>
</div>
    `,
    data(){
        return{
            name: 'Pipsi',
            product: 'Cat',
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
        } 
    } ,
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
        shipping(){
            if (this.premium) {
                return "Free"
            } else {
                return "2.99"
            }
        }
    }

})
let app = new Vue({
    el: '#app',
    data: {
        premium: false,
    }
})