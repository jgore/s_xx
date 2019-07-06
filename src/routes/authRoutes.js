import { loginUser, registerUser } from "../controllers/authControllers";

export default router => {
  router.post("/login", loginUser);
  router.post("/register", registerUser);
  return router;
};
