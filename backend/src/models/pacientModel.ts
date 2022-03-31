import mongoose from "mongoose";
import validator from "validator";
import { cpf } from "cpf-cnpj-validator";

const pacientSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            trim: true,
            required: [true, "Please, insert a valid pacientname"],
            minlength: [5, "The name must have more than 5 characters"],
            maxlength: [40, "The name must have less than 40 characters"],
        },
        email: {
            type: String,
            required: [true, "Must have a valid e-mail"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please enter a valid e-mail"],
        },
        cpf: {
            type: String,
            required: [true, "CPF precisa ser válido"],
            unique: [true, "Esse CPF já está cadastrado no sistema"],
            validate: {
                validator: function (val: string) {
                    return cpf.isValid(val);
                },
                message: "Must be a valid CNPJ",
            },
        },
        dataNascimento: {
            type: String,
            trim: true,
        },
        idade: {
            type: Number,
        },
    },
    { timestamps: true }
);

const Pacient = mongoose.model("Pacients", pacientSchema);

export default Pacient;
