<template>
    <div
        @dragstart.self="onDrag"
        draggable
        @dragover.prevent
        @dragenter.prevent
    >
        <slot/>
    </div>
</template>

<script>
export default {
  props: {
    transferData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onDrag (event) {
      event.dataTransfer.setData('payload', JSON.stringify(this.transferData))
    }
  }
}
</script>

<style scoped>

</style>
