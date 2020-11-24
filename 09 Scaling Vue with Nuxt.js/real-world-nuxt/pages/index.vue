<template>
  <div>
    <h1>Events</h1>

    <event-card
      v-for="(event, index) in events"
      :key="index"
      :event="event"
      :data-index="index"
    />
  </div>
</template>

<script>
import EventCard from '~/components/EventCard.vue'

export default {
  components: { EventCard },
  async asyncData({ $axios, error }) {
    try {
      const { data } = await $axios.get('http://localhost:3000/events')
      return {
        events: data,
      }
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch events, please try again later',
      })
    }
  },
  head() {
    return {
      title: 'Event Listing',
    }
  },
}
</script>
