import Adminnav from "./Adminnav.js";
import Managernav from "./Managernav.js";
import Usernav from "./Usernav.js";

export default
{
    template : `
    <div>
        <Managernav />
        <div>
        <label aria-hidden="true" style="color: white;">EDIT PRODUCT</label>
        <input type="text" name="name" placeholder="Product name"  required="" autocomplete="off" v-model="data.name">
        <input type="number" name="category_id" placeholder="Category id" required="" autocomplete="off" v-model="data.category_id">
        <input type="number" name="rate" placeholder="Price per unit"  required="" v-model="data.rate">
        <input type="number" name="quantity" placeholder="Stock available"  required="" v-model="data.quantity">
        <input type="text" name="unit" placeholder="Measured by unit"  required="" v-model="data.unit">
        <input type="date" name="date" placeholder="Expiry date"  required="" v-model="data.date">
        <button @click="update">UPDATE</button>
        </div>
    </div>
    `,
    data() {
        return {
            token : localStorage.getItem('auth-token'),
            user : false,
            manager : false,
            admin : false,
            mid : localStorage.getItem('current_user'),
            role: localStorage.getItem('current_role'),
            data : {
                name: null,
            category_id: null,
            rate: null,
            quantity:null,
            unit:null,
            date:null
            },
            
        }
    },
    methods : {
        update(){
            const r = JSON.stringify(this.data);
            const res = fetch(`/editproduct/${this.$route.query.id}`, {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
                body: r,
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            })
            this.$router.push("/home");
        },
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
            this.data = data;
            })
        },
    },
    created() {
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