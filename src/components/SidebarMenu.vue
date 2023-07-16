<template>
  <div class="wrapper">
    <aside :vue:is-open="isSidebarOpen">
      <ul>
        <li>
          <router-link to="/">
            <font-awesome-icon :icon="['fas', 'calculator']" />
            <Transition name="fade">
              <span v-show="isSidebarOpen">Calculator</span>
            </Transition>
          </router-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { RouterLink } from 'vue-router';

const isSidebarOpen = shallowRef<Boolean>(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

</script>

<style scoped lang="scss">

</style>
