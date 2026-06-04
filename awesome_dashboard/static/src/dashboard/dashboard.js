import { Component, onWillStart, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { DashboardItem } from "./dashboard_item/dashboard_item";
import { rpc } from "@web/core/network/rpc";
import { PieChart } from "./pie_chart/pie_chart";
//import { items } from "./dashboard_items";
import "./dashboard_items";
import { DashboardSettingDialog } from "./dashboard_dialog/dashboard_dialog";

const LOCAL_STORAGE_KEY = "awesome_dashboard.removed_items";//为什么不能放在setup里？

class AwesomeDashboard extends Component { //注意这里没有export为什么可以，因为没有被import而且也在最后注册进了registry?
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, DashboardItem, PieChart };

    setup(){
        this.action = useService("action");
        /*
        this.statics = useState({
            average_quantity: 0,
            average_time: 0,
            nb_cancelled_orders: 0,
            nb_new_orders: 0,
            total_amount: 0,
            orders_by_size: null,
        })
        */

        this.statisticsService = useService("awesome_dashboard.statistics");//与statistics_service.js 中的 registry.category("services").add("awesome_dashboard.statistics", statisticsService);同名
        this.statics = useState(this.statisticsService.statistics);


        /*
        onWillStart(async() => {
            //const result = await rpc("/awesome_dashboard/statistics");
            const result = await this.statisticsService.loadStatistics();
            console.log("statics result:", result);
            Object.assign(this.statics, result);//避免用this.statics=result以免丢掉响应式，key值要相同才能复制过去否则会丢失，orders_by_size和order_by_size
            console.log("after assign:", this.statics)
        })
        */
       //this.items = items;
       //this.items = registry.category("awesome_dashboard").getAll();//与dashboard_items.js 中的 const dashboardRegistry = registry.category("awesome_dashboard");同名


       this.dialog = useService("dialog");
       this.state = useState({removedItemIds: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"),})//注意逻辑或的用法，如果前面是空/假值，就用后面的

    }

    //getter,使模板每次访问items时能重新计算，有别于上面的this.item只是静态
    get items(){
        const removed = new Set(this.state.removedItemIds);//注意set的用法，里面的值不会重复
        return registry.category("awesome_dashboard").getAll().filter((item) => !removed.has(item.id));//filter为数据的方法，入参为一个回调函数
    }

    openSettings(){
        console.log("open settings clicked");
        console.log("dialog_service:", this.dialog);
        console.log("dialog_component:", DashboardSettingDialog);
        this.dialog.add(DashboardSettingDialog, {
            items: registry.category("awesome_dashboard").getAll(),
            removedItemIds: this.state.removedItemIds,
            onApply: (removedItemIds) => {
                this.state.removedItemIds = removedItemIds;//触发重新渲染
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(removedItemIds));
            }
        });
        console.log("dialog.add called")
    }

    openCustomers(){
        this.action.doAction("base.action_partner_form");
    }

    openLeads(){
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Leads",
            res_model: "crm.lead",
            views: [
                [false, "list"],
                [false, "form"]
            ],
            target: "current",
        }
        )
    }
}

registry.category("lazy_components").add("AwesomeDashboard", AwesomeDashboard);

