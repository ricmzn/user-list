<template>
  <header class="flex row space-between align-center">
    <h1>Usuários</h1>
    <button v-if="editTarget == null" class="action" :disabled="busy" @click="editUser()">Novo usuário</button>
    <button v-else class="action secondary" @click="editTarget = undefined">Cancelar</button>
  </header>
  <UserEdit v-if="editTarget != null" :user="editTarget" :key="editTarget.id" @confirm="(name, job) => handleUserChange(editTarget?.id ?? null, name, job)" />
  <main>
    <UserCard v-for="user in users" :user="user" :key="user?.id" :busy="busy" @request-edit="(user) => editUser(user ?? undefined)" @request-delete="(id) => deleteUser(id)" />
  </main>
</template>

<script setup lang="ts">
import { notificationKey } from "@/notifications";
import md5 from "md5";
import { computed, inject, onBeforeMount, ref } from "vue";
import UserCard from "../components/UserCard.vue";
import UserEdit from "../components/UserEdit.vue";
import Reqres, { type ReqresUser } from "../reqres";

const notifications = inject(notificationKey);

const users = ref<Array<ReqresUser | null>>([
  // Inicializa o componente com wireframes dos usuários
  null, null, null, null, null
]);

const editTarget = ref<Partial<ReqresUser>>();

// Carrega os usuários logo após a criação do componente
onBeforeMount(async () => {
  users.value = await Reqres.listUsers()
    .then((response) => response.data)
    .catch((err) => {
      notifications?.push("error", `Erro ao buscar usuários: ${err.message}`);
      throw err;
    });
});

// A aplicação está aguardando algum procedimento?
const busy = computed(() => {
  return users.value.findIndex((user) => user == null) >= 0;
});

// Remove todos os wireframes (usuários nulos) temporários
function clearWireframes() {
  users.value = users.value.filter((user) => user != null);
}

// Abre o menu de edição para um usuário (ou novo caso não fornecido)
async function editUser(user?: ReqresUser) {
  if (user) {
    editTarget.value = user;
  } else {
    editTarget.value = {};
  }
}

// Verifica se o usuário deve ser editado ou criado
async function handleUserChange(id: number | null, name: string, job: string) {
  editTarget.value = undefined;
  if (id != null) {
    updateUser(id, name, job);
  } else {
    createUser(name, job);
  }
}

// Envia um usuário para a API e depois insere na tela
async function createUser(name: string, job: string) {
  const random = md5(Math.random().toString());
  users.value.push(null);
  // Move a tela para o final da lista (após rodar event loop até o fim)
  setTimeout(() => window.scrollTo(window.scrollX, document.body.scrollHeight));
  try {
    const newUser = await Reqres.addUser({ name, job });
    users.value.push({
      id: newUser.id,
      job: newUser.job,
      email: newUser.job,
      first_name: newUser.name,
      last_name: "",
      avatar: `https://www.gravatar.com/avatar/${random}?d=identicon`,
    });
  } finally {
    clearWireframes();
  }
}

// Edita o usuário na API e na tela
async function updateUser(id: number, name: string, job: string) {
  const index = users.value.findIndex((user) => user?.id === id);
  if (index < 0) {
    return;
  }
  const oldUser = users.value[index]!;
  users.value.splice(index, 1, null);
  try {
    const newUser = await Reqres.updateUser(id, { name, job });
    users.value.splice(index, 0, {
      id: oldUser.id,
      job: newUser.job,
      email: newUser.job,
      first_name: newUser.name,
      last_name: "",
      avatar: oldUser.avatar,
    });
  } catch (err) {
    // Restaura o usuário anterior
    users.value.splice(index, 0, oldUser);
    throw err;
  } finally {
    clearWireframes();
  }
}

// Exclui o usuário
async function deleteUser(id: number) {
  const index = users.value.findIndex((user) => user?.id === id);
  if (index < 0) {
    return;
  }
  const oldUser = users.value[index]!;
  users.value.splice(index, 1, null);
  try {
    await Reqres.deleteUser(id);
  } catch (err) {
    // Restaura o usuário anterior
    users.value.splice(index, 0, oldUser);
    throw err;
  } finally {
    clearWireframes();
  }
}
</script>
