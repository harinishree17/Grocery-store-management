import Adminnav from "./Adminnav.js";
import Managernav from "./Managernav.js";
import Usernav from "./Usernav.js";

export default
{
    template : `
    <div>
        <Managernav />
        <div>
        <label aria-hidden="true" style="color: white;">DELETE CATEGORY</label>
        <input type="text" style="width=40px" name="name" placeholder="Category ID" required="" autocomplete="off" v-model="data.category_id">
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
            data:{
                id: this.id,
                category_id: null
            }
        }
    },
    methods : {
        request(){
            const r = JSON.stringify(this.data);
            const res = fetch(`/cdr`, {
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