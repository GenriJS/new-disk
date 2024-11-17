<template>
  <div class="note">
    <img class="note-corner" src="/src/assets/img/icons/corner.svg" alt="note-corner">
    <h3 class="note-header">{{ note.title }}</h3>
    <p class="note-content">{{ note.content }}</p>
    <button class="note-btn" @click="handleDelete">
      <img src="/src/assets/img/icons/cross.svg" alt="cross">
      Удалить
    </button>
  </div>
</template>

<script>
export default {
  name: "Note",
  props: {
    note: {
      type: Object,
      required: true,
    },
    onDelete: {
      type: Function,
      required: true,
    }
  },
  methods: {
    handleDelete() {
      this.onDelete(this.note.id);
    }
  }
};
</script>

<style scoped>

  .note {
    position: relative;
    color: #FFF;
    background-color: #B1C909;
    max-width: 507px;
    min-width: 320px;
    flex: 1;
    height: fit-content;
  }

  @media (max-width: 720px) {
    .note {
      max-width: none;
    }
  }

  .note-corner {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #0A1F38;
  }

  .note-header {
    padding: 20px 56px 20px 28px;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    border-bottom: 1px solid #A5BB0C;
    text-overflow: ellipsis;
  }

  .note-content {
    padding: 20px 28px 28px;
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    text-overflow: ellipsis;
  }

  .note-btn {
    margin: 8px 8px 8px auto;
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    border-radius: 32px;
    background-color: #B1C909;
    color: #FFF;
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    cursor: pointer;
  }

  .note-btn:hover {
    background-color: #97AB0D;
  }

  .note-btn:active {
    background-color: #819400;
  }

</style>