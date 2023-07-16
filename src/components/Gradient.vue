<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="259" height="139" viewBox="0 0 259 139" fill="none">
    <g filter="url(#filter0_f_1_3)">
      <circle cx="210" cy="-71" r="109" fill="#24A5FF"/>
    </g>
    <defs>
      <filter id="filter0_f_1_3" x="0" y="-281" width="420" height="420" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="50.5" result="effect1_foregroundBlur_1_3"/>
      </filter>
    </defs>
  </svg>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
svg{
  position: absolute;
  right: 0;
  top: 0;
  &.bottom{
    position: absolute;
    top: unset;
    bottom: -50px!important;
    left: 0!important;
    right: 0!important;
    transform: rotate(157deg);
    margin: auto;
  }
}

</style>