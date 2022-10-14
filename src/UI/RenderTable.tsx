import React, { FC } from "react";
import { Table } from "react-bootstrap";
import { TableSchema } from "../type/table";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Person } from "../type/person";

interface RenderTableProps {
  data: any;
  tableStructure: TableSchema[];
  page: number;
}

const RenderTable: FC<RenderTableProps> = ({ data, tableStructure, page }) => {
  return (
    <Table striped bordered>
      <thead>
        <tr className="text-center">
          {tableStructure &&
            tableStructure.map((headerItem) => (
              <th
                key={headerItem.title}
                style={{ width: `${headerItem.width}` }}
              >
                {headerItem.title}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((row: Person, index: number) => {
            const order = 10 * (page - 1) + index + 1;
            return (
              <tr key={uuid()}>
                {tableStructure.map((col) => {
                  const personId = row.url.replaceAll(/\D/g, "");
                  return col.fieldName === "#" ? (
                    <td key={uuid()}>{order}</td>
                  ) : col.fieldName === "link" ? (
                    <td key={uuid()}>
                      <Link to={`/people/${personId}`}>{col.title}</Link>
                    </td>
                  ) : (
                    <td key={col.title}>{(row as any)[col.fieldName]}</td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default RenderTable;
