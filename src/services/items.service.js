import { ItemsModel } from "../models/item.model.js";

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
    uploadImages: async (id, files) => {
        const imageUrls = files.map(file => `/uploads/${file.filename}`);
        const data = {
            picture_url: JSON.stringify(imageUrls),
            updated_at: new Date(),
        };
        const updated = await ItemsModel.update(id, data);
        if (!updated || updated.length === 0){
            throw new Error("Item not found");
        }
        return updated[0];
    },
    deleteItem: (id) => ItemsModel.delete(id),
} ;

