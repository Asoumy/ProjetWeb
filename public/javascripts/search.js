const Search = Vue.component('search',
    {
        name : "Search",
        data() {
            return {
              test : this.$parent.getAuthenticated()
            }
        },
        methods: {
            logout() {
                this.$emit("authenticated", false);
                this.$parent.logout();
            }
        }
    });
