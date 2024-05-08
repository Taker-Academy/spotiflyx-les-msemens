<template>
    <div class="welcome">
        <h1>Bienvenue sur Spotiflix</h1>
        <h2>Le site numero 1 de divertissement</h2>
    </div>
</template>

<script>

export default {
  name: 'Home',
  component: {
  }
}
</script>

<style>
    @font-face {
        font-family: 'Jersey15';
        src: url('@/assets/Jersey15-Regular.ttf') format('truetype'),
    }
    @font-face {
        font-family: 'iconso';
        src: url('@/assets/Inconsolata.ttf') format('truetype'),
    }
    .welcome {
        padding: 10rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
    }
    .welcome h1 {
        font-size: 70px;
        margin-bottom: 10px;
        font-family: Jersey15, Helvetica, Arial, sans-serif;
    }
    .welcome h2 {
        margin: 0;
        text-align: center;
        font-size: 38px;
        line-height: 3rem;
        font-weight: 800;
        max-width: 20vw;
        font-family: iconso, Arial, Helvetica, sans-serif;
    }
</style>