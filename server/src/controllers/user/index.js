import { User } from "../../models/User";

export const getAllusers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ message: `List of Users`, data: allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ collegeid: req.body.collegeid });
    if (!user) {
      res.status(404).json({ message: `user not found` });
    }
    res.status(200).json({ message: `user`, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { collegeid, ...data } = req.body;
    const user = await User.findOneAndUpdate({
      collegeid: req.body.collegeid,
      data,
    });
    if (!user) {
      res.status(404).json({ message: `user not found` });
    }
    res.status(200).json({ message: `updated user`, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};
export const deleteUser = async (req, res) => {
  const { collegeid } = req.body;
  try {
    const response = await Collection.findOneAndDelete({ collegeid });
    if (response) res.status(200).json({ message: `user deleted succesfully` });
    else res.status(404).json({ message: `user not found` });

    return response;
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
};