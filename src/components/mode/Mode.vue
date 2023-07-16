<template>
  <div class="mode-toggle" @click="modeToggle" :class="isDark">
    <div class="toggle">
      <div id="dark-mode" type="checkbox"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {computed} from "vue";
  import {useThemeModeStore} from "@/store/ThemeMode";

  const themeStore = useThemeModeStore()

  function dark(): void {
    themeStore.updateThemeType("dark")
  }

  function light():void {
    return themeStore.updateThemeType("light")
  }

  function modeToggle():void {
    if(themeStore.theme_type === "dark") {
      light()
    } else {
      dark()
    }
  }

  const isDark = computed(() => {
    return themeStore.theme_type === "dark" ? 'darkmode-toggled' : "light"
  })
</script>
