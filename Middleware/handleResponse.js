 module.exports= (res,statusCode,status,data)=>
{

    if(statusCode>=400)
    return res.status(statusCode).json({status:status,errorMessage:data})

return res.status(statusCode).json({status:status,data:data})
    
}

