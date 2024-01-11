export default
{
    template : `
    <div>
        <div style="background-color:black;opacity:0.7;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
            <router-link to="/home"><a style="margin-right: 2%;color:white">Home</a></router-link>
            <router-link to="/mrequests"><a style="margin-right: 2%;color:white">Requests</a></router-link>
            <router-link to="/search"><a style="margin-right: 2%;color:white">Search</a></router-link>
            <router-link to="/allbills"><a style="margin-right: 2%;color:white">Bills</a></router-link>
            <router-link to="/addmanager"><a style="margin-right: 2%;color:white">Add Manager</a></router-link>
            <router-link to="/addproduct"><a style="margin-right: 2%;color:white">Add Product</a></router-link>
            <router-link to="/addcategoryr"><a style="margin-right: 2%;color:white">Add Category</a></router-link>
            <router-link to="/editcategoryr"><a style="margin-right: 2%;color:white">Edit Category</a></router-link>
            <router-link to="/deletecategoryr"><a style="margin-right: 2%;color:white">Delete Category</a></router-link>
            <router-link to="/"><a style="margin-right: 2%;color:white">Logout</a></router-link>
            
        </div>
        <button @click='dcsv' style="display: inline-block;outline: none;cursor: pointer;border-radius: 3px;padding: 5px 5px;width:300px;border: 0;line-height: 1.15;">Download Products Report</button><span v-if='isWaiting'> Waiting... </span>
    </div>
    `,
    data() {
        return {
            isWaiting: false,
        }
    },
    methods: {
        async dcsv() {
            this.isWaiting = true
            const res = await fetch('/dcsv')
            const data = await res.json()
            if (res.ok) {
                const taskId = data['task-id']
                const intv = setInterval(async () => {
                    const csv_res = await fetch(`/get-csv/${taskId}`)
                    if (csv_res.ok) {
                    this.isWaiting = false
                    clearInterval(intv)
                    window.location.href = `/get-csv/${taskId}`
                }
            }, 1000)
            }
        },
    }
}