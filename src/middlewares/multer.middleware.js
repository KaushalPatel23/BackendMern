import multer from "multer";    

const storage = multer.diskStorage({ //  we con store on disk storage
  destination: function (req, file, cb) {// to set the destination where we have to save
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage: storage })