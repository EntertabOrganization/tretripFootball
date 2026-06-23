"use client";

import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

type Props = {
  columns: string[];
  rows: ReactNode[][];
};

export function AdminDataTable({ columns, rows }: Props) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const tableId = useId();

  useEffect(() => {
    let active = true;
    let instance: { destroy: () => void } | null = null;

    const mount = async () => {
      const [{ default: jQuery }] = await Promise.all([
        import("jquery"),
        import("datatables.net-dt"),
      ]);

      if (!active || !tableRef.current) {
        return;
      }

      const $ = jQuery;

      if ($.fn.dataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }

      instance = $(tableRef.current).DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        lengthChange: true,
        pageLength: 10,
        autoWidth: false,
        destroy: true,
        dom: "<'dt-toolbar'<'dt-search-wrap'f>>t<'dt-footer'<'dt-footer-length'l><'dt-footer-meta'ip>>",
        language: {
          search: "",
          searchPlaceholder: "Search records...",
          lengthMenu: "_MENU_ rows",
        },
      });
    };

    void mount();

    return () => {
      active = false;
      instance?.destroy();
    };
  }, [columns, rows]);

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table ref={tableRef} id={tableId} className="display w-full text-sm">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${tableId}-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${tableId}-${rowIndex}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
