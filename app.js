Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Login', component: Login},
  { path: '/search', name: 'Search', component: Search},
  { path: '/register', name: 'Register', component: Register}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

var app = new Vue({
    el: "#app",
    data() {
        return {
          user: null
        }
    },
    mounted() { /*
        console.log(this.authenticated);
        if(!localStorage.getItem('login') && !window.location.href.includes("public/index.html")
                  && !window.location.href.includes("public/registration.html")) {
            this.$router.replace({name: 'Login'});
        }
        else if(window.location.href.includes("public/index.html") && localStorage.getItem('login')){
            this.$router.replace({name: 'Search'});
        } */
    },
    created(){
      fetch("/pr-user")
          .then(r => r.json())
          .then(json => {
            this.user=json;
          });
    }
    ,
    components: { Login, Search, Register },
    methods: {
        logout() {
            localStorage.removeItem("login");
            this.$router.replace({name: "Login"});
        }
    }, router
}
).$mount('#app')

module.exports = app;
