import { Suspense } from "react";
import Loading from "./shared/loading";

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className=" text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <Suspense fallback={<Loading />}>
        <tbody>{data.map((item) => renderRow(item))}</tbody>
      </Suspense>
    </table>
  );
};

export default Table;
