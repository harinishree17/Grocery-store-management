import Home from './components/Home.js'
import Login from './components/Login.js'
import Cart from './components/Cart.js'
import Bills from './components/Bills.js'
import Search from './components/Search.js'
import Product from './components/product.js'
import Category from './components/category.js'
import Bill from './components/bill.js'
import Allbills from './components/Allbills.js'
import Mrequests from './components/Mrequests.js'
import Addmanager from './components/Addmanager.js'
import Addproduct from './components/Addproduct.js'
import Addcategoryr from './components/Addcategoryr.js'
import Editcategoryr from './components/Editcategoryr.js'
import Deletecategoryr from './components/Deletecategoryr.js'
import Editproduct from './components/Editproduct.js'
import Arequests from './components/Arequests.js'
import Users from './components/Users.js'
import Managers from './components/Managers.js'
import Editcategory from './components/Editcategory.js'
import Addcategory from './components/Addcategory.js'

const routes = [
    { path: '/home', component: Home, name: 'Home' },
    { path: '/', component: Login, name: 'Login' },
    { path: '/cart', component: Cart, name: 'Cart' },
    { path: '/bills/:id', component: Bills, name: 'Bills', props: true},
    { path: '/search', component: Search, name: 'Search' },
    { path: '/product/:id', component: Product, name: 'Product', props: true },
    { path: '/category/:id', component: Category, name: 'Category', props: true },
    { path: '/bill/:id', component: Bill, name: 'Bill', props: true },
    { path: '/allbills', component: Allbills, name: 'Allbills' },
    { path: '/mrequests', component: Mrequests, name: 'Mrequests' },
    { path: '/addmanager', component: Addmanager, name: 'Addmanager' },
    { path: '/addproduct', component: Addproduct, name: 'Addproduct' },
    { path: '/addcategoryr', component: Addcategoryr, name: 'Addcategoryr' },
    { path: '/editcategoryr', component: Editcategoryr, name: 'Editcategoryr' },
    { path: '/deletecategoryr', component: Deletecategoryr, name: 'Deletecategoryr' },
    { path: '/editproduct/:id', component: Editproduct, name: 'Editproduct', props: true },
    { path: '/arequests', component: Arequests, name: 'Arequests' },
    { path: '/users', component: Users, name: 'Users' },
    { path: '/managers', component: Managers, name: 'Managers' },
    { path: '/editcategory/:id', component: Editcategory, name: 'Editcategory', props: true },
    { path: '/addcategory', component: Addcategory, name: 'Addcategory' },
]


export default new VueRouter({
    routes,
})