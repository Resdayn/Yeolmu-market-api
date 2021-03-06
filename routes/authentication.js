// Routes for both Login and Register endpoints

const router = require("express").Router();
const { registerValidation, loginValidation } = require("../validation");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");

router.post("/register", async (request, response) => {
  // Validate request
  const { error } = registerValidation(request.body); // Only the error key is needed
  if (error)
    return response.status(400).send({
      errorStatus: 400,
      errorMessage: `${error.details[0].message}`,
    });

  // Validate email duplication
  const emailExists = await User.findOne({ email: request.body.email });
  if (emailExists)
    return response.status(400).send({
      errorStatus: 400,
      errorMessage: "Email already exists",
    });

  // HASH Password
  const hashedPassword = await bcrypt.hash(request.body.password, 10);

  // Create a new user
  const newUser = new User({
    username: request.body.username,
    email: request.body.email,
    password: hashedPassword,
    avatar: request.body.image
  });
  try {
    const savedUser = await newUser.save();

    // Send Response
    response.send({
      status: 200,
      username: savedUser.username,
    });
  } catch (error) {
    response.status(500).send({
      errorStatus: 500,
      errorMessage: "Unspecified Server Error. User could not be created",
    });
  }
});

router.post("/login", async (request, response) => {
  // Validate request
  const { error } = loginValidation(request.body); // Only the error key is needed
  if (error)
    return response.status(400).send({
      errorStatus: 400,
      errorMessage: `${error.details[0].message}`,
    });

  // Check if email exists in the DB
  const user = await User.findOne({ email: request.body.email });
  if (!user)
    return response.status(400).send({
      errorStatus: 400,
      errorMessage: "The entered email does not exist",
    });

  // Check if password is correct
  const isPasswordValid = await bcrypt.compare(
    request.body.password,
    user.password
  );
  if (!isPasswordValid)
    return response.status(400).send({
      errorStatus: 400,
      errorMessage: "The entered password does not match. Please try again",
    });
  // Create JWT Token & attach it to header
  const jwtToken = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
  response.header('auth-token', jwtToken);
  // Send Response
  response.send({
    status: 200,
    userId: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    token: jwtToken,
    avatar: user.avatar
  });
});

router.post("/autologin", verifyToken, async (request, response) => {
  // If the code reaches this point, the token has been then verified
  const userId = request.user._id;

  // Find the correct user
  const user = await User.findOne({ _id: userId });

  // Generate another token
  const jwtToken = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
  
  // Send the user data to the frontend
  response.send({
    status: 200,
    userId: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    token: jwtToken,
    avatar: user.avatar
  });
});

module.exports = router;
