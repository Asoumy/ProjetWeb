const Results = Vue.component('results',
{
  name:"Results",
  data(){
    return{
      test : "connected",
      articles : []
    }
  },
  created() {

    fetch("/pr-selectedfileids")
        .then(r => r.json())
        .then(json => {
          var articleIDs = JSON.parse(json);

          for(i = 0; i < articleIDs.length; i++){
            fetch('/pr-article-' + articleIDs[i])
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
