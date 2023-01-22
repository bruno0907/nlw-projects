import { Request, Response } from "express"
import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter"
import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedback"
import { SubmitFeedbackUseCase } from "../use-cases/submit-feedback"

export class FeedbackController {  
  create = async (req: Request, res: Response) => {    
    try {
      const { type, comment, screenshot } = req.body
  
      if(!type) { 
        return res.status(400).json({ message: 'Type is required!' })
      }
  
      if(!comment) {
        return res.status(400).json({ message: 'Comment is required!' })
      }
  
      if(screenshot && !screenshot?.startsWith('data:image/png;base64')) { 
        return res.status(400).json({ message: 'Screenshot format is invalid!' })
      }
    
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
      
    } catch (error: any) {
      return res.status(500).json({ error: error.message })

    }
  
  }
}