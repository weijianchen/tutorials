import { PieChartCard } from "./pie_chart_card/pie_chart_card";
import { NumberCard } from "./number_card/number_card";
import { registry } from "@web/core/registry";
/*
export const items = [
    {
        id: "nb_new_orders",
        description: "number of new orders in this month",
        Component: NumberCard,
        props: (data) => ({
            title: "new orders",
            value: data.nb_new_orders,
        })
    },
    {
        id: "nb_cancelled_orders",
        description: "number of cancelled orders in this month",
        Component: NumberCard,
        props: (data) => ({
            title: "cancelled orders",
            value: data.nb_cancelled_orders,
        })
    },
    {
        id: "total_amout",
        description: "total amount in this month",
        Component: NumberCard,
        props: (data) => ({
            title: "total amount",
            value: data.total_amount,
        })
    },
    {
        id: "average_quantity",
        description: "average quantity per order",
        Component: NumberCard,
        props: (data) => ({
            title: "average quantity",
            value: data.average_quantity,
        })
    },
    {
        id: "average_time",
        description: "average time consumed per order",
        Component: NumberCard,
        size: 2,
        props: (data) => ({
            title: "average time",
            value: data.average_time,
        })
    },
    {
        id: "orders_by_size",
        description: "number of orders by size",
        Component: PieChartCard,
        size: 2,
        props: (data) => ({
            title: "number of orders by size",
            data: data.orders_by_size || {},
        }),
    }
]
*/
const dashboardRegistry = registry.category("awesome_dashboard");

dashboardRegistry.add("nb_new_orders", {
    id: "nb_new_orders",
    description: "number of new orders in this month",
    Component: NumberCard,
    props: (data) => ({
        title: "new orders",
        value: data.nb_new_orders,
    })
});
dashboardRegistry.add("nb_cancelled_orders", {
    id: "nb_cancelled_orders",
    description: "number of cancelled orders in this month",
    Component: NumberCard,
    props: (data) => ({
        title: "cancelled orders",
        value: data.nb_cancelled_orders,
    })
});
dashboardRegistry.add("total_amount", {
    id: "total_amount",
    description: "total amount in this month",
    Component: NumberCard,
    props: (data) => ({
        title: "total amount",
        value: data.total_amount,
    })
});
dashboardRegistry.add("average_quantity", {
    id: "average_quantity",
    description: "average quantity per order",
    Component: NumberCard,
    props: (data) => ({
        title: "average_quantity",
        value: data.average_quantity,
    })
});
dashboardRegistry.add("average_time", {
    id: "average_time",
    description: "average time consumed per order",
    Component: NumberCard,
    size: 2,
    props: (data) => ({
        title: "average time",
        value: data.average_time,
    })
});
dashboardRegistry.add("orders_by_size", {
    id: "orders_by_size",
    description: "number of orders by size",
    Component: PieChartCard,
    size: 2,
    props: (data) => ({
        title: "number of orders by size",
        data: data.orders_by_size,
    })
});