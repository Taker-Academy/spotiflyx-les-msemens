<template>
    <div class="register">
        <div class="box">
            <div class="input">
                <h3>Username</h3>
                <input type="text">
            </div>
            <div class="input">
                <h3>Password</h3>
                <input type="text">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'UserRegister'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @font-face {
        font-family: 'moderne';
        src: url('../assets/ModernAesthetic-DemoVersion-Regular.otf') format('truetype'),
    }

    .input {
        margin: 2rem;
        color: black;
    }
    .input h3 {
        font-family: moderne, sans-serif;
        margin: 10px 20px;
        color: #fff;
    }
    .input input {
        width: 19rem;
        border-radius: 50px;
    }
    input[type="text"]{
        display: flex;
        padding: 0.2rem 1rem;
        font-size: 16px;
        font-weight: 600;
        justify-content: center;
    }
    .register {
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 65vh;
    }
</style>
