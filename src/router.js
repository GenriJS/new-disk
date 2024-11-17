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
  history: createWebHistory('/new-disk/'),
  routes,
});

export default router;