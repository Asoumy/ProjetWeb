const ArticleView = Vue.component('articleview',
{
  name:"ArticleView",
  data(){
    return{
      article : null
    }
  },
  created() {
    fetch("/pr-requestedarticle")
        .then(r => r.json())
        .then(json => {
          this.article=json;
        });
  },
  methods:{

  }
});
