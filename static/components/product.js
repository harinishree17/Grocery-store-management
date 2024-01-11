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
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
            <p><b>#{{ product.id }}</b></p>
            <p>Price per {{ product.unit }} : {{ product.rate }}</p>
            <p>Manufacture date : {{ product.date }}</p>
            <p>Available stock : {{ product.quantity }} {{ product.unit }}</p>
            <div v-show="this.user">
            <button @click='removefromcart' style="display: inline-block;outline: none;cursor: pointer;border-radius: 3px;padding: 5px 5px;border: 0;width:40px;line-height: 1.15;">- </button>
            <p style="display:inline-block"><b>  ADD  </b></p>
            <button @click='addtocart' style="display: inline-block;outline: none;cursor: pointer;border-radius: 3px;padding: 5px 5px;border: 0;width:40px;line-height: 1.15;"> +</button>
            </div>
            <div v-show="!this.user&&!this.admin">
                <router-link :to="{path:'/editproduct/'+product.id, query:{id:product.id}}" ><a style="margin-left:15px;color:white">Edit</a></router-link>
                <button @click='deletep(product.id)' style="outline: none;cursor: pointer;border-radius: 3px;padding: 5px 5px;border: 0;line-height: 1.15;">Delete</button>
                </div>
            </div>
        </div>
        </div>
    </div>
    `,
    data() {
        return {
            product : 0,
            token : localStorage.getItem('auth-token'),
            bill_link: "/bills/"+localStorage.getItem('current_user'),
            // id: 2,
            user : false,
            manager : false,
            admin : false,
            role: localStorage.getItem('current_role'),
        }
    },
    methods : {
        getproduct(){
            console.log(this.$route);
            const res = fetch(`/productdetails/${this.$route.query.id}`, {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            this.product = data;
            })
        },
        addtocart(){
            const res = fetch(`/addtocart/${this.product.id}`, {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            })
        },
        removefromcart(){
            const res = fetch(`/removefromcart/${this.product.id}`, {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            })
        },
        deletep(product_id){
            const res = fetch(`/deleteproduct/${product_id}`, {
                method : "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            this.getproducts();
        this.getcategories();
            })
        }
    },
    created() {
        // const id = 2;
        this.getproduct();
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