import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";


class SendMailController {
  async execute(request: Request, response: Response) {
    const {email, survey_id} = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userAlreadExists = await usersRepository.findOne({email});

    if(!userAlreadExists) {
      return response.status(400).json({
        error: "user does not exists!"
      });
    }

    const surveyAlreadExist = await surveysRepository.findOne({id: survey_id});

    if(!surveyAlreadExist) {
      return response.status(400).json({
        error: "Survey does not exists!"
      });
    }

    // SAlvar as info na tb_survey_user
    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadExists.id,
      survey_id,
    });
    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);

  }
}

export { SendMailController }