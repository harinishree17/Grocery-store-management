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
        <p><b>#{{ bill_id }}</b></p>
        <p><b>Total : {{total}}</b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
        <div v-for="product in bill" >
        <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
            <p><b>#{{ product.product_id }} {{ product.product_name }}</b></p>
            <p>Price worth : {{ product.price }}</p>
            <p>Quantity Purchased : {{ product.quantity }}</p>
        </div>
        </div>
        </div>
        </div>
    </div>
    `,
    data() {
        return {
            bill : [],
            total:0,
            token : localStorage.getItem('auth-token'),
            bill_link: "/bills/"+localStorage.getItem('current_user'),
            bill_id : this.$route.query.id,
            // id: 2,
            user : false,
            manager : false,
            admin : false,
            role: localStorage.getItem('current_role'),
        }
    },
    methods : {
        getbill(){
            console.log(this.$route);
            const res = fetch(`/billdetails/${this.$route.query.id}`, {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            this.bill = data;
            })
        },
        gettotal(){
            console.log(this.$route);
            const res = fetch(`/billtotal/${this.$route.query.id}`, {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            this.total = data.total;
            })
        },
    },
    created() {
        // const id = 2;
        this.getbill();
        this.gettotal();
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