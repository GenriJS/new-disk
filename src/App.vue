<template>
  <div id="app">
    <Header @open-modal="showModal = true" />
    <RouterView />
    <Modal v-if="showModal" :isVisible="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Modal from './components/Modal.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

export default {
  components: {
    Header,
    Modal
  },
  setup() {
    const route = useRoute();
    const showModal = ref(false);
    return { route, showModal };
  }
};
</script>