import Vue from "vue";
import axios from 'axios';
axios.defaults.baseURL = "http://127.0.0.1:8000";

Vue.use(axios);

const state = {
    products: {},
    product: {}
};
const getters = {
    getProducts(state) {
        return state.products;
    },
    getProduct(state) {
        return state.product;
    },
};
const mutations = {
    setProducts(state, products) {
        state.products = products;
    },
    setProduct(state, product) {
        state.product = product
    },
    addProduct(state, product) {
        state.products.push(product)
    },
};
const actions = {
    loadProducts(context, param = "") {
        return new Promise(resolve => {
            axios.get("api/products", param)
                .then(({ data }) => {
                    context.commit('setProducts', data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    console.error(response.errors)
                });
        });
    },

    loadProduct(context, product_id) {
        return new Promise(resolve => {
            axios.get(`api/products/${product_id}`)
                .then(({ data }) => {
                    context.commit('setProduct', data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    console.error(response.data.errors)
                });
        });
    },

    createProduct(context, data) {
        console.log(data);
        return new Promise(resolve => {
            axios.post("api/products", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(({ data }) => {
                console.log(data);
                context.commit('clearValidationMessages', null, { root: true });
                context.dispatch('loadProducts');
                resolve(data);
                
            })
            .catch(({ response }) => {
                context.commit('setValidationMessages', response.data.errors, { root: true });
            });
        });
    },
    updateProduct(context, payload) {
        return new Promise(resolve => {
            axios.post(`api/products/${payload.get("product_id")}`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(({ data }) => {
                context.dispatch('loadProducts');
                context.commit('clearValidationMessages', null, { root: true });
                resolve(data);
            })
            .catch(({ response }) => {
                context.commit('setValidationMessages', response.data.errors, { root: true });
            });
        });
    },
    deleteProduct(context, product_id) {
        return new Promise(resolve => {
            axios.delete(`api/products/${product_id}`)
                .then(({ data }) => {
                    context.dispatch('loadProducts');
                    resolve(data);
                })
                .catch(({ response }) => {
                    console.error(response.data.errors)
                });
        });
    },
};
    
export default {
    state,
    getters,
    mutations,
    actions
}