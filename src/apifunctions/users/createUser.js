import axios from "axios";
import toast from "react-hot-toast";

export const createUser = async (userData) => {
  if (!userData.email) throw new Error("Email is Required");
  if (!userData.userId) throw new Error("uid is Required");
  if (!userData.fullName) throw new Error("Full Name is Required");

  try {
    console.log("createUser:", userData);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
      {
        userId: userData.userId,
        email: userData.email,
        fullName: userData.fullName,
        photoURL: userData?.photoURL,
      }
    );
    console.log(await response);
    toast.success("User Created");
  } catch (error) {
    toast.error("Error Creating User in DB");
    console.log("ERROR:", error);
  }
};
