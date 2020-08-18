<template>
    <div id="bubbleParent">
        <b> {{ msg.sender }}:</b>
        <br>
        {{ msg.msg_content }}
    </div>
</template>

<script>
export default {
    name: 'ChatBubble',
    props:["msg"]
}
</script>

<style>
    #bubbleParent {
        width: 150px;
        padding: 10px 15px 10px 10px;
        border: 3px solid rgb(56, 56, 56);
        background-color: rgb(151, 161, 255);
        border-radius: 50px 50px 50px 1px;
        margin-left: 20px;
        margin-top: 15px;
    }
    
    #bubbleParent:hover {
        background-color: rgb(80, 139, 248);
    }

    b {
        display: block;
    }
</style>