import { ref, type InjectionKey } from "vue";

export interface Notification {
  key: symbol;
  type: "error";
  message: string;
}

const notifications = ref<Notification[]>([]);

export const notificationProvider = {
  push(type: "error", message: string) {
    const key = Symbol();
    // Insere a mensagem no topo
    notifications.value.unshift({ key, type, message });
    // Deleta a mensagem após 5 segundos
    setTimeout(() => {
      notifications.value = notifications.value
        .filter((notification) => notification.key !== key);
    }, 5000);
  },
  get() {
    return notifications.value;
  }
};

export const notificationKey = Symbol() as
  InjectionKey<typeof notificationProvider>;
