<template>
  <div id="app">
    <HomeMessage msg="Welcome to KhalsuuChat"/>
    <AuthBlock v-bind:userState="userState" v-on:change-state="changeState" />
    <ChatBlock v-bind:userState="userState" v-on:change-state="changeState" v-bind:msg_array="msg_array" v-on:get-msgs="getMessages" v-on:send-msg="sendMessage" />
  </div>
</template>

<script>
import HomeMessage from './components/HomeMessage.vue'
import AuthBlock from './components/AuthBlock.vue'
import ChatBlock from './components/ChatBlock.vue'
import firebase from './config/firebase.js'

export default {
  name: 'App',
  components: {
    HomeMessage,
    AuthBlock,
    ChatBlock
  },
  data() {
    return {
      msg_array:[],
      user_displayName: null,
      userState: null
    }
  }, 
  methods: {
    getMessages(){
      this.msg_array = []
      let ref = firebase.database().ref('/messages')

      ref.orderByKey().once('value', snap => {
          snap.forEach( msg => {
              const msg_details = msg.val()
              // this.msg_array.push(msg_details)
              // this.msg_array = [...this.msg_array, msg_details]
              console.log(msg_details)
          })
      })
    },
    sendMessage(message){
      console.log("Sending message..")
      let messageRef = firebase.database().ref('/messages')
      this.user_displayName = (firebase.auth().currentUser.displayName == null) ? "Anonymous" : firebase.auth().currentUser.displayName
  
      console.log("Display name is")
      console.log(this.user_displayName)
      console.log(message)

      const messageObj = {
        sender: this.user_displayName,
        msg_content: message
      }
      
      messageRef.push(messageObj)

    },
    changeState(){
      this.userState = !this.userState
    }
  },
  created() {
    this.getMessages()

    let mainData = firebase.database().ref('/messages');
    mainData.on('child_added', (data) => {
      console.log(data.val())
      this.msg_array = [...this.msg_array, data.val()]
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
