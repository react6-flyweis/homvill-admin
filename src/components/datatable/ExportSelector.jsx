import * as XLSX from "xlsx";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

// tableRef should be a forwarded ref to the tanstack table instance
export function ExportSelector({ tableRef }) {
  const [value, setValue] = useState("");

  const buildRowsFromTable = () => {
    const table = tableRef?.current;
    if (!table) return { headers: [], rows: [] };

    // Resolve visible columns (defensive if columnVisibility is undefined)
    const allCols = table.getAllColumns();
    const colVis = table.getState().columnVisibility || {};
    const visibleCols = allCols.filter((c) => colVis[c.id] !== false);

    // Build header labels. columnDef.header can be a string, function, or JSX.
    // For export we prefer a readable string, falling back to the column id.
    const headers = visibleCols.map((c) => {
      const header = c.columnDef.header;
      if (typeof header === "string") return header;
      if (typeof header === "function") {
        try {
          const res = header();
          if (typeof res === "string") return res;
        } catch (e) {
          // ignore - fallback to id
        }
      }
      // If header is JSX or anything else, fall back to the column id
      return c.id;
    });

    // Use table.getRowModel().flatRows to respect current filters/sorting/pagination
    const rows = table.getRowModel().flatRows.map((row) =>
      visibleCols.map((col) => {
        let val = "";
        if (col?.columnDef?.accessorKey) {
          val = row.original?.[col.columnDef.accessorKey];
        } else if (col?.id) {
          try {
            // row.getValue is the safest way to get rendered cell value if accessor isn't used
            val = row.getValue(col.id);
          } catch (e) {
            val = row.original?.[col.id];
          }
        }
        return val ?? "";
      })
    );

    return { headers, rows };
  };

  const exportXLSX = () => {
    const { headers, rows } = buildRowsFromTable();
    const wsData = [headers, ...rows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "export.xlsx");
  };

  const exportPDF = async () => {
    const { headers, rows } = buildRowsFromTable();
    // Try to generate a real PDF file using jsPDF + autoTable.
    // This uses dynamic imports so the app still runs if the packages are absent.
    try {
      const { jsPDF } = await import("jspdf");
      // jspdf-autotable patches jsPDF with `autoTable`
      await import("jspdf-autotable");

      // Normalize data to strings
      const head = [headers.map((h) => String(h ?? ""))];
      const body = rows.map((r) =>
        r.map((c) => (c === null || c === undefined ? "" : String(c)))
      );

      // Create PDF in portrait/landscape depending on column count
      const isWide = headers.length > 6;
      const doc = new jsPDF(isWide ? { orientation: "landscape" } : {});

      // Add a small title
      doc.setFontSize(12);
      doc.text("Export", 14, 20);

      // autoTable will place the table below the title
      // eslint-disable-next-line no-undef
      doc.autoTable({
        head,
        body,
        startY: 26,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [244, 244, 244], textColor: 20 },
        margin: { left: 10, right: 10 },
        theme: "striped",
        didDrawPage: (data) => {
          // Optional: page footer with page number (defensive access for different jspdf versions)
          try {
            const pageCount =
              typeof doc.getNumberOfPages === "function"
                ? doc.getNumberOfPages()
                : doc.internal &&
                  doc.internal.getNumberOfPages &&
                  doc.internal.getNumberOfPages();
            const page =
              (doc.getCurrentPageInfo && doc.getCurrentPageInfo().pageNumber) ||
              (doc.internal &&
                doc.internal.getCurrentPageInfo &&
                doc.internal.getCurrentPageInfo().pageNumber) ||
              pageCount ||
              1;
            doc.setFontSize(8);
            const pageWidth =
              (doc.internal &&
                doc.internal.pageSize &&
                doc.internal.pageSize.getWidth &&
                doc.internal.pageSize.getWidth()) ||
              (doc.internal &&
                doc.internal.pageSize &&
                doc.internal.pageSize.width) ||
              0;
            const pageHeight =
              (doc.internal &&
                doc.internal.pageSize &&
                doc.internal.pageSize.getHeight &&
                doc.internal.pageSize.getHeight()) ||
              (doc.internal &&
                doc.internal.pageSize &&
                doc.internal.pageSize.height) ||
              0;
            doc.text(
              `Page ${page} / ${pageCount}`,
              pageWidth - 40,
              pageHeight - 10
            );
          } catch (e) {
            // ignore footer if page info isn't available
          }
        },
      });

      doc.save("export.pdf");
      return;
    } catch (err) {
      // If dynamic import failed, fall back to printable HTML (previous behavior)
      // and advise developer to install jspdf and jspdf-autotable for direct PDF file downloads.
      // helper to escape cell content for safe HTML
      const escapeHTML = (str) =>
        String(str ?? "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\"/g, "&quot;")
          .replace(/'/g, "&#39;");

      const html = `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Export</title>
            <style>
              table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
              th, td { border: 1px solid #ddd; padding: 8px; }
              th { background: #f4f4f4; }
            </style>
          </head>
          <body>
            <table>
              <thead>
                <tr>${headers
                  .map((h) => `<th>${escapeHTML(h)}</th>`)
                  .join("")}</tr>
              </thead>
              <tbody>
                ${rows
                  .map(
                    (r) =>
                      `<tr>${r
                        .map((c) => `<td>${escapeHTML(c)}</td>`)
                        .join("")}</tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </body>
        </html>
      `;

      const newWin = window.open("", "_blank", "noopener,noreferrer");
      if (!newWin) return;
      newWin.document.write(html);
      newWin.document.close();
      setTimeout(() => newWin.print(), 500);
      // Optionally notify developer
      // console.info('For direct PDF downloads install: pnpm add jspdf jspdf-autotable');
    }
  };

  const onChange = async (val) => {
    // keep the selection briefly so the UI shows the chosen item
    setValue(val ?? "");
    try {
      if (val === "xlsx") await exportXLSX();
      else if (val === "pdf") await exportPDF();
    } finally {
      // reset selection so placeholder shows again
      // timeout gives the Select a moment to close before clearing (UX)
      setTimeout(() => setValue(""), 200);
    }
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="border rounded-md px-3 py-2 text-sm shadow-md">
        <SelectValue placeholder="Download" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="xlsx">XLSX</SelectItem>
        <SelectItem value="pdf">PDF</SelectItem>
      </SelectContent>
    </Select>
  );
}
