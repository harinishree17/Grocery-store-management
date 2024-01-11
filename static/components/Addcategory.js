import Adminnav from "./Adminnav.js";
import Managernav from "./Managernav.js";
import Usernav from "./Usernav.js";

export default
{
    template : `
    <div>
        <Adminnav />
        <div>
        <label aria-hidden="true" style="color: white;">ADD CATEGORY</label>
        <input type="text" name="name" placeholder="Category name" required="" autocomplete="off" v-model="dat.name">
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
                name: null
            },
        }
    },
    methods : {
        async request(){
            const r = JSON.stringify(this.dat);
            const res = await fetch(`/addcategory`, {
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