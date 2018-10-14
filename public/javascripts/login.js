const Login = Vue.component('login',
  {
    name:"Login",
    data() {
        return {
              login: "",
              password: ""
        }
    },
    methods: {
        _login(){
            if(this.login != "" && this.password != "") {
                if(this.login == "admin" && this.password == "admin") {
                    localStorage.setItem('login', "admin");
                    this.$router.replace({name: "Search"})
                } else {
                    console.log("The username and / or password is incorrect");
                }
            } else {
                console.log("A username and password must be present");
            }
        }
    }
});
