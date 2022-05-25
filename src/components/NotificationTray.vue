<template>
  <div class="container">
    <TransitionGroup>
      <div class="notification" v-for="notification in notifications?.get()" :key="notification.key">
        <div class="progress"></div>
        {{ notification.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { notificationKey } from "@/notifications";
import { inject } from "vue";

const notifications = inject(notificationKey);
</script>

<style scoped>
.container {
  z-index: 9999;
  position: fixed;
  right: 15px;
  top: 20px;
}

.notification {
  background: rgb(249, 163, 163);
  position: relative;
  user-select: none;
  border-radius: 5px;
  padding: 12px;
  margin: 8px;
}

.v-enter-active,
.v-leave-active {
  transition: all 250ms;
}

.v-enter-from {
  opacity: 0;
  transform: translateX(calc(100% + 15px));
}

.v-leave-to {
  opacity: 0;
}

.progress {
  background: rgb(135, 0, 0);
  position: absolute;
  width: 100%;
  height: 2px;
  left: 0;
  top: 0;
  animation: 5s progress linear forwards;
}

@keyframes progress {
  to {
    width: 0%;
  }
}
</style>