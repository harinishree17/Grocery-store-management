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
            <p><b>#{{ category.id }} {{ category.name }}</b></p>
            <p>Number of products : {{ category.products }}</p>
            </div>
        </div>
        <p><b><font size="6px">Products</font></b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div v-for="product in products" >
            <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                <p><b>#{{ product.id }} {{ product.name }}</b></p>
                <p>Price per {{ product.unit }} : {{ product.rate }}</p>
                <router-link :to="{path:'/product/'+product.id, query:{id:product.id}}"><a style="color:white" >View</a></router-link>
                <div v-show="!this.user&&!this.admin&&this.manager" style="display:inline;">
                <router-link to="/" ><a style="display:inline;margin-left:15px;color:white">Edit</a></router-link>
                <button @click='deletep(product.id)' style="outline: none;cursor: pointer;border-radius: 3px;padding: 5px 5px;border: 0;line-height: 1.15;">Delete</button>
                </div>
            </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    `,
    data() {
        return {
            category : 0,
            products : [],
            token : localStorage.getItem('auth-token'),
            bill_link: "/bills/"+localStorage.getItem('current_user'),
            user : false,
            manager : false,
            admin : false,
            role: localStorage.getItem('current_role'),
        }
    },
    methods : {
        getcategory(){
            console.log(this.$route);
            const res = fetch(`/categorydetails/${this.$route.query.id}`, {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            this.category = data;
            })
        },
        getproducts(){
            console.log(this.$route);
            const res = fetch(`/productbycategory/${this.$route.query.id}`, {
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
        this.getcategory();
        this.getproducts();
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