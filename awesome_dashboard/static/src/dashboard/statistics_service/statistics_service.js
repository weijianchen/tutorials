import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
import { memoize } from "@web/core/utils/functions";
import { reactive } from "@odoo/owl";

const statisticsService = {
    start() {
        const statistics = reactive({
            average_quantity: 0,
            average_time: 0,
            nb_cancelled_orders: 0,
            nb_new_orders: 0,
            total_amount: 0,
            orders_by_size: null,
        });

        async function loadStatistics(){
            const result = await rpc("/awesome_dashboard/statistics");
            Object.assign(statistics, result);
        }

        loadStatistics();

        setInterval(() => {
            loadStatistics();
        }, 10*1000);

        return {
            /*
            loadStatistics: memoize(async () => {
                return await rpc("/awesome_dashboard/statistics");
            }),
            */
           statistics,
           loadStatistics,//可以不用放出来，放出来可以用来以后手动触发更新
        }
    }
}

registry.category("services").add("awesome_dashboard.statistics", statisticsService);