import { Router } from "express";
import { UserController } from "./controller";
import { encryptPassword } from "../utils/password";

const router = Router();
const userController = new UserController();

router.get("/", async (req, res) => {
  try {
    const users = await userController.all();

    if (!users) {
      res.status(404).json({
        message: "No users found.",
      });

      return;
    }

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await userController.one(id);

    if (!user) {
      res.status(404).json({
        message: `User ${id} is not found.`,
      });

      return;
    }

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      res.status(400).json({
        error: "Please provide a valid email.",
      });

      return;
    }

    if (!password || typeof password !== "string") {
      res.status(400).json({
        error: "Please provide a valid password.",
      });

      return;
    }

    const hashedPassword = await encryptPassword(password);

    const user = await userController.save({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Successfully created a new user.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await userController.remove(id);

    if (!user) {
      res.status(404).json({
        message: `User ${id} is not found.`,
      });

      return;
    }

    res.status(200).json({
      message: `Successfully deleted user ${id}.`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

export default router;
