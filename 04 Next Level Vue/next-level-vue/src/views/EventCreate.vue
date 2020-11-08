<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        v-model="event.category"
        label="Select a category"
        :options="categories"
        :selected="option === value"
      />

      <h3>Name & describe your event</h3>
      <div class="field">
        <BaseInput
          label="Title"
          placeholder="Add an event title"
          v-model="event.title"
          class="field"
        />
      </div>

      <div class="field">
        <BaseInput
          label="Description"
          placeholder="Add a description"
          v-model="event.description"
          class="field"
        />
      </div>

      <h3>Where is your event?</h3>
      <div class="field">
        <BaseInput
          label="Location"
          placeholder="Add a location"
          v-model="event.location"
          class="field"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <BaseSelect
        v-model="event.time"
        label="Select a time"
        :options="times"
        class="field"
      />
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => NProgress.done())
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id,
        user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  },
  computed: {
    ...mapState(['user', 'categories']),
    ...mapGetters(['catLength'])
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
