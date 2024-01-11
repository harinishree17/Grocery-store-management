import Adminnav from "./Adminnav.js";
import Managernav from "./Managernav.js";
import Usernav from "./Usernav.js";

export default
{
    template : `
    <div>
        <Usernav v-show="this.user"/>
        <Managernav />
        <Adminnav v-show="this.admin"/>
        <div>
        <p><b><font size="6px">Create Requests</font></b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div v-for="req in create" >
            <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                <p><b>#{{ req.id }}</b></p>
                <p v-if="!req.is_approved" style="color:orange">Category to be added : {{ req.category_name }}</p>
                <p v-if="req.is_approved" style="color:green">Category added : {{ req.category_name }}</p>
            </div>

            </div>
        </div>
        <p><b><font size="6px">Edit Requests</font></b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div v-for="req in edit" >
            <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                <p><b>#{{ req.id }}</b></p>
                <p>Category ID : {{ req.category_id }}</p>
                <p>Category change to be : {{ req.category_name }}</p>
                </div>
            </div>
        </div>
        <p><b><font size="6px">Delete Requests</font></b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div v-for="req in deleter" >
            <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                <p><b>#{{ req.id }}</b></p>
                <p>Category to be deleted : {{ req.category_id }}</p>
            </div>
            </div>
        </div>
        </div>
    </div>
    `,
    data() {
        return {
            create : [],
            edit : [],
            deleter : [],
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
        getrequests(){
            const res = fetch(`/creater/${this.id}`, {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            this.create = data;
            })
            const res2 = fetch(`/editr/${localStorage.getItem('current_user')}`, {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res2) => {
                return res2.json();
            }).then((data) => {
            console.log(data);
            this.edit = data;
            })
            const res3 = fetch(`/deleter/${localStorage.getItem('current_user')}`, {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res3) => {
                return res3.json();
            }).then((data) => {
            console.log(data);
            this.deleter = data;
            })
        },
    },
    created() {
        this.getrequests();
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