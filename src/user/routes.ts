import { Router } from "express";
import { UserController } from "./controller";

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
  const { name, email, age } = req.body;

  try {
    if (!name || typeof name !== "string") {
      res.status(400).json({
        error: "Please provide a valid name.",
      });

      return;
    }

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

    if (!age || typeof age !== "number") {
      res.status(400).json({
        error: "Please provide a valid age.",
      });

      return;
    }

    const user = await userController.save({ name, email, age });

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
