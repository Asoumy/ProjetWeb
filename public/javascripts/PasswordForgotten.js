var reg = new Vue( {
  el: "#reg",
  data:{
    return{
      loginsu : '',
      message: 'Register Form',
      passwordsu : '',
      emailsu : '',
      passwordconf :  ''
    }
  },
  methods:{
    register: function() {
      window.localStorage.setItem("Send", this.loginsu);
      window.location.href = 'search.html';
    },

    testfunc :  function(){
      this.message = window.localStorage.getItem("Send");
    }
  }
})
