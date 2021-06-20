import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
  async create(request: Request, response: Response) {
    const {name, email} = request.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required()
    });

    // If ou Try/Catch fazendo a mesma validação 
    // if(!(await schema.isValid(request.body))) {
    //   return response.status(400).json({error: "Validation Failed!"});
    // }

    try {
      await schema.validate(request.body, {abortEarly: false})
    } catch (err) {
      throw new AppError(err);
      // return response.status(400).json({error: err});
    }

    const usersRespository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRespository.findOne({
      email,
    });

    if(userAlreadyExists) {
      throw new AppError("User already exists!");
      // return response.status(400).json({
      //   error: "User already exists!",
      // });
    }
    
    const user = usersRespository.create({
      name, email

    });

    await usersRespository.save(user);

    return response.status(201).json(user);

  }
}

export { UserController };
