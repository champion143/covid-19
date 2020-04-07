//--------------------Storage the folder functionality--------------------
var storage = multer.diskStorage({
    destination: function(req, file, cd) {
    cd(null, 'upload/')
    },
    filename: function(req, file, cd) {
    cd(null,file.originalname)
    }
    })
    
    //--------------------upload the file function--------------------
    var upload = multer({
    storage: storage
    }).any('');
    
    
    
    //=========================image_upload=========================
    module.exports.Receiver_List_CSV=async(req, res) => {
    
    upload(req, res, (err) => {
    if (err) {
    console.warn(err)
    } else {
    var imagename = req.files;
    const map1 = imagename.map( async (data) => {
    var filepath =data.path;
    console.info("Fetch the data with file")
    //function Middleware
    await csvConverts(data.path).then((data)=>{
    fs.unlink(filepath,(err)=>{
    if(err){
    res.send(err)
    }else{
    res.json(data)
    }
    })
    })
    })
    }
    })
    }
    
    //=========================CSV file Convert Data function=========================
    var csvConverts = function csvFileToConvertData(Tests) {
    return new Promise((resolve,reject)=>{
    console.info("fetch the data with to database",Tests)
    var count=0;
    let csvUrl = Tests
    fs.createReadStream(csvUrl)
    .pipe(csv({onHeader:true}))
    .on('data', async (row) => {
    var Arr= Object.keys(row);
    if(Arr[0] != 'Consignee'&& Arr[1] != 'Address' && Arr[2] != 'City'&&Arr[3] !='State'&&Arr[4] !='Zip'&&Arr[5] !='appointmentTime'&&Arr[6] != 'openWindowTime'&&Arr[7] !='closeWindowTime'&&Arr[7] !='days'){
    console.warn("Csv colum name not match",Tests)
    response={
    'success':false,
    'message':'Csv Colum not proper'
    }
    resolve(response)
    } else{
    ReceiverList.find({consignee:{'$eq':row['Consignee']}}).then((data)=>{
    if(data.length == 0){
    console.info("insert data",data)
    new ReceiverList({
    "consignee":row.Consignee?row.Consignee:'',
    "address":row.Address?row.Address:'',
    "city" :row.City?row.City:'',
    "state":row.State?row.State:'',
    "zip" :row.Zip?row.Zip:'',
    "appointmentTime":row.appointmentTime?row.appointmentTime:'',
    "days":row.days?row.days:'',
    "closeWindowTime":row.closeWindowTime?row.closeWindowTime:'',
    "openWindowTime":row.openWindowTime?row.openWindowTime:''
    }).save()
    }
    })
    console.info("Receiverlist save the data")
    response={
    'success':'true',
    'message':'Successfully inserted Data'
    }
    resolve(response)
    }
    })
    })
    }