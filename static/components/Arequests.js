import Adminnav from "./Adminnav.js";
import Managernav from "./Managernav.js";
import Usernav from "./Usernav.js";

export default
{
    template : `
    <div>
        <Adminnav/>
        <div>
        <p><b><font size="6px">Create Requests</font></b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div v-for="req in create" >
            <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                <p><b>#{{ req.id }}</b></p>
                <p>Manager ID : {{ req.manager_id }}</p>
                <p>Category to be added : {{ req.category_name }}</p>
                <button @click='changec("create",req.category_name)' style="display: inline-block;outline: none;cursor: pointer;border-radius: 3px;padding: 5px 5px;border: 0;width:100px;line-height: 1.15;">APPROVE</button>
            </div>
            </div>
        </div>
        <p><b><font size="6px">Edit Requests</font></b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div v-for="req in edit" >
            <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                <p><b>#{{ req.id }}</b></p>
                <p>Manager ID : {{ req.manager_id }}</p>
                <p>Category ID : {{ req.category_id }}</p>
                <p>Category change to be : {{ req.category_name }}</p>
                <button @click='changee("edit", req.category_id, req.category_name)' style="display: inline-block;outline: none;cursor: pointer;border-radius: 3px;padding: 5px 5px;border: 0;width:100px;line-height: 1.15;">APPROVE</button>
            </div>
            </div>
        </div>
        <p><b><font size="6px">Delete Requests</font></b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div v-for="req in deleter" >
            <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                <p><b>#{{ req.id }}</b></p>
                <p>Manager ID : {{ req.manager_id }}</p>
                <p>Category to be deleted : {{ req.category_id }}</p>
                <button @click='changed("delete", req.category_id)' style="display: inline-block;outline: none;cursor: pointer;border-radius: 3px;padding: 5px 5px;border: 0;width:100px;line-height: 1.15;">APPROVE</button>
            </div>
            </div>
        </div>
        <p><b><font size="6px">Manager Requests</font></b></p>
        <div class="content" style="margin:35px;display:flex;flex-direction: row;flex-wrap: wrap;">
            <div v-for="req in man" >
            <div class="categorycss" style="background-color:black;opacity:0.7;flex: 20%;margin:20px;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
                <p><b>#{{ req.id }}</b></p>
                <p>Manager Name : {{ req.name }}</p>
                <p>Manager Password : {{ req.password }}</p>
                <p>Manager Email : {{ req.email }}</p>
                <button @click='changem("delete", req.name, req.password, req.email)' style="display: inline-block;outline: none;cursor: pointer;border-radius: 3px;padding: 5px 5px;border: 0;width:100px;line-height: 1.15;">APPROVE</button>
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
            man : [],
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
            const res = fetch(`/createrequests`, {
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
            const res2 = fetch(`/editrequests`, {
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
            const res3 = fetch(`/deleterequests`, {
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
            const res4 = fetch(`/managerequests`, {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res4) => {
                return res4.json();
            }).then((data) => {
            console.log(data);
            this.man = data;
            })
        },
        changec(string, catname){
            let data = { name: catname}
            const r = JSON.stringify(data);
            const res = fetch(`/change/${string}`, {
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
            this.$router.push("/arequests");
        },
        changee(string, catid, catname){
            let data = { name: catname, id:catid}
            const r = JSON.stringify(data);
            const res = fetch(`/change/${string}`, {
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
            this.$router.push("/arequests");
        },
        changed(string, catid){
            let data = { id:catid}
            const r = JSON.stringify(data);
            const res = fetch(`/change/${string}`, {
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
            this.$router.push("/arequests");
        },
        changem(string, rname, rpassword, remail){
            let data = { name:rname, password:rpassword, email:remail}
            const r = JSON.stringify(data);
            const res = fetch(`/change/manager`, {
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
            this.$router.push("/arequests");
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