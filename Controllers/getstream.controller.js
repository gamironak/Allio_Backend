import dotenv from "dotenv";
import { StreamClient } from "@stream-io/node-sdk";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

// Initialize StreamClient
const apiKey = process.env.GETSTREAM_API_KEY;
const apiSecret = process.env.GETSTREAM_API_SECRET;
const client = new StreamClient(apiKey, apiSecret);

const addUserToGetStream = async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNo } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: "firstName, lastName, and email are required",
      });
    }

    // Generate a unique UUID for GetStream user ID
    const streamUserId = uuidv4();

    // Combine first and last name
    const fullName = `${firstName} ${lastName}`;

    // Prepare user data for GetStream
    const streamUserData = {
      id: streamUserId,
      name: fullName,
      custom: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        mobileNo: mobileNo || null,
      },
      role: "user",
    };

    // Add user to GetStream
    await client.upsertUsers([streamUserData]);

    res.status(201).json({
      success: true,
      message: "User added to GetStream successfully",
      userId: streamUserId,
      userData: {
        streamUserId,
        name: fullName,
        email: email,
      },
    });
  } catch (error) {
    console.error("Error adding user to GetStream:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add user to GetStream",
      error: error.message,
    });
  }
};

const getTokenToGetStream = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Generate token for the user - use createToken instead of createUserToken
    const token = client.createToken(userId);

    res.status(200).json({
      success: true,
      token,
      userId,
    });
  } catch (error) {
    console.error("Error generating user token:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate user token",
      error: error.message,
    });
  }
};

export { addUserToGetStream, getTokenToGetStream };
