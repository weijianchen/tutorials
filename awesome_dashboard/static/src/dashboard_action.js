import { Component, xml } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { LazyComponent} from "@web/core/assets";

export class AwesomeDashboardLoader extends Component {
    static components = { LazyComponent };
    static template = xml`<LazyComponent bundle="'awesome_dashboard.dashboard'" Component="'AwesomeDashboard'"/>`;
    //bundle里是懒加载的manifest里定义的资源包，component是包里的组件，然后组件也需要注册到lazy_components这个分类才能被找到，即最后一行代码
}

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboardLoader);//与views.xml中定义的客户端动作的tag保持一致