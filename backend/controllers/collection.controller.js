import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/customError";
import { Collection } from "../models/collection.schema";

/*
change this comment as in github repo
@Create_Collection
@route htttp://localhost:4000/api/collection
@description User signup controller for creating a new user
@parameters name,emai,password
@return User Object
*/
// export const createCollection = asyncHandler(async (req,res) =>{})

export const createCollection = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new CustomError("Collection name is required", 400);
  }

  // add this name to DB
  const collection = await Collection.create({
    name,
  });
  //    send this response value to frontend
  res.status(200).json({
    success: true,
    message: "Colletion created with success",
    collection,
  });
});

// update collection using mongoose in mongodb
export const updateCollection = asyncHandler(async (re, res) => {
  //get existing value to be updated
  const { id: collectionId } = req.params;
  // id is coming from url

  // new value to get updated
  const { name } = req.body;

//   checking
  if (!name) {
    throw new CustomError("Collection name is required", 400);
  }

  let updatedCollection = await Collection.findByIdAndUpdate(
    collectionId,
    // sending new value
    {
      name,
    },
    // validation
    {
      new: true,
      runValidator: true,
    }
  );

  // IF UPDATECOLLECTION NOT WORKED beacsue of the file absent
  if (!updateCollection) {
    throw new CustomError("Collection not found", 400);
  }

  // send response to frontend
  res.status(200).json({
    success: true,
    message: "collection updated successfully",
    updatedCollection,
  });
});

// Delete collection
export const deleteCollection = asyncHandler(async (req, res) => {
  const { id: collectionId } = req.params;

  const collectionToDelete = await Collection.findByIdAndDelete(collectionId)(
    collectionId
  );

  // IF UPDATECOLLECTION NOT WORKED beacsue of the file absent
  if (!collectionToDelete) {
    throw new CustomError("Collection not found", 400);
  }

//   to free up the memory
  collectionToDelete.remove();
  // collectionToDelete.delete()

  // send response to frontend
  res.status(200).json({
    success: true,
    message: "collection deleted successfully",
    // collectionToDelete
  });
});


// to get collection lists
export const getAllCollections = asyncHandler (async(req,res) => {
    const collection = await Collection.find({})

    if (!collection){
        throw new CustomError ("No Collection Found", 400)

    }

    res.status(200).json({
        success:true,
        collections

    })

})