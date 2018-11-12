const Search = Vue.component('search',
    {
        name : "Search",
        data() {
            return {
              character: ""
            }
        },
        methods: {
            logout() {
                this.$parent.logout();
            }
        }
    });
