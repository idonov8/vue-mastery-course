let eventBus = new Vue({})
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
            errors: [],
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                    let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null;
                this.review = null;
                this.rating = null; 
            } else {
                if (!this.name) this.errors.push("Name required")
                if (!this.review) this.errors.push("Review required")
                if (!this.rating) this.errors.push("Rating required")
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
        <small-tabs :shipping="shipping" :details="details"></small-tabs>
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

    <product-tabs :reviews="reviews"></product-tabs>

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
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }

});
Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true,
        }
    },
    template: `
    <div>
        <span class="tab"
              :class="{ activeTab: selectedTab === tab}"
              v-for="(tab, index) in tabs" :key="index"
              @click="selectedTab = tab">
              {{ tab }}
        </span>
                
        <div v-show="selectedTab==='Reviews'">
            <h2>Reviews</h2>
            <p v-if="!reviews.length"> No reviews yet </p>
            <ul>
                <li v-for="review in reviews">
                <p>{{ review.name}}</p>    
                <p>Rating: {{review.rating}}</p>    
                <p>{{review.review}}</p>    
                </li>
            </ul>
        </div>
        <product-review 
                v-show="selectedTab==='Write a Review!'">
        </product-review>
    </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Write a Review!'],
            selectedTab: 'Reviews',
        }
    }
})
Vue.component('small-tabs', {
    props: ['shipping', 'details'],
    template: `
    <div>
        <span class="tab"
            :class="{ activeTab: selectedTab === tab}"
            v-for="(tab, index) in tabs" :key="index"
            @click="selectedTab = tab">
            {{ tab }}
        </span>

        <p v-show="selectedTab==='Shipping'">Shipping: {{shipping}}</p>
        <ul v-show="selectedTab==='Details'">
            <li v-for="detail in details">{{detail}}</li>
        </ul>
    </div>
    `,
    data() {
        return {
            tabs: ['Details', 'Shipping'],
            selectedTab: 'Details'
        }
    }
})
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