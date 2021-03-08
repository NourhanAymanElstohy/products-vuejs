<template>
    <div class="container">
        <div class="row justify-content-center">
            <b-card
            :title="'Title: '+product.title"
            :img-src="'http://127.0.0.1:8000'+product.image"
            img-alt="Product Image"
            img-top
            tag="article"
            style="max-width: 30rem;"
            class="mb-2"
        >
            <h5>Price: <b>{{ product.price }}</b>$</h5>
            <b-card-text>
                <h5>Description:</h5>
                {{ product.description }}
            </b-card-text>
        </b-card>
        </div>
    </div>
</template>

<script>
export default {
    props: ['product']
}
</script>