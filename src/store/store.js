import Vue from 'vue';
import Vuex from 'vuex';


const state = {
    count : 1
}

export default new Vuex.Store({ //用export default封装代码，让外部可以引用
    state
});
