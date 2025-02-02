const jwt = require('jsonwebtoken')


const authenticate   = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'thesecrettoken')

        req.user = decode
        next()
    }
    catch(error){
        if(error.name == "TokenExpiredError"){
        res.status(401).json({
            message: 'Token epiré!'
        })
    }else{
        res.json({
            message: 'Authentification echoué!'
        })
        
    }
}
}

module.exports = authenticate