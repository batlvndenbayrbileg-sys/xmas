import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { exportProductsCsv } from "../../../../lib/catalog";

// GET /admin/catalog/export — download the whole catalog as CSV.
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const csv = await exportProductsCsv(req.scope);
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="xmas-catalog.csv"');
  res.send(csv);
}
