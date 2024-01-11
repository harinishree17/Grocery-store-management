import Adminnav from "./Adminnav.js";
import Managernav from "./Managernav.js";
import Usernav from "./Usernav.js";

export default
{
    template : `
    <div>
        <Usernav v-show="this.user"/>
        <Managernav v-show="this.manager"/>
             <Adminnav v-show="this.admin"/>
        <div>
        <p><b><font size="6px">Your Cart total is : {{ total }}</font></b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div v-for="product in products" >
            <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                <p><b>#{{ product.product_id }} {{ product.product_name }}</b></p>
                <p>Quantity purchased : {{ product.quantity }}</p>
                <p>Price per quantity : {{ product.price }}</p>
                <button @click='removefromcart(product.product_id)' style="display: inline-block;outline: none;cursor: pointer;border-radius: 3px;padding: 5px 5px;border: 0;width:40px;line-height: 1.15;">- </button>
            <p style="display:inline-block"><b>  ADD  </b></p>
            <button @click='addtocart(product.product_id)' style="display: inline-block;outline: none;cursor: pointer;border-radius: 3px;padding: 5px 5px;border: 0;width:40px;line-height: 1.15;"> +</button>
            
            </div>
            </div>
        </div>
        </div>
        <button @click="proceed">Proceed to bill</button>
    </div>
    `,
    data() {
        return {
            products : [],
            total:0,
            token : localStorage.getItem('auth-token'),
            user_id : localStorage.getItem('current_user'),
            bill_link: "/bills/"+localStorage.getItem('current_user'),
            user : false,
            manager : false,
            admin : false,
            role: localStorage.getItem('current_role'),
        }
    },
    methods : {
        getproducts(){
            const res = fetch('/cartitems', {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            this.products = data;
            })
        },
        gettotal(){
            const res = fetch('/carttotal', {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            this.total = data;
            })
        },
        addtocart(product_id){
            const res = fetch(`/addtocart/${product_id}`, {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            this.getproducts();
        this.gettotal();
            })
        },
        removefromcart(product_id){
            const res = fetch(`/removefromcart/${product_id}`, {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            this.getproducts();
        this.gettotal();
            })
        },
        proceed(){
            const res = fetch(`/billit/${localStorage.getItem('current_user')}`, {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            this.$router.push("/home");
            })
        },
    },
    created() {
        this.getproducts();
        this.gettotal();
        const user_id = localStorage.getItem('current_user');
        if(this.role == "user"){
            this.user = true;
        }
        else if(this.role == "manager"){
            this.manager = true;
        }
        else if(this.role == "admin"){
            this.admin = true;
        }
    },
    components : {
        Usernav,
        Managernav,
        Adminnav
    }
}