import { Component, useState } from "@odoo/owl";
import { TodoItem } from "./todoitem";

export class TodoList extends Component {
    static template = "awesome_owl.todolist";
    static components = { TodoItem };//components是复数不能拼错否则前端会报错组件未注册

    setup(){
        this.todos = useState([
        ]);
        this.nextId = 1;
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

}