<template>
    <div class="footer">
        <div class="row">
            <h2>A propos</h2>
            <h4 href="#">Fonctionnement du site</h4>
            <h4 href="#">Conditions générales de vente</h4>
            <h4 href="#">Données et confidentialité</h4>
        </div>
        <div class="row">
            <h2>Assistance</h2>
            <h4>Centre d'aide</h4>
            <h4 href="#">Nous contacter</h4>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .footer {
        display: flex;
        justify-content: space-around;
        padding: 4rem;
        color: black;
    }
    .row {
        display: flex;
        flex-direction: column;
    }
    .row h4 {
        text-decoration: none;
        padding: 0.5rem 0;
        font-weight: 400;
        margin: 0;
        font-size: 19px;
    }
</style>
