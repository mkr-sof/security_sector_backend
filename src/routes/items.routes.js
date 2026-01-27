import { Router } from "express";
import { ItemsController } from "../controllers/items.controller.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/", ItemsController.getItems);
router.get("/:id", ItemsController.getItemById);
router.post("/", upload.single("picture"), ItemsController.createItem);
router.put("/:id", upload.single("picture"), ItemsController.updateItem);
router.delete("/:id", ItemsController.deleteItem);

export default router;