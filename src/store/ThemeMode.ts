import { defineStore } from "pinia";
import {ThemeTypes} from "@/core/types";
export const useThemeModeStore = defineStore({
  id: "themeStore",
  state: () => ({
    theme_type: "light",
  }),

  actions: {
    updateThemeType(type: ThemeTypes): void {
      this.theme_type = type;
    },
  },
});
