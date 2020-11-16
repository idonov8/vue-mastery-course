<template>
<AppDrop @drop="moveTaskOrColumn">
    <AppDrag
        :transferData="{
            type: 'task',
            fromColumnIndex: columnIndex,
            fromTaskIndex: taskIndex
        }"
        class="task"
         @click="goToTask(task)"
        >
          <span class="w-full flex-no-shrink fond-bold">
            {{task.name}}
          </span>
          <p class="w-full flex-no-shrink mt-1 text-sm"
          v-if="task.description">
            {{task.description}}
          </p>

    </AppDrag>
</AppDrop>
</template>

<script>
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'

export default {
  components: {
    AppDrag,
    AppDrop
  },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    }
  }
}
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
