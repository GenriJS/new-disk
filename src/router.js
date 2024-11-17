import { createRouter, createWebHistory } from 'vue-router';
import Main from './components/Main.vue';
import NotesBoard from './components/NotesBoard.vue';

const routes = [
  {
    name: 'main',
    path: '/',
    component: Main,
  },
  {
    name: 'notes',
    path: '/notes',
    component: NotesBoard,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;