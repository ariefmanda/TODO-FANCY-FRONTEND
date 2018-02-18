<template>
<div>
    <nav class="navbar navbar-expand-lg bg-white">
        <div class="container">
                <i id="foto">
                    </i>
            <div class="navbar-translate">
                    
                <a class="navbar-brand navbar-toggler-right">
                    <img alt="foto" :src="image_url" class="rounded-circle" v-if="image_url"/>
                        toDO {{name}}
                </a>

                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <ul class="navbar-nav">
                    <li class="nav-item active" id="gettingstarted">
                    <a style="cursor:pointer;" class="nav-link" @click="terbang" v-if="!token"> Getting Start
                    </a>
                    <a style="cursor:pointer;" class="nav-link" @click="logout" v-else>Logout</a>
                    </li>
                </ul>
                </button>
            </div>
            
            <div class="collapse navbar-collapse justify-content-end" id="navigation">
                <ul class="navbar-nav">
                    <li class="nav-item active" id="gettingstarted">
                    <a style="cursor:pointer;" class="nav-link" @click="terbang" v-if="!token"> Getting Start
                    </a>
                    <a style="cursor:pointer;" class="nav-link" @click="logout" v-else>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </div>
</template>

<script>
import axios from "axios";
let url = "http://35.200.163.245:5902/api";
export default {
  name: "Header",
  data() {
    return {
      token: localStorage.getItem("token") || null,
      image_url: localStorage.getItem("image_url") || null,
      name: localStorage.getItem("name") || null,
    };
  },
  methods: {
    terbang() {
      this.login(e=>{
          this.datalogin();

      });
    },
    login(cb) {
      FB.login(
        function(response) {
          if (response.authResponse) {
            localStorage.setItem("fbtoken", response.authResponse.accessToken);
            console.log("islogin connect", response);
            console.log(localStorage);
            cb(response)
          } else {
            console.log(response, "belum connect");
          }
        },
        { scope: "public_profile,email" }
      );
    },
    logout() {
      console.log("logout");
      FB.logout(function(e) {
        localStorage.clear();
        window.location = "/";
        console.log(localStorage);
        console.log(e);
      });
    },
    datalogin() {
        console.log('masuk');
      axios
        .get(`${url}/auth`, {
          headers: {
            fbtoken: localStorage.getItem("fbtoken")
          }
        })
        .then(data => {
            console.log('masuk');
          this.name = data.data.name;
          this.token = data.data.token;
          localStorage.setItem("name", data.data.name);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("email", data.data.email);
          localStorage.setItem("image_url", data.data.image_url);
          this.image_url = data.data.image_url;
          console.log('haihai',localStorage);

          this.$router.push({
              name:'todo'
          })
        //   window.location.href='/'
        })
        .catch(err => console.error(err));
    }
  }
};

window.fbAsyncInit = function() {
  FB.init({
    appId: "1530275277041978",
    cookie: true, // enable cookies to allow the server to access
    // the session
    xfbml: true, // parse social plugins on this page
    version: "v2.8" // use graph api version 2.8
  });
  FB.getLoginStatus(function(response) {
    console.log(response);
  });
};
// Load the SDK asynchronously
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>