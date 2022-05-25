<template>
  <form>
    <h3 v-if="user && user.id">Editando {{ user.first_name }} {{ user.last_name }} (#{{ user.id }})</h3>
    <label>
      Nome do usuário
      <input type="text" placeholder="Digite o nome" v-model="name" ref="nameInput">
    </label>
    <label>
      Função do usuário
      <select :class="{ unselected: job == '' }" v-model="job">
        <option selected value="">Selecione a função</option>
        <option>Desenvolvedor</option>
        <option>Gerente de Projetos</option>
        <option>Tech Lead</option>
        <option>UI/UX Designer</option>
      </select>
    </label>
    <button class="action" type="button" :disabled="!inputValid" @click="() => emit('confirm', name, job)">
      Salvar dados do usuário
    </button>
  </form>
</template>

<script setup lang="ts">
import type { ReqresUser } from '@/reqres';
import { computed, onMounted, ref, watch } from 'vue';

const { user } = defineProps<{
  user?: Partial<ReqresUser>,
}>();

const fullName = user ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() : "";

const name = ref(fullName);
const job = ref(user?.job ?? "");

const inputValid = computed(() => name.value != "" && job.value != "");
const nameInput = ref<HTMLInputElement>();

const emit = defineEmits<{
  (e: "confirm", name: string, job: string): void
}>();

// Foca o primeiro input assim que entrar no DOM
onMounted(() => {
  nameInput.value?.focus();
  nameInput.value?.scrollIntoView(false);
});
</script>

<style scoped>
input,
select {
  appearance: none;
  display: block;
  width: 100%;
  margin: 12px 0;
  padding: 18px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
}

input::placeholder,
select.unselected {
  color: #797979;
  opacity: 1;
}

option {
  background: white;
  color: black;
}

select {
  background: url("../assets/icon-caret.svg") no-repeat calc(100% - 24px) 50%;
}

form {
  margin-bottom: 40px;
}

form button {
  width: 100%;
  margin-top: 24px;
}
</style>
