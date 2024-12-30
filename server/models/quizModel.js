const mongoose = require('mongoose');
const JOI = require('joi');

// Mongoose Schema for Quiz
const quizSchema = mongoose.Schema({
    quizName: { type: String, required: true },
    description: { type: String, required: true },
    quizQuestionArray: [
        {
            question: { type: String, required: true },
            options: {
                type: [String],
                validate: {
                    validator: (v) => v.length === 4, // Ensure 4 options are provided
                    message: 'A question must have exactly 4 options.',
                },
            },
            correctOption: { type: String, required: true },
            explanation: { type: String },
            questionImg: { type: String },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String },
});

// JOI Validation Schema
const quizValidation = (data) => {
    const schema = JOI.object({
        quizName: JOI.string().required().messages({
            'string.empty': 'Quiz name is required.',
        }),
        description: JOI.string().required().messages({
            'string.empty': 'Description is required.',
        }),
        quizQuestionArray: JOI.array()
            .items(
                JOI.object({
                    question: JOI.string().required().messages({
                        'string.empty': 'Question is required.',
                    }),
                    options: JOI.array()
                        .items(JOI.string())
                        .length(4)
                        .required()
                        .messages({
                            'array.length': 'Each question must have exactly 4 options.',
                        }),
                    correctOption: JOI.string().required().messages({
                        'string.empty': 'Correct option is required.',
                    }),
                    explanation: JOI.string().allow(null, '').messages({
                        'string.base': 'Explanation must be a string.',
                    }),
                    questionImg: JOI.string().uri().allow(null, '').messages({
                        'string.uri': 'Question image must be a valid URL.',
                    }),
                })
            )
            .required()
            .messages({
                'array.base': 'Quiz questions must be an array.',
                'array.empty': 'Quiz must have at least one question.',
            }),
        createdBy: JOI.string().optional(),
    });

    return schema.validate(data, { abortEarly: false }); // `abortEarly: false` gives all validation errors
};

// Exporting the Model and Validation Function
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = {
    Quiz,
    quizValidation,
};
