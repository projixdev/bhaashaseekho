"use client";

import { useMemo, useState } from "react";

// Generic sortable table shared by the teachers/students/feedback tables on
// the admin dashboard — each column is { key, label, render? }; render is
// optional and receives the full row, key alone drives both the default
// cell value and the sort comparison.
export default function SortableTable({ columns, rows, rowKey = "_id", emptyMessage = "Nothing here yet." }) {
  const [sort, setSort] = useState({ key: columns[0]?.key, dir: "asc" });

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "number" && typeof bv === "number") {
        return sort.dir === "asc" ? av - bv : bv - av;
      }
      const cmp = String(av).localeCompare(String(bv));
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort]);

  function toggleSort(key) {
    setSort((current) => ({ key, dir: current.key === key && current.dir === "asc" ? "desc" : "asc" }));
  }

  if (rows.length === 0) {
    return <p className="py-6 text-sm text-secondary">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-muted">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => toggleSort(col.key)}
                className="cursor-pointer select-none whitespace-nowrap px-3 py-2 font-medium text-foreground"
              >
                {col.label}
                {sort.key === col.key ? (sort.dir === "asc" ? " ▲" : " ▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row[rowKey]} className="border-t border-border">
              {columns.map((col) => (
                <td key={col.key} className="whitespace-nowrap px-3 py-2 text-foreground">
                  {col.render ? col.render(row) : (row[col.key] ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
