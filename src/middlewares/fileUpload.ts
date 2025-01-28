import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getStorage = (folderName: string) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.resolve(__dirname, `../uploads/${folderName}`);
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${req.body.business_name || 'file'}_${file.originalname}`);
        },
    });
};

const createUploader = (folderName: string) => {
    const storage = getStorage(folderName);
    return multer({ storage });
};

export default createUploader;
