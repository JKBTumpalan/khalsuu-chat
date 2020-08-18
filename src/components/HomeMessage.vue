<template>
  <div class="hello">
    <img alt="ProductLogo" id="khalsuuLogo" src="./../assets/logo3.png">
    <h1>{{ msg }}</h1>
    <p>
      For a guide on how to use this real-time chat web application,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">KhalsuuChat github repository.</a>.
    </p>

    <h3> Don't worry, your credentials are secured by Google</h3>
  </div>
</template>

<script>
export default {
  name: 'HomeMessage',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}


#khalsuuLogo {
  height: 350px;
  width: 350px;
}
</style>
