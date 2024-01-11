import router from './router.js'
import Base from './components/Base.js'

new Vue({
    el: "#app",
    template: '<div><Base /><router-view /></div>',
    router,
    components : {
        Base,
    }
})

// new Vue({
//     router,
//     render: (h) => h(App),
// }).$mount("#app");