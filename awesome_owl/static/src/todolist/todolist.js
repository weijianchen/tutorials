import { Component, useState } from "@odoo/owl";
import { TodoItem } from "./todoitem";

export class TodoList extends Component {
    static template = "awesome_owl.todolist";
    static components = { TodoItem };//components是复数不能拼错否则前端会报错组件未注册

    setup(){
        this.todos = useState([
            {id: 3, description: "my banana", isCompleted: true},
            {id: 1, description: "my work", isCompleted: false}
        ])
    }

}