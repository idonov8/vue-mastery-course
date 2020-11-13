<template>
<div
         class="task"
         draggable
         @dragstart="pickupTask($event, taskIndex, columnIndex)"
         @click="goToTask(task)"
         @dragover.prevent
         @dragenter.prevent
         @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
         >
          <span class="w-full flex-no-shrink fond-bold">
            {{task.name}}
          </span>
          <p class="w-full flex-no-shrink mt-1 text-sm"
          v-if="task.description">
            {{task.description}}
          </p>
         </div>
</template>

<script>
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
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
    pickupTask (event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-task-index', taskIndex)
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'task')
    },
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
