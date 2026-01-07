export default function({$axios, store, $auth, redirect}) {
    $axios.onError(error => {
        if(error.response.status === 422 ) {
            store.dispatch('validation/setErrors', error.response.data.errors);
        }

        if(error.response.status === 403 ) {
            // store.dispatch('forbidden/setErrors', error.response.data.message);
            // redirect('/forbidden')
            store.dispatch('validation/setErrors', error.response.data);
            window.location.href = "/iperrorpopup";
        }

        if(error.response.status === 400 ) {
            store.dispatch('validation/setErrors', error.response.data);
        }

        if(error.response.status === 401 ) {
            store.dispatch('validation/setErrors', error.response.data);
            // this.$router.push({ path: '/autherror' })
            window.location.href = "/autherror";
        }

        if(error.response.status === 404 ) {
            store.dispatch('validation/setErrors', error.response.data);
        }
        
        if(error.response.status === 500 ) {
            store.dispatch('validation/setErrors', error.response.data);
        }

        // if (error.response.status === 401) {
        //     if ($auth.loggedIn) {
        //       $auth.logout();
        //     }
        //     redirect("/login");
        //   }        

        return Promise.reject(error);
    });

    $axios.onRequest( () => {
        store.dispatch('validation/clearErrors');

    });

}