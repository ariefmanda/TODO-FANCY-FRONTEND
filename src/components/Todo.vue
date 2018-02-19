<template>
      <div class="section" id="todolist">
        <div class="container">
            <div class="row">
                <div class="col-md-8 ml-auto mr-auto text-center">
                    <h3>
                        Welcome to Todo Task
                    </h3>
                </div>
                <div class="col-md-8 ml-auto mr-auto ">
                    <table class="uk-table uk-table-striped center uk-overflow-auto">
                        <thead>
                            <th>tanggal</th>
                            <th>success</th>
                            <th>jobs</th>
                            <th>action</th>
                        </thead>
                        <tbody>
                        <tr v-for="todo of todos" :key="todo._id">
                            <td>{{todo.createdAt}}</td>
                            <td>
                            <span uk-icon="icon: check" style="cursor:pointer" @click="success(todo._id,todo.ceklist)"></span>
                            </td>
                            <td v-if="todo.ceklist==0">{{todo.content}}</td>
                            <td v-if="todo.ceklist==1"><strike>{{todo.content}}</strike></td>
                            <td>
                                <span uk-icon="icon: trash" style="cursor:pointer" @click="destroy(todo._id)"></span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div id="formadd">
                            <input class="uk-input uk-width-1-2" type="text" placeholder="add job" id="emoji" v-model="add">
                            <button class="uk-button uk-button-primary" @click="addtodo">add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
let url = "http://feedomain.tk:5902/api";
export default {
  name: "Todo",
  data() {
    return {
      fbtoken: localStorage.getItem("fbtoken") || null,
      token: localStorage.getItem("token") || null,
      todos: [],
      add: ""
    };
  },
  created() {
    this.getTodo();
  },
  methods: {
    getTodo() {
      if (this.token) {
        axios
          .get(`${url}/todo`, {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(data => {
            console.log(data);
            this.todos = data.data.data;
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    success(id, ceklist) {
      console.log("edit", id, ceklist);
      axios
        .put(
          `${url}/todo/${id}`,
          {
            ceklist: ceklist == 0 ? 1 : 0
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(data => {
          this.getTodo();
        })
        .catch(err => console.log(err));
    },
    destroy(id) {
      axios
        .delete(`${url}/todo/${id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(data => {
          this.getTodo();
        })
        .catch(err => {
          console.log(err);
        });
    },
    addtodo() {
        console.log(this.add);
      axios
        .post(
          `${url}/todo`,
          {
            content: this.add
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(data => {
            this.add=''
          this.getTodo();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>

