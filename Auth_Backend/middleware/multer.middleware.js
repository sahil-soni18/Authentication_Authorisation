import multer from "multer"; 
import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../utils/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + "." + ext);
    }
  })


  
  const upload = multer({ storage: storage })

  export default upload;