
Vue.component('product-review', {
    template: `
    <form class="review-form" 
    @submit.prevent="onSubmit">

    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">
                {{error}}
            </li>
        </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>Would you recommand this product?</p>
    <input type="radio" id="yes" name="gender" value="yes" v-model="recommand">
    <label for="yes">Yes</label>
    <input type="radio" id="no" name="gender" value="no" v-model="recommand">
    <label for="no">No</label>
    
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
</form>
    `,
    data(){
        return {
            name: null,
            review: null,
            rating: null,
            recommand: null,
            errors: [],
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.recommand) {
                    let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommand: this.recommand,
                }
                this.$emit('review-submitted', productReview)
                this.name = null;
                this.review = null;
                this.rating = null;
            } else {
                if (!this.name) this.errors.push("Name required")
                if (!this.review) this.errors.push("Review required")
                if (!this.rating) this.errors.push("Rating required")
                if (!this.recommand) this.errors.push("Recommand or not?")
            }
        }
            
    }
});
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
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{shipping}}</p>
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
        <div v-for="(varient, index) in varients" 
            :key="varient.varientId"
            class="color-box"
            :style="{backgroundColor: varient.varientColor}"
            @mouseover="updateProduct(index)">
        </div>
        <button v-on:click="addToCart()" 
                :disabled="!inStock"
                :class="{ disabledButton: !inStock}">Add to Cart</button>
    </div>
    <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length"> No reviews yet </p>
        <ul>
            <li v-for="review in reviews">
            <p>{{ review.name}}</p>    
            <p>Rating: {{review.rating}}</p>    
            <p>{{review.review}}</p>  
            <p>Would recommand this: {{review.recommand}}</p>  
            </li>
        </ul>
    </div>
    <product-review @review-submitted="addReview"></product-review>
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
            reviews: [],
        } 
    } ,
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.varients[this.selectedVarient].varientId);
        },
        updateProduct(index){
            this.selectedVarient = index;
            console.log(index);
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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

});
let app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
})