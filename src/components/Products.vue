<template>
    <div class="hello">
        <b-container>
            <div class="row">
                <h2 class="col-lg-4 col-md-4 col-sm-12 col-12">All Products</h2>
                <div class="col-lg-2 col-md-2 col-sm-3 col-3">
                    <button @click="showModal('create')" class="btn btn-sm btn-primary">
                        Add Product
                    </button>
                    <b-modal
                        ref="create"
                        hide-footer
                        title="Create Product"
                        size="lg"
                    >
                        <ProductCreate @hideModal="hideModal('create')"/>
                    </b-modal>
                </div>
            </div>

            <div style="overflow-x: scroll; display: block; width: 100%" class="row mt-2">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Image</th>
                            <th colspan="4" scope="colgroup" class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in getProducts" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td>{{ product.title }}</td>
                            <td>{{ product.description.substr(0, 25) }}...</td>
                            <td>{{ product.price }}</td>
                            <td class="text-center">
                                <img :src="'http://127.0.0.1:8000'+product.image" alt="" srcset="" width="50" height="50">
                            </td>   
                            <td class="text-center">
                                <button class="btn btn-sm btn-info" @click="showPrevModal('product' + product.id)">
                                    Show
                                </button>
                                <b-modal
                                    :ref="'product' + product.id"
                                    hide-footer
                                    title="Show Product"
                                >
                                    <ProductShow
                                        @hideModal="hidePrevModal('product' + product.id)"
                                        :product="product"
                                    />
                                </b-modal>
                            </td>  
                            <td class="text-center">
                                <button class="btn btn-sm btn-warning" @click="showEditModal('edit-product' + product.id)">
                                    Edit
                                </button>
                                <b-modal
                                    :ref="'edit-product' + product.id"
                                    hide-footer
                                    title="Edit Product"
                                    size="lg"
                                >
                                    <ProductEdit
                                        @hideModal="hideEditModal('edit-product' + product.id)"
                                        :product="product"
                                    />
                                </b-modal>
                            </td>
                            <td class="text-center">
                                <button
                                    class="btn btn-sm btn-danger"
                                    @click="deleteProduct(product.id)"
                                >Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>    
        </b-container>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ProductEdit from "./ProductEdit";
import ProductCreate from "./ProductCreate";
import ProductShow from "./ProductShow";
import Swal from "sweetalert2";

export default {
  components: {
    ProductEdit,
    ProductCreate,
    ProductShow
  },

  mounted(){
      this.loadProducts();
  },
  computed: {
    ...mapGetters(["getProducts"]),
  },
  methods: {
    ...mapActions(["loadProducts"]),
    showModal(id) {
        this.$refs[id].show();
    },
    hideModal(id) {
      this.$refs[id].hide();
    },
    showEditModal(id) {
      this.$refs[id][0].show();
    },
    hideEditModal(id) {
      this.$refs[id][0].hide();
    },
    showPrevModal(id) {
      this.$refs[id][0].show();
    },
    hidePrevModal(id) {
      this.$refs[id][0].hide();
    },
    deleteProduct(id) {
      Swal.fire({
            title: 'Are you sure you want to delete this Product?',
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            denyButtonText: `Delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isDenied) {
                this.$store.dispatch("deleteProduct", id)
            }
        });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
