import Adminnav from "./Adminnav.js";
import Managernav from "./Managernav.js";
import Usernav from "./Usernav.js";

export default
{
    template : `
    <div>
        <Adminnav />
        <div>
        <label aria-hidden="true" style="color: white;">EDIT CATEGORY</label>
        <input type="text" name="name" placeholder="Category name"  required="" autocomplete="off" v-model="data.name">
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
                name : null
            },
            
        }
    },
    methods : {
        update(){
            const r = JSON.stringify(this.data);
            const res = fetch(`/editcategory/${this.$route.query.id}`, {
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