<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>{{ catLength }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['user', 'categories']),
    ...mapGetters(['catLength'])
  }
}
</script>

<style></style>
