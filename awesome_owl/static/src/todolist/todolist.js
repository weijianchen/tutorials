import { Component, useRef, useState, onMounted } from "@odoo/owl";
import { TodoItem } from "./todoitem";

export class TodoList extends Component {
    static template = "awesome_owl.todolist";
    static components = { TodoItem };//components是复数不能拼错否则前端会报错组件未注册

    setup(){
        this.todos = useState([
        ]);
        this.nextId = 1;
        this.inputRef = useRef("todoInput"); //绑定对应的html元素
        onMounted(() => {
            this.inputRef.el.focus();//使用浏览器方法实现光标移入/获得焦点
        })
    }

    addTodo(ev){
        if (ev.keyCode !== 13){
            return;
        }
        const description = ev.target.value.trim();
        if (!description){
            return;
        }
        this.todos.push({
            id: this.nextId++,
            description,
            isCompleted: false
        });
        ev.target.value = "";
    }

    toggleState(id){
        const todo = this.todos.find((todo) => todo.id === id);
        todo.isCompleted = !todo.isCompleted;
    }

    removeTodo(id){
        const index = this.todos.findIndex((elem) => elem.id == id);
        if (index >= 0) {
            this.todos.splice(index, 1);
        }

    }

}