import { Router } from "express";
import { ItemsController } from "../controllers/items.controller.js";

const router = Router();

router.get("/", ItemsController.getItems);
router.get("/:id", ItemsController.getItemById);
router.post("/", ItemsController.createItem);
router.put("/:id", ItemsController.updateItem);
router.delete("/:id", ItemsController.deleteItem);

export default router;