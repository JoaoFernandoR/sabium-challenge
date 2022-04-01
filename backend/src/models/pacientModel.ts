import mongoose from "mongoose";
import validator from "validator";
import { cpf } from "cpf-cnpj-validator";

const pacientSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            trim: true,
            required: [true, "Por favor, digite um nome"],
            minlength: [5, "O nome precisa ter mais de 5 caracteres"],
            maxlength: [40, "O nome precisa ter menos de 40 caracteres"],
        },
        email: {
            type: String,
            required: [true, "Precisa ser um e-mail válido"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Precisa ser um e-mail válido"],
        },
        cpf: {
            type: String,
            required: [true, "CPF precisa ser válido"],
            unique: [true, "Esse CPF já está cadastrado no sistema"],
            validate: {
                validator: function (val: string) {
                    return cpf.isValid(val);
                },
                message: "Por favor insira um CPF válido",
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
