const Login = Vue.component('login',
  {
    name:"Login",
    data() {
        return {
              login: "",
              password: "",
              error : null
        }
    },
    created(){
      fetch("/pr-lasterror")
          .then(r => r.json())
          .then(json => {
            this.error =json;
            //this.$http.get('/pr-lasterrorhandled');
            fetch("/pr-lasterrorhandled");
          });
    }
    ,
    methods: {
        _login(){
            if(this.login != "" && this.password != "") {
                if(this.password == "admin") {
                  window.location.href = "/conne";
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
