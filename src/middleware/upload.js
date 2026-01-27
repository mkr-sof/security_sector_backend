import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb (null, dir);
  },
  filename: (req, file, cb) => {
    const modelName = req.body.model ? req.body.model.replace(/[/\\?*:|"<>]/g, '-') : "unknown";
    const ext = path.extname(file.originalname);
    if (!req.fileCounter){
      req.fileCounter = 0
    }
    const finalName = `${modelName}-${req.fileCounter}${ext}`;
    req.fileCounter++;
    cb(null, finalName);
  }
});

export const upload = multer({storage});