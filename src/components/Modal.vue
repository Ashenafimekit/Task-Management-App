<script setup>
import { X } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'
import { useTaskStore } from '@/store/taskStore'
import { useToast } from 'vue-toastification'

const toast = useToast()
const taskStore = useTaskStore()

// Form data
const taskName = ref('')
const taskDueDate = ref('')
const taskPriority = ref('low')
const taskCategory = ref('work')
const taskNotes = ref('')

const isOpen = ref(false)

// Open modal
const openModal = () => {
  isOpen.value = true
}

// Close modal
const closeModal = () => {
  isOpen.value = false
}

// Close on Escape key
const handleKeydown = (event) => {
  if (event.key === 'Escape') closeModal()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

const createTask = () => {
  if (!taskName.value || !taskDueDate.value) {
    toast.warning('Please fill in the task name and due date!')
    return
  }

  const newTask = {
    id: Date.now(), // Unique ID
    name: taskName.value,
    dueDate: taskDueDate.value,
    priority: taskPriority.value,
    category: taskCategory.value,
    notes: taskNotes.value,
    status: 'pending', // Default status
  }

  taskStore.addTask(newTask)
  toast.success('Task Added Successfully', { timeout: 2000 })

  // Reset form
  taskName.value = ''
  taskDueDate.value = ''
  taskPriority.value = 'low'
  taskCategory.value = 'work'
  taskNotes.value = ''
}
</script>

<template>
  <div>
    <!-- Open Modal Button -->
    <button @click="openModal" class="px-4 py-2 bg-blue-600 text-white rounded-md">Add Task</button>

    <!-- Modal Overlay -->
    <div v-if="isOpen" class="fixed inset-0 flex justify-center items-center z-50">
      <!-- Modal Content -->
      <div class="bg-white rounded-lg shadow-2xl w-1/3 p-6 relative animate-fade-in">
        <button @click="closeModal" class="absolute top-2 right-2">
          <X class="w-6 h-6 text-red-500 font-bold hover:text-red-400" />
        </button>
        <form @submit.prevent="createTask" class="flex flex-col gap-2">
          <div class="flex flex-col gap-1">
            <label>Task Name</label>
            <input
              type="text"
              v-model="taskName"
              class="outline-none border rounded-lg w-full text-center bg-gray-100 hover:border-blue-500"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label>Due Date</label>
            <input
              type="date"
              v-model="taskDueDate"
              class="outline-none border rounded-lg w-full text-center bg-gray-100 hover:border-blue-500"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label>Priority</label>
            <select
              v-model="taskPriority"
              class="outline-none border rounded-lg w-full text-center bg-gray-100 hover:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label>Category</label>
            <select
              v-model="taskCategory"
              class="outline-none border rounded-lg w-full text-center bg-gray-100 hover:border-blue-500"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="study">Study</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label>Note</label>
            <textarea
              v-model="taskNotes"
              class="outline-none border rounded-lg w-full text-center bg-gray-100 hover:border-blue-500"
            ></textarea>
          </div>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">
            Add Task
          </button>
        </form>
        <div class="mt-4 flex justify-end">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-200">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
