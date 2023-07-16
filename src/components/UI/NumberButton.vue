<template>
  <div class="button" @click="calculate" :class="{
    'button--small': props.size === 'small',
    'button--normal': props.size === 'normal',
    'button--vertical': props.size === 'vertical',
    'button--horizontal': props.size === 'horizontal',

    'button--standard': props.color === 'standard',
    'button--lightGray': props.color === 'lightGray',
    'button--blue': props.color === 'blue',
    'button--lightBlue': props.color === 'lightBlue',
  }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

type ButtonSizeType = "small" | "normal" | "vertical" | "horizontal";

type ButtonColorType = "standard" | "lightGray" | "blue" | "lightBlue";

type ButtonActionType = "action" | "number" | "operator";

interface ButtonProps {
  size?: ButtonSizeType;
  color?: ButtonColorType;
  type?: ButtonActionType;
}

interface ButtonEmits {
  (event: "click", value: string | Number): void
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: "normal",
  color: "standard",
  type: "action",
})

const emits = defineEmits<ButtonEmits>();

function calculate() {
  emits("click", props.type)
}
</script>

<style scoped lang="scss">
  .button {
    cursor: pointer;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    &:hover {
      color: #ffffff !important;
      transition: color 0.5s;
    }

    &--small {
      height: 40px;
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #29A8FF;
      background-color: #303136;
      border-radius: 24px;
      font-size: 18px;
    }
    &--normal {
      height: 62px;
      width: 62px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #29A8FF;
      background-color: #303136;
      border-radius: 24px;
      font-size: 24px;
    }
    &--vertical {
      height: 62px;
      width: 140px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #29A8FF;
      background-color: #303136;
      border-radius: 24px;
      font-size: 22px;
    }
    &--horizontal {
      height: 104px;
      width: 62px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 24px;
      background-color: #1991FF;
      color: #29A8FF;
      font-size: 42px;
    }

    &--standard {
      background-color: #303136;
    }
    &--lightGray {
      background-color: #616161;
    }
    &--blue {
      background-color: #005DB2;
    }
    &--lightBlue {
      background-color: #1991FF;
    }
  }
</style>
