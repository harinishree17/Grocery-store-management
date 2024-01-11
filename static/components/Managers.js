import Adminnav from "./Adminnav.js";
import Managernav from "./Managernav.js";
import Usernav from "./Usernav.js";

export default
{
    template : `
    <div>
        <Adminnav />
        <div>
        <p><b><font size="6px">All Managers</font></b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div v-for="user in bills" >
            <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                <p><b>#{{ user.id }}</b></p>
                <p><b>User Name : {{ user.name }}</b></p>
                <p><b>User email : {{ user.email }}</b></p>
            </div>
            </div>
        </div>
        </div>
    </div>
    `,
    data() {
        return {
            bills : [],
            token : localStorage.getItem('auth-token'),
            id : localStorage.getItem('current_user'),
            bill_link: "/bills/"+localStorage.getItem('current_user'),
            user : false,
            manager : false,
            admin : false,
            role: localStorage.getItem('current_role'),
        }
    },
    methods : {
        getbills(){
            const res = fetch(`/managerslist`, {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            this.bills = data;
            })
        },
    },
    created() {
        this.getbills();
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