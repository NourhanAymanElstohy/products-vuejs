<template>
    <div class="container">
        <b-form @submit="onSubmit">
            <b-form-group
              label="Title:"
              label-size="lg"
              label-cols-lg="2"
              label-class="font-weight-bold"
              label-for="input-2"
            >
                <b-form-input
                    v-model="form.title"
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
                id="input-group-2"
                label="Price:"
                label-for="input-2"
                label-size="lg"
                label-cols-lg="2"
                label-class="font-weight-bold"
            >
                <b-form-input
                    v-model="form.price"
                    required
                    type="number"
                    placeholder="Price"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-2"
                label="Description:"
                label-for="input-2"
                label-size="lg"
                label-cols-lg="2"
                label-class="font-weight-bold"
            >
                <b-form-textarea
                    v-model="form.description"
                    required
                    placeholder="Description"
                ></b-form-textarea>
            </b-form-group>
            <b-form-group 
                id="input-group-image"
                label="Image:"
                label-for="input-1"
                label-size="lg"
                label-cols-lg="2"
                label-class="font-weight-bold text-dark"
            >
                <b-form-file
                    v-model="form.image"
                    :rules="rules"
                    accept="image/png, image/jpeg, image/bmp"
                    :loading="true"
                ></b-form-file>
            </b-form-group>
            <div class="form-row">
              <div class="col-lg-2 col-form-label"></div>
                <div class="col">
                    <b-button type="submit" variant="success">Submit</b-button>
                    <b-button type="reset" @click="onReset" class="ml-2" variant="primary">Clear</b-button>
                    <b-button class="ml-2" variant="light" @click="cancel">Cancel</b-button>
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
import { mapGetters } from "vuex";
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            form: {
                title: "",
                price: 0,
                description:"",
                image: null,
            },
            rules: [
                value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
            ],
        };
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            var formData = new FormData();
            
            formData.append("title", this.form.title);
            formData.append("description", this.form.description);
            formData.append("price", this.form.price);
            formData.append("image", this.form.image);
            this.$store.dispatch("createProduct",formData).then(() => {
                this.$emit("hideModal");
                 Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Product has been created successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
        },
        cancel(){
            this.$emit("hideModal");
        },
        onReset(evt) {
            evt.preventDefault();
            this.$store.dispatch('clearValidationMessages')
            // Reset our form values
            this.form.title = "";
            this.form.description = "";
            this.form.price = 0;
            this.form.image = null;
            // Trick to reset/clear native browser form validation state
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            });
        },
    },
    computed: {
        ...mapGetters(["getValidationMessages"]),
        validationErrors() {
            let errors = Object.values(this.getValidationMessages);
            errors = errors.flat();
            return errors;
        },
    },
};
</script>