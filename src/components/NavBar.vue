<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  HomeIcon,
  SquareCheck,
  CalendarCheck2,
  User,
  BriefcaseBusiness,
  BookOpenText,
  ListTodo,
} from 'lucide-vue-next'

const isOpen = ref(false)
const isCollapsed = ref(false)

// Toggle sidebar for small screens
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

// Toggle collapse for larger screens
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <div>
      <!-- Overlay (visible only on small screens when sidebar is open) -->
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-white bg-opacity-50 z-40 md:hidden"
        @click="toggleSidebar"
      ></div>

      <div
        class="fixed md:relative h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 z-50"
        :class="[
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0',
          isCollapsed ? 'w-16' : 'w-64',
        ]"
      >
        <!-- Toggle Button (for small screens) -->
        <button
          class="p-3 text-white focus:outline-none hover:bg-gray-700 transition md:hidden"
          @click="toggleSidebar"
        >
          ✖
        </button>

        <!-- Toggle Button (for large screens) -->
        <button
          class="hidden md:block p-3 text-white focus:outline-none hover:bg-gray-700 transition cursor-pointer"
          @click="toggleCollapse"
        >
          ☰
        </button>

        <!-- Sidebar Content -->
        <nav class="flex flex-col space-y-2 p-4">
          <router-link to="/" class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700">
            <span><HomeIcon class="w-6 h-6 text-blue-500" /></span>
            <span v-if="!isCollapsed">Home</span>
          </router-link>
          <router-link
            to="/completed"
            class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
          >
            <span><SquareCheck class="w-6 h-6 text-green-500" /></span>
            <span v-if="!isCollapsed">Completed</span>
          </router-link>
          <router-link
            to="/pending"
            class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
          >
            <span><ListTodo  class="w-6 h-6 text-blue-500" /></span>
            <span v-if="!isCollapsed">Pending</span>
          </router-link>
          <router-link to="/today" class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700">
            <span><CalendarCheck2 class="w-6 h-6 text-blue-500" /></span>
            <span v-if="!isCollapsed">Today</span>
          </router-link>
          <router-link
            to="/personal"
            class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
          >
            <span><User class="w-6 h-6 text-blue-500" /></span>
            <span v-if="!isCollapsed">Personal</span>
          </router-link>
          <router-link to="/work" class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700">
            <span><BriefcaseBusiness class="w-6 h-6 text-blue-500" /></span>
            <span v-if="!isCollapsed">Work</span>
          </router-link>
          <router-link to="/study" class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700">
            <span><BookOpenText class="w-6 h-6 text-blue-500" /></span>
            <span v-if="!isCollapsed">Study</span>
          </router-link>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-4 transition-all duration-300">
      <button class="p-2 bg-gray-800 text-white rounded-md md:hidden" @click="toggleSidebar">
        ☰
      </button>
      <slot />
    </div>
  </div>
</template>
