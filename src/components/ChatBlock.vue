<template>
    <div id="parentBlock" v-bind:class="{'logged-in': !userState }">
        <div class="messages-div">
            <button v-on:click="signOut" id="signOut"> Log out </button>

            <div v-bind:key="msg.key" v-for="msg in msg_array">
                <ChatBubble v-bind:msg="msg" />
            </div> 
        </div>
        <div class="chat-div">
            <form @submit.prevent="addMessageContent">
                <textarea v-model="message" name="message" placeholder="Enter your message here." id="mainPlaceholder" autofocus=true rows=3>
                </textarea>
                <input type="submit" class="button" value="Send">
            </form>
        </div>
    </div>
</template>

<script>
import ChatBubble from './ChatBubble.vue'
import firebase from './../config/firebase.js'

export default {
    name: 'ChatBlock',
    components: {
        ChatBubble,
    },
    props: {
        msg_array: Array,
        userState: Boolean
    },
    methods: {
        addMessageContent(){
            console.log("Sending message from Chatblock..")
            const newMessage = this.message
            this.$emit('send-msg', newMessage)
            
            this.message = ''
        },
        signOut(){
            firebase.auth().signOut()
            .then( result => {
                this.$emit('change-state')
                console.log("Log out success.")
                console.log(result)
            })
            .catch( error => {
                console.log(error)
            })
        }
    },
    created() {
        // console.log(this.msg_array)
    }
}
</script>

<style scoped>
    #parentBlock {
        position: relative;
        border: 1px solid lightblue;
        width: 500px;
        margin-left: auto;
        margin-right: auto;
        height: 80vh;
        overflow-x: auto;
        font-size: 1em;
        overflow: hidden;
    }

    .messages-div {
        border: 1px solid rgb(47, 109, 255);
        overflow-y: scroll;
        height: 71vh;
    }

    .chat-div {
        border: 1px solid rgb(47, 109, 255);
        height: 9vh;
    }
    #mainPlaceholder {
        margin: 5px;
        width: 390px;
        float: left;
        border: 3px solid #cccccc;
        padding: 5px;
        font-family: Tahoma, sans-serif;
        background-position: bottom right;
        background-repeat: no-repeat;
    }

    #signOut {
        position: relative;
        font-size: 1.2em;
        float: right;
        margin-top: 20px;
        background-color: white;
        border: 2px solid rgb(47, 47, 47);
        padding: 15px 20px 20px 20px;
        border-radius: 30%;
    }

    #signOut:hover {
        background-color: rgb(243, 23, 23);
        color: white;
        transition-duration: 0.3s;
        transform: rotate(360deg);
    }

    .button {
        float: left;
        width: 60px;
        padding: 10px;
        margin-top: 10px;
        margin-left: 5px;
    }

    .button:hover {
        /* transition: 0.3 ease-in-out; */
        transition: 0.3s ease-in-out;
        transform: scale(1.1, 1.1)
    }

    .logged-in {
        display: none;
    }
</style>