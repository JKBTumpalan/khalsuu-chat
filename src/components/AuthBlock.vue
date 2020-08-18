<template>
  <div id="auth-div" v-bind:class="{'logged-in': userState }">
      <button class ="signButton" v-on:click= "signGoogle"> <img src="./../assets/google.png" class ="signIcons"> Sign in with Google </button>
      <button class ="signButton" v-on:click= "signAnon"> <img src="./../assets/guest.png" class ="signIcons"> Sign in as Guest </button>
  </div>
</template>

<script>
import firebase from './../config/firebase.js'

export default {
    name: 'AuthBlock',
    props: {
      userState: Boolean
    },
    methods: {
      //Sign in using google auth
      signGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().languageCode = 'tl'
        firebase.auth()
          .signInWithPopup(provider)
          .then(result => {
            this.$emit('change-state')
            console.log(result.credential.accessToken);
            console.log(result.user);
          })
          .catch(error => {
            console.log(error.code);
            console.log(error.message);
          })
      },
      //Anonymous sign in
      signAnon(){
        firebase.auth().signInAnonymously()
          .then(() => {console.log('Logged in as anonymous!')})
          .catch((error) => console.log(error))

        this.$emit('change-state')

      },
    }
}
</script>

<style scoped>

  #auth-div {
    margin: auto;
    width: 350px;
    height: 200px;
  }

  .signButton {
    display: block;
    margin-left: auto;
    margin-top: 20px;
    margin-right: auto;
    background-color: white;
    border: 1px solid rgb(125, 125, 246);
    padding: 5px 20px 20px 20px;
    border-radius: 5px 25px 5px 25px;
  }

  .signButton:hover {
    background-color: rgb(0, 238, 246);
    transition: 0.3s ease-in-out;
    transform: scale(1.1, 1.1)
  }

  .signIcons {
    height: 30px;
    width: 30px;
    position: relative;
    top: 10px;
  }

  .logged-in {
    display: none;
  }

  #signOut {
    display: block;
  }
</style>