<template>
    <NavBarMenu></NavBarMenu>
    <router-view/>
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