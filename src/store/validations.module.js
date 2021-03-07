const state = {
    validationMessages: [],
}

const getters = {
    getValidationMessages(state) {
        return state.validationMessages
    }
}

const actions = {
    clearValidationMessages(context) {
        context.commit('clearValidationMessages')
    }
}

const mutations = {
    setValidationMessages(state, error) {
        state.validationMessages = error;
    },
    clearValidationMessages(state) {
        state.validationMessages = [];
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};