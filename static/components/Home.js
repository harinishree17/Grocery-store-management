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
        <p><b><font size="6px">Products</font></b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div v-for="product in products" >
            <div class="categorycss" style="background-color:white;color:black;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                <p><b>#{{ product.id }} {{ product.name }}</b></p>
                <p>Price per {{ product.unit }} : {{ product.rate }}</p>
                <router-link :to="{path:'/product/'+product.id, query:{id:product.id}}"><a style="color:black" >View</a></router-link>
                <div style="display:inline" v-show="mp">
                <router-link :to="{path:'/editproduct/'+product.id, query:{id:product.id}}"><a style="margin-left:15px;color:black">Edit</a></router-link>
                <button @click='deletep(product.id)' style="display: inline-block;outline: none;cursor: pointer;border-radius: 3px;padding: 5px 5px;border: 0;line-height: 1.15;">Delete</button>
                </div>
                </div>
            </div>
        </div>
        </div>
        <div>
        <p><b><font size="6px">Categories</font></b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div v-for="category in categories" >
            <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                <p><b>#{{ category.id }} {{ category.name }}</b></p>
                <p>Number of products : {{ category.products }}</p>
                <router-link :to="{path:'/category/'+category.id, query:{id:category.id}}"><a style="color:white" >View</a></router-link>
                <div style="display:inline" v-show="ap">
                <router-link :to="{path:'/editcategory/'+category.id, query:{id:category.id}}"><a style="margin-left:15px;color:white">Edit</a></router-link>
                <button @click='deletec(category.id)' style="display: inline-block;outline: none;cursor: pointer;border-radius: 3px;padding: 5px 5px;border: 0;line-height: 1.15;">Delete</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    `,
    data() {
        return {
            products : [],
            categories : [],
            token : localStorage.getItem('auth-token'),
            role: localStorage.getItem('current_role'),
            bill_link: "/bills/"+localStorage.getItem('current_user'),
            product_link: "/product/",
            user : false,
            manager : false,
            admin : false,
            up: false,
            mp : false,
            ap: false
        }
    },
    methods : {
        getproducts(){
            const res = fetch('/products', {
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
        getcategories(){
            const res = fetch('/categories', {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            this.categories = data;
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
        },
        deletec(category_id){
            const res = fetch(`/deletecategory/${category_id}`, {
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
        this.getproducts();
        this.getcategories();
        console.log(this.role);
        if(this.role == "user"){
            this.user = true;
            this.up = true;
            this.manager = false;
            this.admin = false;
        }
        else if(this.role == "manager"){
            this.manager = true;
            this.mp = true;
            this.user = false;
            this.admin = false;
            console.log('yup');
        }
        else if(this.role == "admin"){
            this.admin = true;
            this.ap = true;
            this.user = false;
            this.manager = false;
            console.log('yup');
        }
    },
    components : {
        Usernav,
        Managernav,
        Adminnav
    }
}