export default
{
    template : `
    <div>
        <div style="background-color:black;opacity:0.7;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
            <router-link to="/managerhome"><a style="margin-right: 2%;color:white">Home</a></router-link>
            <router-link to="/mrequests"><a style="margin-right: 2%;color:white">Requests</a></router-link>
            <router-link to="/msearch"><a style="margin-right: 2%;color:white">Search</a></router-link>
            <router-link to="/mbills"><a style="margin-right: 2%;color:white">Bills</a></router-link>
            <router-link to="/"><a style="margin-right: 2%;color:white">Logout</a></router-link>
        </div>
        <div>
        <p><b><font size="6px">Products</font></b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div v-for="product in products" >
            <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                <p><b>#{{ product.id }} {{ product.name }}</b></p>
                <p>Price per {{ product.unit }} : {{ product.rate }}</p>
                <router-link to=""><a style="color:white">View</a></router-link>
                <router-link to=""><a style="margin-left:15px;color:white">Edit</a></router-link>
                <button @click='deletep(product.id)' style="display: inline-block;outline: none;cursor: pointer;border-radius: 3px;padding: 5px 5px;border: 0;line-height: 1.15;">Delete</button>
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
        }
    },
    created() {
        this.getproducts();
        this.getcategories();
    },
}