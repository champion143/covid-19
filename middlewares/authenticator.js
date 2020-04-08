const jwt = require('jsonwebtoken');
// module.exports.userAuthenticator = (req, res, next) => {
//     if (req.user) {
//         const id = req.user.id;
//         const role_id = req.user.role_id;
//         if(role_id == 3 || role_id == 2){
//             const check = `select * from registration where id = '${id}'`;
//             client.query(check, (err, checkress) => {
//                 if(err){
//                     message:'somthing went wrong'
//                 }else{
//                     if(checkress.rows == ''){
//                         return res.status(401).json({
//                             message: 'Deleted by someone'
//                         });
//                     }
                    
//                 }
//             })
//         }else if(role_id == 4){
//             const check = `select * from user_entery where user_id = '${id}'`;
//             client.query(check, (err, checkress) => {
//                 if(err){
//                     message:'somthing went wrong'
//                 }else{
//                     if(checkress.rows == ''){
//                         return res.status(401).json({
//                             message: 'Deleted by someone'
//                         });
//                     }
                    
//                 }
//             })
//         }
//     }else{
//         return res.status(401).json({
//             message: 'User is not Authenticated'
//         });
//     } 
//     if (req.user && (req.user.exp < (new Date().getTime() / 1000))) {
//         return res.status(Forbidden).json({
//             message: 'User Token Expire'
//         });
//     } else {
//         next()
//     }
// };

module.exports.userAuthenticator = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            return jwt.verify(token, 'secret', (err, userData) => {
                if (err) {
                    res.status(403).json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    req.user = {
                        id: userData.id,
                        mobile:userData.mobile,
                        email:userData.email,
                        token: token,
                        exp: userData.exp
                    }
                    return next();
                }
                
            });
        }
        console.log('dfsasa')
        return res.unauthorized();
    }
    res.status(403).json({
        success: false,
        message: 'No token provided.'
    });
    
};