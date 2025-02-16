<script setup>
import { computed, defineProps, ref } from 'vue'
import { useTaskStore } from '@/store/taskStore'
import { format, parseISO } from 'date-fns' // Ensure date formatting
import { Frown } from 'lucide-vue-next'

const taskStore = useTaskStore()

const props = defineProps({
  category: { type: String, default: '' },
  status: { type: String, default: '' },
  date: { type: Boolean, default: false }, // true if filtering today’s tasks
})

const searchQuery = ref('') // For search input

const filteredTask = computed(() => {
  const todayDate = format(new Date(), 'yyyy-MM-dd')

  return taskStore.tasks.filter((task) => {
    const taskDate = format(parseISO(task.dueDate), 'yyyy-MM-dd') // Ensure correct format
    const matchesCategory = props.category ? task.category === props.category : true
    const matchesStatus = props.status ? task.status === props.status : true
    const matchesDate = props.date ? taskDate === todayDate : true
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    return matchesCategory && matchesStatus && matchesDate && matchesSearch
  })
})
</script>

<template>
  <div class="flex flex-col gap-8 py-5 pr-4">
    <!-- Search Input -->
    <div class="p-2 w-full flex items-center justify-center">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search Task By Name"
        class="outline-none border rounded-lg w-1/2 text-center p-1 bg-gray-100 hover:border-blue-500"
      />
    </div>

    <!-- Task List -->
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <li v-for="task in filteredTask" :key="task.id" class="border p-2 rounded bg-gray-100">
        <p>
          <strong>{{ task.name }}</strong>
        </p>
        <p>Due Date: {{ task.dueDate }}</p>
        <p>Priority: {{ task.priority }}</p>
        <p>Category: {{ task.category }}</p>
        <p>Notes: {{ task.notes }}</p>
        <p>
          Status:
          <span
            :class="{
              'text-green-500': task.status === 'completed',
              'text-yellow-500': task.status === 'pending',
            }"
          >
            {{ task.status }}
          </span>
        </p>
        <div class="space-x-4">
          <button
            @click="taskStore.updateTaskStatus(task.id, 'completed')"
            class="text-white cursor-pointer bg-green-500 hover:bg-green-400 rounded p-1"
            v-if="task.status === 'pending'"
          >
            Mark as Completed
          </button>
          <button
            @click="taskStore.deleteTask(task.id)"
            class="text-white cursor-pointer bg-red-500 hover:bg-red-400 rounded p-1"
          >
            Delete
          </button>
        </div>
      </li>

      <!-- No Tasks Message -->
      <li v-if="filteredTask.length === 0" class="w-full border p-2 rounded bg-gray-100">
        <div class="flex flex-col items-center justify-center w-full ">
          <Frown class="text-6xl text-yellow-500 mb-4" />
          <p class="text-xl text-gray-600">No tasks found matching your search.</p>
          <p class="text-lg text-gray-500 mt-2">Try adjusting your search or adding new tasks.</p>
        </div>
      </li>
    </ul>
  </div>
</template>
