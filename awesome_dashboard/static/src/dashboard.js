import { Component, onWillStart, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { DashboardItem } from "./dashboard_item/dashboard_item";
import { rpc } from "@web/core/network/rpc";
import { PieChart } from "./pie_chart/pie_chart"

class AwesomeDashboard extends Component {
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

        this.statisticsService = useService("awesome_dashboard.statistics");
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

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);//菜单入口

