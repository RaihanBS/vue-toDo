import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toDoList: [],
    filter: "all"
  },
  getters: {
    uncompleted(state) {
      return state.toDoList.filter(toDo => !toDo.completed).length;
    },
    nothingRemains(state, getters) {
      return getters.uncompleted !== 0;
    },
    filteredToDoList(state) {
      if (state.filter === "all") {
        return state.toDoList;
      } else if (state.filter === "active") {
        return state.toDoList.filter(toDo => !toDo.completed);
      } else if (state.filter === "completed") {
        return state.toDoList.filter(toDo => toDo.completed);
      }
    },
    showClearButton(state) {
      return state.toDoList.filter(toDo => toDo.completed).length > 0;
    }
  },
  mutations: {
    updateFilter(state, payload) {
      state.filter = payload.filter;
    },
    clearCompleted(state) {
      state.toDoList = state.toDoList.filter(toDo => !toDo.completed);
    },
    checkAll(state) {
      state.toDoList.forEach(toDo => (toDo.completed = event.target.checked));
    },
    addToDo(state, toDo) {
      state.toDoList.push({
        id: toDo.id,
        title: toDo.title,
        completed: false,
        edited: false
      });
    },
    removeToDo(state, payload) {
      state.toDoList.splice(payload.index, 1);
    }
  }
});
