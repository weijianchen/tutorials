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
        this.state1 = useState({sum:0}) //为什么这里不能写state，否则显示为空白且点击按钮后NaN
    }

    increment(){
        this.state.value++;
    }

    increSum(){
        this.state1.sum++;
    }
}
