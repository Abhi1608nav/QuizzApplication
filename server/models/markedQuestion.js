const mongoose = require('mongoose');
const JOI = require('joi');

const markedQuestionSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    bookMarkQuestions: [
        {
            quizID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'quizzes',
                required: true,
            },
            questions: [
                {
                    question: {
                        type: String,
                        required: true,
                    },
                    options: {
                        type: [String],
                        required: true,
                    },
                    correctOption: {
                        type: String,
                        required: true,
                    },
                    explanation: {
                        type: String,
                        default: '', // Explanation may not always be provided
                    },
                    questionImg: {
                        type: String, // Optional question image
                    },
                    bookmarkDate: {
                        type: Date,
                        default: Date.now, // Auto-populates when the question is bookmarked
                    },
                    note: {
                        type: String, // Optional user note about the question
                        maxlength: 500, // Restrict length to prevent excessive text
                    },
                },
            ],
        },
    ],
});

// JOI Validation
const markedQuestionValidation = (data) => {
    const schema = JOI.object({
        userID: JOI.string().required(),
        bookMarkQuestions: JOI.array()
            .items(
                JOI.object({
                    quizID: JOI.string().required(),
                    questions: JOI.array()
                        .items(
                            JOI.object({
                                question: JOI.string().required(),
                                options: JOI.array().items(JOI.string().required()).min(2).required(), // At least 2 options
                                correctOption: JOI.string().required(),
                                explanation: JOI.string().allow('').optional(),
                                questionImg: JOI.string().uri().optional(),
                                bookmarkDate: JOI.date().optional(),
                                note: JOI.string().max(500).optional(),
                            })
                        )
                        .required(),
                })
            )
            .required(),
    });

    return schema.validate(data, { abortEarly: false });
};

const MarkedQuestion = mongoose.model('MarkedQuestion', markedQuestionSchema);

module.exports = { MarkedQuestion, markedQuestionValidation };
