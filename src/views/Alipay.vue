<template>
  <div v-html="apply"></div>
</template>


<script>
  export default {
    name: "pay",
    data(){
    },
    created() {
      const div = document.createElement('div');
      div.innerHTML = this.$route.query.htmls;
      document.body.appendChild(div);
      document.forms[0].submit();
    }
  }
</script>

<style scoped>

</style>
