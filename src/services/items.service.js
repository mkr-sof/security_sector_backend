import { ItemsModel } from "../models/item.mode";

export const ItemsService = {
    getItems: async () => {
    const items = await ItemsModel.getAll();
    return items.map(item => ({
        ...item,
    }));
    },
    getItemById: (id) => ItemsModel.getById(id),
    createItem: (data) => ItemsModel.create(data),
    updateItem: (id, data) => ItemsModel.update(id, data),
    deleteItem: (id) => ItemsModel.delete(id),
} ;

