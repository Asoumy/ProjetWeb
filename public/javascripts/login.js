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

            var u = JSON.parse(localStorage.getItem(this.login));

            console.log(u.password + ' ' + u.login);
            if(this.login != "" && this.password != "" && u != null) {
                if(this.password == u.password) {
                    localStorage.setItem('login', this.login);
                    this.$router.replace({name: "Search"});
                } else {
                    console.log("The username and / or password is incorrect");
                }
            } else {
                console.log("A username and password must be present");
            }
        }
    }/* ,

    created(){
      this.$http.get('/list').then((response) => {
      this.myList = response.data;
    })

  } */


});
