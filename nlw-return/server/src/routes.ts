import { Router } from "express";
import { FeedbackController } from "./controllers/feedback";

const feedbackController = new FeedbackController()

export const routes = Router()

routes.post('/feedbacks', feedbackController.create)