import { createUser } from "../repositories/userRepo";

export function loginUser(req, res) {}
export async function registerUser(req, res) {
  try {
    let newUser = await createUser(req.body.user);
    res.status(201).send(newUser);
  } catch (error) {
    if (error.error === "Validation Error") {
      res.status(400).send({ error: error.payload });
    } else if (error.error === "Unique Field Error") {
      res.status(409).send({ error: error.payload });
    } else {
      res.status(500).send({ msg: "Unhandled Error" });
    }
  }
}
