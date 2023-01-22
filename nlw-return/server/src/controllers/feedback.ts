import { Request, Response } from "express"
import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter"
import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedback"
import { SubmitFeedbackUseCase } from "../use-cases/submit-feedback"

export class FeedbackController {  
  create = async (req: Request, res: Response) => {
    const { type, comment, screenshot } = req.body
  
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()  
    const nodemailerMailAdapter = new NodemailerMailAdapter()    
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    )
  
    await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot
    })
  
    return res.status(201).send()
  }
}