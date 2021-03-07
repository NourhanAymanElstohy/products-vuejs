import Vue from "vue";
import Vuex from "vuex";

import products from './products.module';
import validation from "./validations.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
      products,
      validation
    }
});