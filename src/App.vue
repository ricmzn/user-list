<template>
  <NotificationTray />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import NotificationTray from "./components/NotificationTray.vue";
</script>
