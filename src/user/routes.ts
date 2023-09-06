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
    const user = await userController.findOneByID(id);

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
