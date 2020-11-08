<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        v-model="event.category"
        label="Select a category"
        :options="categories"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p class="errorMessage" v-if="!$v.event.category.required">
          Category is required
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        placeholder="Add an event title"
        v-model="event.title"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p class="errorMessage" v-if="!$v.event.title.required">
          Title is required
        </p>
      </template>

      <BaseInput
        label="Description"
        placeholder="Add a description"
        v-model="event.description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p class="errorMessage" v-if="!$v.event.description.required">
          Description is required
        </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        placeholder="Add a location"
        v-model="event.location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p class="errorMessage" v-if="!$v.event.location.required">
          Location is required
        </p>
      </template>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ error: $v.event.date.$error }"
          @opened="$v.event.date.$touch()"
        />
        <!-- Date validation doesn't work because @opened is not triggred 🤔 -->
        <template v-if="$v.event.date.$error">
          <p class="errorMessage" v-if="!$v.event.date.required">
            Date is required
          </p>
        </template>
      </div>

      <BaseSelect
        v-model="event.time"
        label="Select a time"
        :options="times"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p class="errorMessage" v-if="!$v.event.time.required">
          Time is required
        </p>
      </template>
      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
      >
        Submit
      </BaseButton>
      <p class="errorMessage" v-if="$v.$anyError">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

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
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
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
      }
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
