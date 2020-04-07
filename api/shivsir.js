var storage = multer.diskStorage({
    destination: function(req, file, cd) {
    cd(null, 'uploads') //todo upload/
    },
    filename: function(req, file, cd) {
    cd(null,file.originalname)
    }
    
    })
    // new Date().toISOString()+
    //upload the file function
    var upload = multer({
    storage: storage
    }).any('');


module.exports.database = (req, res) => {
    return new Promise((resolve, reject) => {
    upload(req, res, function (err) {
    if (err) {
    const Data = {
    "success": false,
    "message": 'Error 2'
    }
    resolve(Data)
    console.info("upload",err)
    //res.send(err)
    } else {
    var imagename = req.files;
    const map1 = imagename.map((file_data) => {
    var filepath = file_data.path;
    console.log(filepath)
    res.json({
    "success": 'True',
    "message": 'file uploaded',
    "file_data": file_data.path
    })