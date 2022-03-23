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
    const items = await Item.find();
    // Send Success Response
    response.send(items);
  } catch (error) {
    response.status(500).send({
      status: 500,
      message: "Unspecified Server Error. Items could not be retrieved",
    });
  }
});

module.exports = router;
