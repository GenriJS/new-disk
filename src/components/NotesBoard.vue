<template>
  <div class="container">
    <div class="notes-board">
      <Note v-for="note in notes" :key="note.id" :note="note" :onDelete="deleteNote" />
    </div>
  </div>
  <div class="add-note-btn" @click="showNoteAdd = true">
      <img class="add-note-btn-img" src="/src/assets/img/icons/cross.svg" alt="cross">
  </div>
  <NoteAdd v-if="showNoteAdd" :isVisible="showNoteAdd" @close="closeModal" @note-added="addNoteToBoard" />
</template>

<script>
import Note from './Note.vue';
import NoteAdd from './NoteAdd.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    Note,
    NoteAdd
  },
  setup() {
    const route = useRoute();
    const showNoteAdd = ref(false);
    const notes = ref([]);

    const closeModal = () => {
      showNoteAdd.value = false;
    };

    const addNoteToBoard = (newNote) => {
      notes.value.push(newNote);
    };

    const fetchNotes = async () => {
      const token = localStorage.getItem("accessToken");

      try {
        const response = await fetch('https://dist.nd.ru/api/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          notes.value = data;
        } else {
          console.error("Ошибка загрузки заметок:", response.status);
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    const deleteNote = async (id) => {
      const token = localStorage.getItem("accessToken");

      try {
        const response = await fetch(`https://dist.nd.ru/api/notes/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          notes.value = notes.value.filter(note => note.id !== id);
        } else {
          console.error("Ошибка удаления заметки:", response.status);
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    onMounted(() => {
      fetchNotes();
    });

    return { route, showNoteAdd, closeModal, notes, deleteNote, addNoteToBoard };
  }
};
</script>

<style scoped>

  .notes-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }

  @media (max-width: 1120px) {
    .notes-board {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 720px) {
    .notes-board {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .add-note-btn {
    position: fixed;
    right: 40px;
    bottom: 40px;
    background-color: #B1C909;
    border-radius: 32px;
    width: 56px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .add-note-btn:hover {
    background-color: #97AB0D;
  }

  .add-note-btn:active {
    background-color: #819400;
  }

  .add-note-btn-img {
    rotate: 45deg;
  }

</style>