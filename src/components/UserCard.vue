<template>
  <!-- Componente -->
  <article v-if="user != null" class="card flex row space-between align-center">
    <div class="bookmark"></div>
    <img class="avatar" :src="user.avatar">
    <div class="flex col expand">
      <header>#{{ user.id }}</header>
      <h2>{{ user.first_name }} {{ user.last_name }}</h2>
      <footer>{{ user.email }}</footer>
    </div>
    <div v-if="!confirmDelete">
      <button type="button" :disabled="busy" title="Editar" @click="() => emit('requestEdit', user!)">
        <img src="../assets/icon-edit.svg">
      </button>
      <button type="button" :disabled="busy" title="Remover" @click="confirmDelete = true">
        <img src="../assets/icon-delete.svg">
      </button>
      <router-link :disabled="busy" title="Detalhes" :to="`/user/${user.id}`">
        <img src="../assets/icon-view.svg">
      </router-link>
    </div>
    <div class="flex col space-between align-center" v-else>
      <p>Remover?</p>
      <div>
        <button type="button" class="delete" :disabled="busy" @click="() => emit('requestDelete', user?.id!)">
          Sim
        </button>
        <button type="button" class="cancel" :disabled="busy" @click="confirmDelete = false">
          Não
        </button>
      </div>
    </div>
  </article>
  <!-- Wireframe -->
  <article v-else class="wireframe card flex row space-between align-center">
    <div class="bookmark"></div>
    <div class="avatar"></div>
    <div class="flex col expand">
      <header>&nbsp;</header>
      <h2>&nbsp;</h2>
      <footer>&nbsp;</footer>
    </div>
    <div>
      <button type="button">
        <img src="../assets/icon-edit.svg">
      </button>
      <button type="button">
        <img src="../assets/icon-delete.svg">
      </button>
      <button type="button">
        <img src="../assets/icon-view.svg">
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ReqresUser } from "@/reqres";
import { ref } from "vue";

const { user, busy } = defineProps<{
  user: ReqresUser | null,
  busy?: boolean,
}>();

const confirmDelete = ref(false);

const emit = defineEmits<{
  (e: "requestEdit", user: ReqresUser): void,
  (e: "requestDelete", id: number): void,
}>();
</script>

<style scoped>
/* Estilos do componente */
.card {
  position: relative;
  background: #f7f7f7;
  color: #797979;
  border-radius: 5px;
  font-weight: 400;
  margin: 15px 0;
  padding: 20px 30px;
  max-width: 580px;
}

.bookmark {
  background: black;
  position: absolute;
  top: 20px;
  left: -4px;
  width: 4px;
  height: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  border-radius: 5px;
  margin-right: 25px;
}

h2 {
  font-weight: 600;
  font-size: 18px;
  color: black;
  margin: 10px 0 3px 0;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: filter 100ms ease-in;
}

button+button, button+a {
  margin-left: 12px;
}

button:hover {
  filter: brightness(125%);
}

button:active {
  filter: brightness(150%);
}

button.delete,
button.cancel {
  color: white;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 5px;
}

button.delete {
  background: rgb(210, 4, 4);
}

button.cancel {
  background: rgb(85, 85, 85);
  margin-left: 8px;
}

button.delete:disabled,
button.cancel:disabled {
  filter: grayscale(50%) brightness(175%) contrast(50%);
}

/* Estilos do wireframe */
.wireframe button,
button:disabled {
  filter: brightness(175%);
  cursor: default;
}

.wireframe .avatar {
  background: #0001;
  animation: 2s wireframe-ghost ease-in infinite;
}

.wireframe header,
.wireframe h2,
.wireframe footer {
  background: #0001;
  transform: scaleY(0.875);
  user-select: none;
  animation: 2s wireframe-ghost ease-in infinite;
}

.wireframe header {
  width: 20px;
}

.wireframe h2 {
  width: 120px;
}

.wireframe footer {
  width: 200px;
}

@keyframes wireframe-ghost {

  from,
  to {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }
}
</style>
