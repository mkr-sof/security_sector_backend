import db from "../src/db/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seed() {
    const filePath = path.join(__dirname, "data/hikvision_price_list.json");
    const rawJson = fs.readFileSync(filePath, "utf8");
    const items = JSON.parse(rawJson);

    const rows = [];

    for (const [category, seriesGroups] of Object.entries(items)) {
        for (const [series, itemList] of Object.entries(seriesGroups)) {
            if (!Array.isArray(itemList)) continue;
            for (const item of itemList) {
                if (!item || typeof item !== "object") continue;
                const row = {
                    category,
                    series: series || null,
                    model: item["Model"] || null,
                    picture_url: item["Appearance"] || null,
                    resolution: item["Horizontal Resolution"] || null,
                    features: item["Features"] || null,
                    description: item["Descriptions"] || null,
                     dealer_price: item["Դիլեր գին (Ներառյալ ԱԱՀ)"]
                        ? Number(item["Դիլեր գին (Ներառյալ ԱԱՀ)"])
                        : null,
                    sales_price: item["Վաճառքի գին (Ներառյալ ԱԱՀ)"]
                        ? Number(item["Վաճառքի գին (Ներառյալ ԱԱՀ)"])
                        : null,

                    attributes: {}
                };
                for (const [key, value] of Object.entries(item)) {
                    if (
                        key !== "Model" &&
                        key !== "Appearance" &&
                        key !== "Horizontal Resolution" &&
                        key !== "Features" &&
                        key !== "Descriptions" &&
                        key !== "Դիլեր գին (Ներառյալ ԱԱՀ)" &&
                        key !== "Վաճառքի գին (Ներառյալ ԱԱՀ)"
                    ) {
                        row.attributes[key] = value;
                    }
                }
                rows.push(row);
            }
        }
    }

    await db("items").del();
    if (rows.length > 0) {
    await db("items").insert(rows);
    }
    console.log(`Seeded items table with ${rows.length} items.`);
}
// seed().then(() => process.exit());