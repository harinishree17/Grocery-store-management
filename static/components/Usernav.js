export default
{
    template : `
    <div style="background-color:black;opacity:0.7;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;">
    <router-link to="/home"><a style="margin-right: 2%;color:white">Home</a></router-link>
    <router-link to="/cart"><a style="margin-right: 2%;color:white">Cart</a></router-link>
    <router-link :to="bill_link"><a style="margin-right: 2%;color:white">Bills</a></router-link>
    <router-link to="/search"><a style="margin-right: 2%;color:white">Search</a></router-link>
    <router-link to="/"><a style="margin-right: 2%;color:white">Logout</a></router-link>
</div>
    `,
    data() {
        return {
            bill_link: "/bills/"+localStorage.getItem('current_user'),
        }},
}