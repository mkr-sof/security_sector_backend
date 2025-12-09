import db from "../db/db.js";

export const ItemsModel = {
    getAll: () => db("items").select("*").orderBy("id", "asc"),
    getById: (id) => db("items").where({id}).first(),
    create: (data) => db("items").insert(data).returning("*"),
    update: (id, data) => db("items").where({id}).update(data).returning("*"),
    delete: (id) => db("items").where({id}).del(),
}