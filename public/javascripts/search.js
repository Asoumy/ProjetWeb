const Search = Vue.component('search',
    {
        name : "Search",
        data() {
            return {
              keyword: ""
            }
        },
        methods: {
            logout() {
                this.$parent.logout();
            }
        }
    });
