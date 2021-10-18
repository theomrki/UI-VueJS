
const products = [
    { id: 1, description: "Circle Indie Skull", price: 12, img: 'assets/img/skull.JPG'},
    { id: 2, description: 'Random Forms', price: 20, img: 'assets/img/randomforms.JPG'},
    { id: 3, description: 'Maori', price: 5, img: 'assets/img/maoriTattoo.JPG'},
    { id: 4, description: 'Knife Flowers', price: 8, img: 'assets/img/knifeFlowers.JPG'},
    { id: 5, description: 'Vintage Baroque', price: 3, img: 'assets/img/baroque.JPG'},
    { id: 6, description: 'B/W Old School', price: 65, img: 'assets/img/oldschoolbandw.JPG'},
    { id: 7, description: 'B/W Flower Mandala', price: 25, img: 'assets/img/mandaflower.JPG'},
    { id: 8, description: 'Skull and Watch', price: 28, img: 'assets/img/skullwatch.JPG'},
    { id: 9, description: 'Mechanic Heart', price: 4, img: 'assets/img/mechaheart.JPG'},
    { id: 10, description: 'Mandala DotWork', price: 29, img: 'assets/img/mandaDot.JPG'},
    { id: 11, description: 'Geometric Mandala', price: 87, img: 'assets/img/mandaGeo.JPG'},
    { id: 12, description: 'Sacred Geometric', price: 6, img: 'assets/img/sacredGeo.JPG'},
  ];

const Home = {
    template: '#home', //Call 'text/x-template" id
    name: 'Home',
    data: () => {
        return {
            products,
            searchKey: '', //String empty
            liked: [], //products liked
            cart: []
        } 
    },

    computed: {
        //Return all filtered elements
        filteredList(){
            return this.products.filter((product) => {
                return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
            })
        },
        getLikeCookie(){
            let cookieValue = JSON.parse($cookies.get('like'));
            cookieValue == null ? this.liked = [] : this.liked = cookieValue
        },
        cartTotalAmount(){
            let total = 0;
            for(let item in this.cart){
                total = total + (this.cart[item].quantity * this.cart[item].price)
            }
            return total;
        },
        itemTotalAmount(){
            let itemTotal = 0;
            for(let item in this.cart){
                itemTotal = itemTotal + (this.cart[item].quantity);
            }
            return itemTotal;
        }
    },

    methods: { //Update cookie list depends on what's liked
        setLikeCookie(){
            document.addEventListener('input', () => {
                setTimeout(() => {
                $cookies.set('like', JSON.stringify(this.liked));
            }, 300);
        })
    },
        addToCart(product) {
            //check if already in array
            for (let i = 0; i < this.cart.length; i++){
                if (this.cart[i].id === product.id){
                    return this.cart[i]. quantity++
                }
            }
            this.cart.push({
                id: product.id,
                img: product.img,
                description: product.description,
                price: product.price,
                quantity: 1,
            })
        },
        cartPlusOne(product){
            product.quantity = product.quantity + 1;
        },
        cartMinusOne(product, id){
            if (product.quantity == 1){
                this.cartRemoveItem(id);
            } else {
                product.quantity = product.quantity - 1;
            }
        },
        cartRemoveItem(id){
            this.$delete(this.cart, id)
        }
    },

    mounted: () => { //get cookie to take into "Like"
        this.getLikeCookie;
    }    
}

const UserSettings = {
    template: '<h1>UserSettings</h1>', //What's in the component
    name: 'UserSettings'
}
const WishList = {
    template: '<h1>WishList</h1>', //What's in the component
    name: 'WishList'
}
const ShoppingCart = {
    template: '<h1>ShoppingCart</h1>', //What's in the component
    name: 'ShoppingCart'
}

//router
const router = new VueRouter ({
    routes: [
        {path: '/', component: Home },
        {path: '/user-settings', component: UserSettings },
        {path: '/wish-list', component: WishList },
        {path: '/shopping-cart', component: ShoppingCart }
    ]
})

const vue = new Vue({
    router
}).$mount('#app'); //Target everything in the (div id=app)