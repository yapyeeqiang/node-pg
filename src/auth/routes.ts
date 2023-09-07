import { Router } from "express";
import { checkPassword, encryptPassword } from "../../utils/password";
import { UserController } from "../user/controller";
import { generateToken } from "../../utils/jwt";

const router = Router();

const userController = new UserController();

router.post("/login", async (req, res) => {
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

    const user = await userController.findOneByEmail(email);

    if (!user) {
      res.status(403).json({
        error: "Login failed.",
      });

      return;
    }

    const isPasswordCorrect = await checkPassword(password, user.password);

    if (!isPasswordCorrect) {
      res.status(403).json({
        error: "Login failed.",
      });

      return;
    }

    const accessToken = generateToken(user);

    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.post("/register", async (req, res) => {
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
      error,
    });
  }
});

export default router;
