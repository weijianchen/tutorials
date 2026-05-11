import { Component, onWillStart, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { DashboardItem } from "./dashboard_item/dashboard_item";
import { rpc } from "@web/core/network/rpc";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, DashboardItem };

    setup(){
        this.action = useService("action");
        this.statics = useState({
            average_quantity: 0,
            average_time: 0,
            nb_cancelled_orders: 0,
            nb_new_orders: 0,
            total_amount: 0
        })
        onWillStart(async() => {
            const result = await rpc("/awesome_dashboard/statistics");
            Object.assign(this.statics, result);
        })

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

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);
