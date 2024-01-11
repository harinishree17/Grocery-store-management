import Adminnav from "./Adminnav.js";
import Managernav from "./Managernav.js";
import Usernav from "./Usernav.js";

export default
{
    template : `
    <div>
        <Managernav />
        <div>
        <label aria-hidden="true" style="color: white;">ADD MANAGER</label>
        <input type="text" style="width=40px" name="name" placeholder="Manager name" required="" autocomplete="off" v-model="name">
        <input type="email" name="email" placeholder="Manager Email" required="" autocomplete="off" v-model="email">
        <input type="password" name="password" placeholder="Password" required="" v-model="password">
        <button @click="request">REQUEST</button>
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
            name: null,
            email: null,
            password: null
        }
    },
    methods : {
        request(){
            const data = {
                name:this.name,
                email:this.email,
                password:this.password
            }
            const r = JSON.stringify(data);
            const res = fetch(`/mcr`, {
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