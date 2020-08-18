<template>
  <div id="app">
    <HomeMessage msg="Welcome to KhalsuuChat"/>
    <AuthBlock v-bind:userState="userState" v-on:change-state="changeState" />
    <ChatBlock v-bind:userState="userState" v-on:change-state="changeState" v-bind:msg_array="msg_array" v-on:send-msg="sendMessage" />
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
    //Method to get all existing data in the firebase database after the component is created.
    getMessages(){
      console.log("Getting messages...")
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

    //Method to get the message content from emit, then create a message object to be pushed in the firebase database.
    sendMessage(message){
      console.log("Sending message..")
      let messageRef = firebase.database().ref('/messages')
      this.user_displayName = (firebase.auth().currentUser.displayName == null) ? "Anonymous" : firebase.auth().currentUser.displayName

      if(this.user_displayName == undefined){
        this.user_displayName = "Undefined"
      }
      const messageObj = {
        sender: this.user_displayName,
        msg_content: message
      }
      
      messageRef.push(messageObj)

    },

    //Method to change instance state whenever a user logs in or out.
    changeState(){
      this.userState = !this.userState
    }
  },
  created() {
    this.getMessages()


    //Codeblock that updates the message array whenever a new child gets appended in the firebase database. (Does not support real time deleting)
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
