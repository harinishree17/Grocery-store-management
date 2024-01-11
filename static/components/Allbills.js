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
        <p><b><font size="6px">All Bills</font></b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div v-for="bill in bills" >
            <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                <p><b>#{{ bill.id }}</b></p>
                <p>No of items : {{ bill.items }}</p>
                <p>Total : {{ bill.total }}</p>
                <router-link :to="{path:'/bill/'+bill.id, query:{id:bill.id}}"><a style="color:white" >View</a></router-link>
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
            const res = fetch(`/allbills`, {
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