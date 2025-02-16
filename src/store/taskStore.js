import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore(
  'task',
  () => {
    const tasks = ref([])

    tasks.value = [
      {
        id: 1,
        name: 'Test Task',
        dueDate: '2025-02-20',
        priority: 'high',
        category: 'work',
        notes: 'This is a test task',
        status: 'pending',
      },
    ]

    const addTask = (task) => {
      tasks.value.push(task)
    }

    const deleteTask = (taskId) => {
      tasks.value = tasks.value.filter((task) => task.id !== taskId)
    }

    const updateTaskStatus = (taskId, status) => {
      const taskIndex = tasks.value.findIndex((task) => task.id === taskId)
      if (taskIndex != -1) {
        tasks.value[taskIndex].status = status
      }
    }

    const updateTask = (taskId, updatedTask) => {
      const taskIndex = tasks.value.findIndex((task) => task.id === taskId)
      if (taskIndex != -1) {
        tasks.value[taskIndex] = { ...tasks.value[taskIndex], ...updatedTask }
      }
    }

    return { tasks, addTask , deleteTask, updateTaskStatus, updateTask }
  },
  { persist: true },
)
