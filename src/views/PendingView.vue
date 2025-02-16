<script setup>
import TaskList from '@/components/TaskList.vue'
</script>
<template>
  <div class="w-full">
    <TaskList :status="'pending'" />
  </div>
</template>
