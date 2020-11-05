<template>
  <div>
    <h1>Event List for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Previous Page
      </router-link>
    </template>
    <template v-if="event.totalEvents > page * perPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
      >
        Next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store/index'

const getPageEvents = (routeTo, next) => {
  const currentPage = parseInt(routeTo.query.page) || 1
  store
    .dispatch('fetchEvents', {
      page: currentPage
    })
    .then(() => {
      routeTo.params.page = currentPage
      next()
    })
    .catch(() => next({ name: 'network-issue' }))
}
export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  data() {
    return {
      perPage: 3
    }
  },
  computed: {
    ...mapState(['event', 'user'])
  }
}
</script>

<style></style>
