<template>
  <div>
    <h1>ToDo List</h1>
    <input
      type="text"
      placeholder="What needs to be done?"
      class="todo-input"
      v-model="task"
      v-on:keyup.enter="addToDo"
    />
    <div
      v-for="(toDo, index) in filteredToDoList"
      v-bind:key="toDo.id"
      class="toDo"
    >
      <div class="toDo-main">
        <input type="checkbox" v-model="toDo.completed" />
        <div
          v-on:dblclick="editToDo(toDo)"
          class="toDo-title"
          v-if="!toDo.edited"
          v-bind:class="{ completed: toDo.completed }"
        >
          {{ toDo.title }}
        </div>
        <input
          v-else
          type="text"
          v-model="toDo.title"
          class="toDo-edit"
          v-on:blur="doneEdit(toDo)"
          v-on:keyup.enter="doneEdit(toDo)"
          v-focus
        />
      </div>
      <div class="remove-toDo" v-on:click="removeToDo(index)">&times;</div>
    </div>

    <div class="filter-toDo">
      <div>
        <label
          ><input
            type="checkbox"
            v-bind:checked="!nothingRemains"
            v-on:change="checkAll()"
          />
          Check All
        </label>
      </div>
      <div>{{ uncompleted }} items left</div>
    </div>

    <div class="filter-toDo-state">
      <div>
        <button
          v-bind:class="{ active: filter == 'all' }"
          v-on:click="changeFilter('all')"
        >
          All
        </button>
        <button
          v-bind:class="{ active: filter == 'active' }"
          v-on:click="changeFilter('active')"
        >
          Active
        </button>
        <button
          v-bind:class="{ active: filter == 'completed' }"
          v-on:click="changeFilter('completed')"
        >
          Completed
        </button>
      </div>

      <div>
        <button v-if="showClearButton" v-on:click="clearCompleted">
          Clear Completed
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToDo",
  data() {
    return {
      task: "",
      toDoId: 1
    };
  },
  methods: {
    addToDo() {
      this.$store.commit("addToDo", { id: this.toDoId++, title: this.task });
      this.task = "";
    },
    removeToDo(index) {
      this.$store.commit("removeToDo", { index: index });
    },
    editToDo(toDo) {
      toDo.edited = true;
    },
    doneEdit(toDo) {
      toDo.edited = false;
    },
    checkAll() {
      this.$store.commit("checkAll");
    },
    clearCompleted() {
      this.$store.commit("clearCompleted");
    },
    changeFilter(filter) {
      this.$store.commit("updateFilter", { filter: filter });
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  computed: {
    uncompleted() {
      return this.$store.getters.uncompleted;
    },
    nothingRemains() {
      return this.$store.getters.nothingRemains;
    },
    filteredToDoList() {
      return this.$store.getters.filteredToDoList;
    },
    showClearButton() {
      return this.$store.getters.showClearButton;
    },
    filter() {
      return this.$store.state.filter;
    }
  }
};
</script>

<style>
.todo-input {
  width: 100%;
  padding: 16px;
  margin: 10px auto;
  font-size: 16px;
}

.toDo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.remove-toDo {
  cursor: pointer;
}

.toDo-main {
  display: flex;
  align-items: center;
}

.toDo-title {
  padding: 10px;
  margin-left: 12px;
}

.toDo-edit {
  font-size: 20px;
  margin-left: 12px;
  width: 100%;
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.filter-toDo {
  border-top: 1px solid grey;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding-top: 16px;
  justify-content: space-between;
  margin-bottom: 10px;
}

.filter-toDo-state {
  border-top: 1px solid grey;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding-top: 16px;
  justify-content: space-between;
}

h1 {
  text-align: center;
  font-size: 100px;
}
</style>
