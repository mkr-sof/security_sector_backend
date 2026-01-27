import { ItemsService } from "../services/items.service.js";

export const ItemsController = {
    getItems: async (req, res) => {
        try {
            const items = await ItemsService.getItems();
            res.json(items);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getItemById: async (req, res) => {
        try {
            const item = await ItemsService.getItemById(req.params.id);
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    createItem: async (req, res) => {
        try {
            const newItem = await ItemsService.createItem(req.body);
            res.json(newItem);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    updateItem: async (req, res) => {
        try {
            const updated = await ItemsService.updateItem(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    uploadImages: async (req, res) => {
        try {
            const { id } = req.params;
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: "No files uploaded" });
            }
            const updatedItem = await ItemsService.uploadImages(id, req.files);
            res.json({
                success: true,
                data: updatedItem
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteItem: async (req, res) => {
        try {
            await ItemsService.deleteItem(req.params.id);
            res.json({ message: "Deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}