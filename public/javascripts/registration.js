const Register = Vue.component('register',
{
  name: 'Register',
  data(){
    return{
      loginsu : '',
      passwordsu : '',
      emailsu : '',
      passwordconf :  ''
    }
  },
  methods:{
    register(){

      if(this.passwordsu != this.passwordconf)
      {
        console.log("Confirmez votre mot de passe");
        return;
      }

      var u = {login: this.loginsu, email: this.emailsu, password: this.passwordsu};
      var uj = JSON.stringify(u);

      localStorage.setItem(u.login, uj);

      console.log("compte creéé avec succès");
      this.$router.replace({name: 'Login'});
    },
    testfunc(){
      this.message = window.localStorage.getItem("login");
    }
  }
});
