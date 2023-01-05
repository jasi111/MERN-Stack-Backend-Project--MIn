import s3 from "../config/s3.config.js"


// method to upload images to AWS by passign paramters -bucketname,key and body
export const s3FileUpload = async({bucketName,key,body})=>{
    return await s3.upload({
        Bucket:bucketName,
        Key:key,
        Body:body,
        ContentType:contentType
        // content type means jpg, png etc..
    
    })
    .promise()

}

export const deleteFile = async ({bucketName})=>{
    return await s3.deleteObject({
    // aws treat everything as object like image, any file

        Bucket:bucketName,
        Key:key
    })
       
    .promise()
}
