<template>
  <div class="container">
    <div class="title">
      <h1 class="title__header">Мои<br>заметки</h1>
      <p class="title__text">Не забывай о важном,<br>храни его в облаке.</p>
    </div>
    <img class="main-img" src="/src/assets/img/main.png" alt="main image">
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: fit-content;
  }

  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 40px;
  }

  .title__header {
    font-size: 104px;
    font-style: normal;
    font-weight: 900;
    line-height: 104px;
    color: #FFF;
  }

  .title__text {
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px;
    color: #9DA5AF;
  }

  .main-img {
    max-width: 897px;
  }

  @media (max-width: 1920px) { 
    .main-img {
      max-width: 627px;
    }
  }

  @media (max-width: 1366px) { 
    .title {
      gap: 20px;
    }

    .main-img {
      max-width: 560px;
    }
  }

  @media (max-width: 1160px) { 
    .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    }
    
    .title {
    align-items: center;
  }
    .title__header {
      text-align: center;
    }

    .title__text {
      text-align: center;
    }
  }

  @media (max-width: 768px) { 

    .container {
      max-height: 100%;
    }

    .title__header {
    font-size: 60px;
    line-height: 64px;
    }

    .title__text {
      font-size: 24px;
      line-height: 36px;
    }

    .main-img {
      max-width: 298px;
    }
  }

</style>