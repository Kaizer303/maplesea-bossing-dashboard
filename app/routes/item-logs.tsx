import { json, useLoaderData } from "@remix-run/react";
import ItemLogsTable from "~/components/item-logs/table";
import { getItemLogs } from "~/components/services/item-logs.service";
import invariant from "tiny-invariant";

export const loader = async () => {
  const itemLogs = await getItemLogs();
  invariant(itemLogs, "Item logs not found");
  return json({ itemLogs });
};

export default function ItemLogs() {
  const { itemLogs } = useLoaderData<typeof loader>();

  return (
    <div className="bg-gray-950 h-screen w-full">
      <div className="p-8">
        <ItemLogsTable itemLogs={itemLogs} />
      </div>
    </div>
  );
}
