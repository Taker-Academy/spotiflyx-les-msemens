<template>
    <NavBarMenu></NavBarMenu>
    <div class="content"></div>
</template>

<script>
import NavBarMenu from '../../components/NavBarMenu.vue'

export default {
    name: 'LoggedLayout',
    components: {
        NavBarMenu
    }
}
</script>

<style scoped>
    .content{
        height: 100vh;
    }
</style>