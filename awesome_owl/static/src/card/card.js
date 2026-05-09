import { Component, useState } from "@odoo/owl";

export class Card extends Component {
    static template = "awesome_owl.card";
    static props = {
        title: String,
        content1: String,
        content2: String, //定义参数名称及类型，有validation方便开发时检查前端有没有传错、漏传或参数错误
        slots: {type: Object, optional: true},
    }

    setup(){
        this.state = useState({
            isOpen: true,
        });
    }

    toggleContent(){
        this.state.isOpen = !this.state.isOpen;
    }
}