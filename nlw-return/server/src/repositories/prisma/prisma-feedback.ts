import { prisma } from "../../config/prisma";
import { FeedbacksRepository, FeedbackCreateData } from "../Feedbacks";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    })
  };
}