import Vue from 'vue'

export default {
    state: {
        words: [],
        maxId: null,
        isWordsAdd: false,
    },
    mutations: {
        SET_WORDS(state, payload) {
            state.words = payload
        },
        ADD_WORDS(state, payload) {
            state.isWordsAdd = payload
        },
        DELETE_WORDS(state) {
            state.words.length = 0
        },
    },
    actions: {
        ADD_NEW_WORDS({ commit },) { 
            commit('SET_PROCESSING', true)
            let userDataRef = Vue.$db.collection('userData').doc(getters.userId).collection('userWords')

            let scoreAndDate = {
                addedDate: new Date(),
                maxScore: payload
            }

            userDataRef.set({
                scoreAndDate

            })
                .then(() => {
                    commit('ADD_USER_BOOK', payload)
                    commit('SET_PROCESSING', false)
                })
                .catch(() => {
                    commit('SET_PROCESSING', false)
                });
        },
        LOAD_WORDS({ commit }) {

            Vue.$db.collection('words')
                .get()
                .then(querySnapshot => {
                    let words = []
                    querySnapshot.forEach(s => {
                        const data = s.data()
                        let word = {
                            id: data.id,
                            eng: data.eng,
                            rus: data.rus
                        }

                        words.push(word)
                        this.maxId = words.length

                    })
                    commit('SET_WORDS', words)

                })
                .catch(error => console.log(error))
        },

        LOAD_SAVE_WORDS({ commit, getters }) {
            Vue.$db.collection('userData').doc(getters.userId).collection('userWords')
                .get()
                .then(querySnapshot => {
                    let words = []
                    querySnapshot.forEach(s => {
                        const data = s.data()
                        let word = {
                            id: data.id,
                            eng: data.eng,
                            rus: data.rus
                        }

                        words.push(word)
                        this.maxId = words.length
                    })
                    commit('SET_WORDS', words)

                })
                .catch(error => console.log(error))
        }
    },
    getters: {
        getWords: (state) => state.words,
        getmaxId: (state) => state.maxId,
        getWordsAdd: (state) => state.isWordsAdd
    },

}