import Adminnav from "./Adminnav.js";
import Managernav from "./Managernav.js";
import Usernav from "./Usernav.js";

export default
{
    template : `
    <div>
        <Managernav />
        <div>
        <label aria-hidden="true" style="color: white;">ADD PRODUCT</label>
        <input type="text" name="name" placeholder="Product name" required="" autocomplete="off" v-model="dat.name">
        <input type="number" name="category_id" placeholder="Category id" required="" autocomplete="off" v-model="dat.category_id">
        <input type="number" name="rate" placeholder="Price per unit" required="" v-model="dat.rate">
        <input type="number" name="quantity" placeholder="Stock available" required="" v-model="dat.quantity">
        <input type="text" name="unit" placeholder="Measured by unit" required="" v-model="dat.unit">
        <input type="date" name="date" placeholder="Manufacture date" required="" v-model="dat.date">
        <button @click="request">ADD</button>
        </div>
    </div>
    `,
    data() {
        return {
            token : localStorage.getItem('auth-token'),
            user : false,
            manager : false,
            admin : false,
            id : localStorage.getItem('current_user'),
            role: localStorage.getItem('current_role'),
            dat : {
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
        async request(){
            const r = JSON.stringify(this.dat);
            const res = await fetch(`/addproduct`, {
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
        }
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