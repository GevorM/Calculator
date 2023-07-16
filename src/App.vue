<template>
  <div id="root" :class="themeStore.theme_type">
    <Mode/>
    <SidebarMenu class="sidebar" />
    <RouterView class="router-view" />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import SidebarMenu from './components/SidebarMenu.vue';
import Mode from './components/mode/Mode.vue';
import {useThemeModeStore} from "@/store/ThemeMode";

const themeStore = useThemeModeStore()

</script>
