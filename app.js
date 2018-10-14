Vue.use(VueRouter)

const defaultPath = "C:/Users/slagh/Documents/GitHub/ProjetWeb/public"
const routes = [
  { path: defaultPath + '/index.html', name: 'Login', component: Login},
  { path: defaultPath + '/search.html', name: 'Search', component: Search}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

var app = new Vue({
    el: "#app",
    data() {
        return {
        }
    },
    mounted() {
        console.log(this.authenticated);
        if(!localStorage.getItem('login') && !window.location.href.includes("public/index.html")) {
            this.$router.replace({name: 'Login'});
        }
        else if(window.location.href.includes("public/index.html") && localStorage.getItem('login')){
            this.$router.replace({name: 'Search'});
        }
    },
    components: { Login, Search },
    methods: {
        logout() {
            localStorage.removeItem("login");
            this.$router.replace({name: "Login"});
        }
    }, router
}
).$mount('#app')
