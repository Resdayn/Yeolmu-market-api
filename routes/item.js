const router = require("express").Router();
const { itemUploadValidation } = require("../validation");
const Item = require("../model/Item");

router.post("/upload", async (request, response) => {
  // Validate request
  const { error } = itemUploadValidation(request.body); // Only the error key is needed
  if (error)
    return response.status(400).send({
      errorStatus: 400,
      errorMessage: `${error.details[0].message}`,
    });

  // Create a new item
  const newItem = new Item({
    username: request.body.username,
    title: request.body.title,
    price: request.body.price,
    photo: request.body.photo,
    details: request.body.details,
  });
 

  try {
    const savedItem = await newItem.save();
    // Send Success Response
    response.send({
      status: 200,
      itemId: savedItem._id,
      username: savedItem.username,
      title: savedItem.title,
      price: savedItem.price,
      photo: savedItem.photo,
      details: savedItem.details,
    });
  } catch (error) {
    response.status(500).send({
      status: 500,
      message: "Unspecified Server Error. Item could not be uploaded",
    });
  }
});

router.get("/get", async (request, response) => {
  try {
    // Get All Items
    const items = await Item.find().sort({createdAt: 'desc'});
    // Send Success Response
    response.send(items);
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: 500,
      message: "Server Error. Items could not be retrieved",
    });
  }
});

router.get("/get/:id", async (request, response) => {
  // Gets all the uploaded by the specified user
  username = request.params.id;
  console.log(username)
  // TODO: Fix the inconsistency username -> id? and implement the commented code below
  // !username &&
  //   response.status(400).send({
  //     status: 400,
  //     message: "User ID was not provided, please log in and try again.",
  //   });

  try {
    const items = await Item.find({ username: username }).sort({
      createdAt: "desc",
    });
    response.send(items);
  } catch (error) {
    console.log(error)
    response.status(500).send({
      status: 500,
      message: "Unspecified Server Error. Items could not be retrieved",
    });
  }
});

module.exports = router;
