<template>
  <div class="board">
    <div class="flex flex-row items-start">
     <div
     class="column"
     v-for="(column, columnIndex) in board.columns"
     :key="columnIndex"
     draggable
     @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
     @dragover.prevent
     @dragenter.prevent
     @dragstart.self="pickupColumn($event, columnIndex)"
     >
       <div class="flex items-center mb-2 font-bold">
         {{column.name}}
       </div>
       <div class="list-reset">
         <div
         class="task"
         v-for="(task, taskIndex) in column.tasks"
         :key="taskIndex"
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
         <input type="text"
         class="block p-2 w-full bg-transparent outline-none"
         placeholder="+ Enter new task"
         @keyup.enter="createTask($event, column.tasks)">
       </div>
      </div>
    </div>

    <div
    class="task-bg"
    v-if="isTaskOpen"
    @click.self="close"
    >
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    close () {
      this.$router.push({ name: 'board' })
    },
    createTask (event, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: event.target.value
      })
      event.target.value = ''
    },
    pickupTask (event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-task-index', taskIndex)
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'task')
    },
    pickupColumn (event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'column')
    },
    moveTaskOrColumn (event, toTasks, toColumnIndex, toTaskIndex) {
      const type = event.dataTransfer.getData('type')
      if (type === 'task') {
        this.moveTask(event, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      } else {
        this.moveColumn(event, toColumnIndex)
      }
    },
    moveTask (event, toTasks, toTaskIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = event.dataTransfer.getData('from-task-index')

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex
      })
    },
    moveColumn (event, toColumnIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex
      })
    }
  }

}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
