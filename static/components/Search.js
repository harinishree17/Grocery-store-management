import Adminnav from "./Adminnav.js";
import Managernav from "./Managernav.js";
import Usernav from "./Usernav.js";

export default
{
    template : `
    <div>
        <Usernav v-show="this.user" />
        <Managernav v-show="this.manager" />
        <Adminnav v-show="this.admin" />
        <label aria-hidden="true" style="color: black;">Search ...</label>
        <input type="text" name="name" placeholder="Enter any value" required="" autocomplete="off" v-model="name">
        <br>
        <p style="margin-left:31%">Note : To search products by manufature date use the format : yyyy-mm-dd</p>
        <br>
        <button type="submit" @click="search">Search !</button>
        <br>
        <label aria-hidden="true" style="color: black;">Search Results</label>

        <br>
        <div v-if="prodbyname.length>0">
            <p><b>
                    <font size="6px">Products by name ....</font>
                </b></p>
            <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
                <div v-for="product in prodbyname">
                    <div class="categorycss"
                        style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                        <p><b>#{{ product.id }} {{ product.name }}</b></p>
                        <p>Price per {{ product.unit }} : {{ product.rate }}</p>
                        <router-link :to="{path:'/product/'+product.id, query:{id:product.id}}"><a
                                style="color:white">View</a></router-link>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div v-if="prodbyid.length>0">
            <p><b>
                    <font size="6px">Products by id ....</font>
                </b></p>
            <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
                <div v-for="product in prodbyid">
                    <div class="categorycss"
                        style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                        <p><b>#{{ product.id }} {{ product.name }}</b></p>
                        <p>Price per {{ product.unit }} : {{ product.rate }}</p>
                        <router-link :to="{path:'/product/'+product.id, query:{id:product.id}}"><a
                                style="color:white">View</a></router-link>
                    </div>
                </div>
            </div>
        </div>

        <br>
        <div v-if="prodbydate.length>0">
            <p><b>
                    <font size="6px">Products by date ....</font>
                </b></p>
            <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
                <div v-for="product in prodbydate">
                    <div class="categorycss"
                        style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                        <p><b>#{{ product.id }} {{ product.name }}</b></p>
                        <p>Price per {{ product.unit }} : {{ product.rate }}</p>
                        <router-link :to="{path:'/product/'+product.id, query:{id:product.id}}"><a
                                style="color:white">View</a></router-link>
                    </div>
                </div>
            </div>
        </div>

        <br>
        <div v-if="prodbyquantity.length>0">
            <p><b>
                    <font size="6px">Products by quantity ....</font>
                </b></p>
            <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
                <div v-for="product in prodbyquantity">
                    <div class="categorycss"
                        style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                        <p><b>#{{ product.id }} {{ product.name }}</b></p>
                        <p>Price per {{ product.unit }} : {{ product.rate }}</p>
                        <router-link :to="{path:'/product/'+product.id, query:{id:product.id}}"><a
                                style="color:white">View</a></router-link>
                    </div>
                </div>
            </div>
        </div>

        <br>
        <div v-if="prodbyunit.length>0">
            <p><b>
                    <font size="6px">Products by unit ....</font>
                </b></p>
            <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
                <div v-for="product in prodbyunit">
                    <div class="categorycss"
                        style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                        <p><b>#{{ product.id }} {{ product.name }}</b></p>
                        <p>Price per {{ product.unit }} : {{ product.rate }}</p>
                        <router-link :to="{path:'/product/'+product.id, query:{id:product.id}}"><a
                                style="color:white">View</a></router-link>
                    </div>
                </div>
            </div>
        </div>

        <br>
        <div v-if="prodbyrate.length>0">
            <p><b>
                    <font size="6px">Products by rate ....</font>
                </b></p>
            <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
                <div v-for="product in prodbyrate">
                    <div class="categorycss"
                        style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                        <p><b>#{{ product.id }} {{ product.name }}</b></p>
                        <p>Price per {{ product.unit }} : {{ product.rate }}</p>
                        <router-link :to="{path:'/product/'+product.id, query:{id:product.id}}"><a
                                style="color:white">View</a></router-link>
                    </div>
                </div>
            </div>
        </div>

        <br>
        <div v-if="catbyname.length>0">
            <p><b>
                    <font size="6px">Categories by name ....</font>
                </b></p>
            <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
                <div v-for="category in catbyname" >
                <div class="categorycss"
                    style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                    <p><b>#{{ category.id }} {{ category.name }}</b></p>
                    <p>Number of products : {{ category.products }}</p>
                    <router-link :to="{path:'/category/'+category.id, query:{id:category.id}}"><a
                            style="color:white">View</a></router-link>
                </div>
                </div>
            </div>
        </div>

        <br>
        <div v-if="catbyid.length>0">
            <p><b>
                    <font size="6px">Categories by id ....</font>
                </b></p>
            <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
                <div v-for="category in catbyid" >
                <div class="categorycss"
                    style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                    <p><b>#{{ category.id }} {{ category.name }}</b></p>
                    <p>Number of products : {{ category.products }}</p>
                    <router-link :to="{path:'/category/'+category.id, query:{id:category.id}}"><a
                            style="color:white">View</a></router-link>
                </div>
                </div>
            </div>
        </div>
    </div>

    `,
    data() {
        return {
            name:null,
            token : localStorage.getItem('auth-token'),
            bill_link: "/bills/"+localStorage.getItem('current_user'),
            show: false,
            prodbyname: [],
            prodbyid: [],
            prodbyunit: [],
            prodbyrate: [],
            prodbyquantity: [],
            prodbydate: [],
            catbyname: [],
            catbyid: [],
            user : false,
            manager : false,
            admin : false,
            role: localStorage.getItem('current_role'),
        }
    },
    methods : {
        search(){
            const res = fetch(`/search/${this.name}`, {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
                this.show = true;
                this.prodbyname = data.prodbyname;
                this.prodbyid = data.prodbyid;
                this.prodbyunit = data.prodbyunit;
                this.prodbyrate = data.prodbyrate;
                this.prodbyquantity = data.prodbyquantity;
                this.prodbydate = data.prodbydate;
                this.catbyname = data.catbyname;
                this.catbyid = data.catbyid;
            })
        },
    },
    created() {
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