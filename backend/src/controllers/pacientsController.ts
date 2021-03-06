import { Request, Response, NextFunction } from "express";
// Models
import Pacient from "../models/pacientModel";

export const getAllPacients = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const Result = await Pacient.find().select("-__v").sort("+_id");

        response.status(200).json({
            status: "success",
            data: Result,
        });
    } catch (err: any) {
        response.status(400).json({
            status: "Failure",
            message: err.message,
            code: err.code,
        });
    }
};

export const createPacient = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const { nome, email, cpf, dataNascimento } = request.body;

        function getAge(birthDayDateString: string) {
            const from = birthDayDateString.split("/");
            const birthdateTimeStamp = new Date(
                parseInt(from[2]),
                parseInt(from[1]) - 1,
                parseInt(from[0])
            );

            const today = new Date();

            var age = today.getFullYear() - birthdateTimeStamp.getFullYear();

            const month = today.getMonth() - birthdateTimeStamp.getMonth();

            if (
                month < 0 ||
                (month == 0 && today.getDate() < birthdateTimeStamp.getDate())
            ) {
                age = age - 1;
            }

            return age;
        }
        const calculatedAge = getAge(dataNascimento);

        const newPacient = await Pacient.create({
            nome,
            email,
            cpf,
            dataNascimento,
            idade: calculatedAge,
        });

        response.status(200).json({
            status: "success",
            data: newPacient,
        });
    } catch (err: any) {
        response.status(400).json({
            status: "Failure",
            message: err.message,
            code: err.code,
        });
    }
};

export const deletePacient = async (request: Request, response: Response) => {
    try {
        await Pacient.findByIdAndRemove(request.body.id);
        const result = await Pacient.find().select("-__v").sort("+_id");

        response.status(200).json({
            status: "success",
            data: result,
        });
    } catch (err: any) {
        if (err.name === "CastError") {
            response.status(400).json({
                status: "failure",
                message: `Can't find ${request.originalUrl}. Invalid path`,
            });
        }

        response.status(400).json({
            status: "failure",
            message: err.message,
            name: err.name,
        });
    }
};

export const updatePacient = async (request: Request, response: Response) => {
    try {
        const sentData = request.body;

        await Pacient.findByIdAndUpdate(request.params.id, sentData, {
            new: true,
            runValidators: true,
        });
        const result = await Pacient.find().select("-__v").sort("+_id");

        return response.status(200).json({
            status: "success",
            data: result,
        });
    } catch (err) {
        return response.status(400).json({
            status: "failure",
            message: err,
        });
    }
};
