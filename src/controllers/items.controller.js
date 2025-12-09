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
            const data = req.body;
            if(req.file) {
                data.picture_url = `/uploads/${req.file.filename}`;
            }

            const newItem = await ItemsService.createItem(req.body);
            res.json(newItem);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    updateItem: async (req, res) => {
        try {
            const data = req.body;
            if(req.file) {
                data.picture_url = `/uploads/${req.file.filename}`;
            }
            
            const updated = await ItemsService.updateItem(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    deleteItem: async (req, res) => {
        try {
            await ItemsService.deleteItem(req.params.id);
            res.json({message: "Deleted"});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}