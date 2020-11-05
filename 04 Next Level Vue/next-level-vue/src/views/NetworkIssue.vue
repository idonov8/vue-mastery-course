<template>
  <div>
    <h1>Oh No!</h1>
    <h3>
      Looks like you're internet connection kinda suck :(
    </h3>
    <h4>
      Go back and try again...
    </h4>

    <router-link :to="{ name: 'event-list' }">
      Back to the home page
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
