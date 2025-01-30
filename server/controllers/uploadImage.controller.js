const uploadImageController = (request,response)=>{
    try {
        const file = request.file
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export default uploadImageController