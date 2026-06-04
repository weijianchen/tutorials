import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";

export class DashboardSettingDialog extends Component {
    static template = "awesome_dashboard.DashboardSettingDialog";
    static components = { Dialog };
    static props = {
        items: Array,
        removedItemIds: Array,
        close: Function,
        onApply: Function,
    }

    setup(){
        const removed = new Set(this.props.removedItemIds);
        this.state = useState({
            checkedItems: Object.fromEntries(
                this.props.items.map((item)=>[item.id, !removed.has(item.id)])
            )
        });
    }

    apply(){
        const removedItemIds = this.props.items.filter((item) => !this.state.checkedItems[item.id]).map((item) => item.id);
        this.props.onApply(removedItemIds);
        this.props.close();
    }
}