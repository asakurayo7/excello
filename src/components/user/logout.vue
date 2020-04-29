<template>
    
</template>
<script>
export default {
    mounted:function() {
     // remove a cookie
this.$cookies.remove("user");
this.$cookies.set("login",false);
 this.$router.replace('/login')
  }
}
</script>