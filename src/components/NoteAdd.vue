<template>
  <div v-if="isVisible" class="modal-overlay">
   <div class="modal">
     <button @click="$emit('close')" class="close-modal-btn">
       <img src="/src/assets/img/icons/cross.svg" alt="close modal">
     </button>

     <h2 class="form-header">Добавление заметки</h2>

     <form class="form" id="noteForm" @submit.prevent="addNote">
       <div class="input-container">
         <label for="title">Название заметки</label>
         <input v-model="title" type="text" id="title" placeholder="Введите название" required @input="updateTitleCounter" :maxlength="64" />
         <div class="counter"><span>{{ charTitleCount }}</span>/64</div>
       </div>

       <div class="input-container">
         <label for="content">Текст заметки</label>
         <textarea v-model="content" id="content" placeholder="Введите текст" required @input="updateContentCounter" :maxlength="255"></textarea>
         <div class="counter"><span>{{ charContentCount }}</span>/255</div>
       </div>

     </form>

     <button class="auth-send-btn" form="noteForm" type="submit">Добавить</button>
   </div>
  </div>
</template>

<script>
export default {
 props: {
   isVisible: Boolean,
 },
 data() {
   return {
     title: "",
     content: "",
     charTitleCount: 0,
     charContentCount: 0,
   };
 },
 methods: {
    async addNote() {
     const token = localStorage.getItem("accessToken");
     const noteData = {
       title: this.title,
       content: this.content,
     };

     try {
       const response = await fetch('https://dist.nd.ru/api/notes', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify(noteData)
       });

       if (response.ok) {
         const newNote = await response.json();
         // Оповещаем родительский компонент о добавлении новой заметки
         this.$emit('note-added', newNote);
         this.title = "";
         this.content = "";
         this.$emit('close');
       } else {
         console.error("Ошибка добавления заметки:", response.status);
       }
     } catch (error) {
       console.error("Ошибка:", error);
     }
    },
    updateTitleCounter() {
      this.charTitleCount = this.title.length;
    },
    updateContentCounter() {
      this.charContentCount = this.content.length;
    },
 }
};
</script>

<style scoped>

  .auth-send-btn {
    align-self: end;
  }

  #content {
    width: calc(100% - 56px);
    height: 192px;
    padding: 16px 28px;
    border-radius: 36px;
    background: #FFF;
    border: none;
    resize: none;
  }

  .input-container {
    position: relative;
  }

  .counter {
    align-self: end;
    margin-right: 24px;
    color: #9DA5AF;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
  }

  @media (max-width: 1920px) { 
    #content {
      height: 148px;
    }
  }

  @media (max-width: 768px) { 
    #content {
      height: 136px;
    }
  }
  
</style>