<template>
    <div class="container">
        <b-form 
            @submit="onSubmit">
            <b-form-group
                label="Title:"
                label-size="lg"
                label-cols-lg="2"
                label-class="font-weight-bold"
                label-for="input-2"
            >
                <b-form-input
                    ref="title"
                    :value="product.title"
                    required
                    placeholder="Title"
                ></b-form-input>
                <p
                    v-show="getValidationMessages.title"
                    v-for="msg in getValidationMessages.title"
                    :key="msg"
                    class="text-danger"
                    style="list-style-type: none"
                >
                    {{ msg }}
                </p>
            </b-form-group>
            <b-form-group
                label="Price:"
                label-size="lg"
                label-cols-lg="2"
                label-class="font-weight-bold"
                label-for="input-2"
            >
                <b-form-input
                    ref="price"
                    :value="product.price"
                    required
                    type="number"
                    placeholder="Price"
                ></b-form-input>
                <p
                    v-show="getValidationMessages.price"
                    v-for="msg in getValidationMessages.price"
                    :key="msg"
                    class="text-danger"
                    style="list-style-type: none"
                >
                    {{ msg }}
                </p>
            </b-form-group>
            <b-form-group
                id="input-group-1"
                label="Description:"
                label-for="input-1"
                label-size="lg"
                label-cols-lg="2"
                label-class="font-weight-bold"
            >
                <b-form-textarea
                    ref="description"
                    :value="product.description"
                    required
                    placeholder="Description"
                ></b-form-textarea>
                <p
                    v-show="getValidationMessages.description"
                    v-for="msg in getValidationMessages.description"
                    :key="msg"
                    class="text-danger"
                    style="list-style-type: none"
                >
                    {{ msg }}
                </p>
            </b-form-group>
            <b-form-group 
                id="input-group-image"
                label="Image:"
                label-for="input-1"
                label-size="lg"
                label-cols-lg="2"
                label-class="font-weight-bold text-dark"
            >
                <div class="row">
                    <img :src="'http://127.0.0.1:8000'+product.image" alt="" srcset="" width="30" height="30">
                    <b-form-file
                        v-model="image"
                        :rules="rules"
                        accept="image/png, image/jpeg, image/bmp"
                        :loading="true"
                    ></b-form-file>
                    <p
                        v-show="getValidationMessages.image"
                        v-for="msg in getValidationMessages.image"
                        :key="msg"
                        class="text-danger"
                        style="list-style-type: none"
                    >
                        {{ msg }}
                    </p>
                </div>
            </b-form-group>
            <div class="form-row">
                <div class="col-lg-2 col-form-label"></div>
                <div class="col">
                    <b-button type="submit"  variant="success"
                    >Save Changes</b-button>
                    <b-button type="reset" @click="onReset" class="ml-2" variant="primary" 
                    >Clear</b-button>
                    <b-button type="button" class="ml-2" variant="light" 
                    >Cancel</b-button>
                </div>
            </div>
        </b-form>
    </div>
</template>
<style scoped>
/deep/ .col-form-label {
  font-size: 16px;
}
</style>
<script>
import {  mapGetters, } from "vuex";
import Swal from 'sweetalert2';
export default {
    props: ['product'],
    data() {
        return {
            title: this.product.title,
            description: this.product.description,
            price: this.product.price,
            image: null,
            rules: [
            value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
            ],
        };
    },

    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            var title = this.$refs.title.$el.value;
            var description = this.$refs.description.$el.value;
            var price = this.$refs.price.$el.value;

            var formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);

            if(this.image == null ) this.image = this.product.image; 
            formData.append("image", this.image);
            formData.append("product_id", this.product.id);
            console.log(title, price, description, this.image);
            this.$store.dispatch("updateProduct", formData)
            .then(() => {
                this.$emit("hideModal")
                 Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Product has been updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
        },
        onReset(evt){
        evt.preventDefault();
        
        this.$store.dispatch('clearValidationMessages')
        
        // Reset our form values
        this.$refs.title.$el.value = "";
        this.$refs.description.$el.value = "";
        this.$refs.price.$el.value = "";
        this.$refs['image'].reset();

        // Trick to reset/clear native browser form validation state
        this.show = false;
        this.$nextTick(() => {
            this.show = true;
        });
        },
    },
    computed: {
        ...mapGetters(["getValidationMessages", "postCategories", "postQoutes", "postTags"]),
        validationErrors() {
        let errors = Object.values(this.getValidationMessages);
        errors = errors.flat();
        return errors;
        },
    }
}
</script>