export default
{
    template : `
    <div>
        <div style="background-color:black;opacity:0.7;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
        <router-link to="/home"><a style="margin-right: 2%;color:white">Home</a></router-link>
            <router-link to="/arequests"><a style="margin-right: 2%;color:white">Requests</a></router-link>
            <router-link to="/addcategory"><a style="margin-right: 2%;color:white">Add Category</a></router-link>
            <router-link to="/search"><a style="margin-right: 2%;color:white">Search</a></router-link>
            <router-link to="/users"><a style="margin-right: 2%;color:white">Users</a></router-link>
            <router-link to="/managers"><a style="margin-right: 2%;color:white">Managers</a></router-link>
            <router-link to="/"><a style="margin-right: 2%;color:white">Logout</a></router-link>
        </div>
    </div>
    </div>
    `,
    data() {
        return {
            products : [],
            categories : [],
            token : localStorage.getItem('auth-token'),
        }
    },
    methods : {
        getproducts(){
            const res = fetch('/products', {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            this.products = data;
            })
        },
        getcategories(){
            const res = fetch('/categories', {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            this.categories = data;
            })
        },
    },
    created() {
        this.getproducts();
        this.getcategories();
    },
}