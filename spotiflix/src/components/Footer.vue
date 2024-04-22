<template>
    <div class="footer">
        <div class="row">
            <h2>A propos</h2>
            <a href="#">Fonctionnement du site</a>
            <a href="#">Conditions générales de vente</a>
            <a href="#">Données et confidentialité</a>
        </div>
        <div class="row">
            <h2>Assistance</h2>
            <a href="#">Centre d'aide</a>
            <a href="#">Nous contacter</a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PageFooter'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .footer {
        display: flex;
        justify-content: space-around;
        padding: 4rem;
        color: #fff;
    }
    .row {
        display: flex;
        flex-direction: column;
    }
    .row a {
        text-decoration: none;
        color: #fff;
        padding: 0.5rem 0;
        font-size: 19px;
    }
</style>
