const ListArticles = Vue.component('list-articles',
{
  name:"ListArticles",
  data(){
    return{
      test : "connected",
      articles : []
    }
  },
  created() {

    fetch("/pr-listarticles")
        .then(r => r.json())
        .then(json => {
          var articleNames = JSON.parse(json);

          for(i = 0; i < articleNames.length && i <= 10; i++){
            fetch('/pr-article-' + articleNames[i].split('_')[0])
                .then(r => r.json())
                .then(json => {
                  this.articles.push(json);
                });
          }

        });


  },
  methods:{

  }
});
