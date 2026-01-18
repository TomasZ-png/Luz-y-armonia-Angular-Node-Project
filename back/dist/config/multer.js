import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    destination: 'uploads/productos',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, filename);
    }
});
export const upload = multer({
    storage,
    fileFilter: (_, file, cb) => {
        if (file.mimetype.startsWith('image/'))
            cb(null, true);
        else
            cb(new Error('Solo imagenes'));
    }
});
//# sourceMappingURL=multer.js.map