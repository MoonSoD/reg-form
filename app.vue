<template>
  <NuxtPage/>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.25s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.page-enter-from {
  transform: translateY(-100dvh);
}

.page-leave-to {
  transform: translateY(100dvh);
}
</style>