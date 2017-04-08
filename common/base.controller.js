let handleError = (res, err)=>{
    handleInternalError(res,err)
}

let handleBadRequestError = function(res, message, err){
    res.status(400).send({
        message:message,
        error:error
})
}

let handleInternalError = function(res, message, err){
    res.status(500).send({
         message:message,
         error:err
    })
}

let createErrorHandler = (res, message)=>{
    return (err)=>{
        console.error(err);
        handleError(res, message ,err)
    }
}

let createDataHandler = (res)=>{
    return (data)=>{
       res.status(200).json(data);
    }
}

module.exports = {
    handleInternalError:handleInternalError,
    handleError:handleError,
    handleBadRequestError:handleBadRequestError,
    createDataHandler:createDataHandler,
    createErrorHandler:createErrorHandler
}