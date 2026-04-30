import { Component, useState } from "@odoo/owl";
import { Counter } from "./counter/counter.js"; //从当位置开始找要加. 否则/会被认为从根目录开始
import { Card } from "./card/card.js";
import { markup } from "@odoo/owl";

export class Playground extends Component {
    static template = "awesome_owl.playground";
    static components = { Counter, Card }; //把 Counter 注册成 Playground 可以使用的子组件,否则 Owl 不知道 <Counter/> 是什么组件, 就无法在xml中用它

    setup(){
        this.state = useState({value:0});
        this.html = "<b>not safe</b>";
        this.safeHtml = markup("<b>safe content</b>");
    }

    increment(){
        this.state.value++;
    }
}
