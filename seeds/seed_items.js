import db from "../src/db/db";

export async function seed() {
    await db("items").del();
    await db("items").insert([])
    console.log("Seeded items table.");
}
seed().then(() => process.exit());