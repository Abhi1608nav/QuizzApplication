const mongoose = require('mongoose');
const JOI = require('joi');

const graphSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    GraphicalPoints: [
        {
            quizID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'quizzes',
                required: true,
            },
            attempts: [
                {
                    examDate: {
                        type: Date,
                        required: true,
                    },
                    obtainedMark: {
                        type: Number, // Marks for this specific attempt
                        required: true,
                    },
                    totalMark: {
                        type: Number,
                        required: true,
                    },
                },
            ],
        },
    ],
});

const Graph = mongoose.model('Graph', graphSchema);

// JOI Validation
const graphValidation = (data) => {
    const schema = JOI.object({
        userID: JOI.string().required(),
        GraphicalPoints: JOI.array()
            .items(
                JOI.object({
                    quizID: JOI.string().required(),
                    attempts: JOI.array()
                        .items(
                            JOI.object({
                                examDate: JOI.date().required(),
                                obtainedMark: JOI.number().min(0).required(),
                                totalMark: JOI.number().min(1).required(),
                            })
                        )
                        .required(),
                })
            )
            .required(),
    });

    return schema.validate(data, { abortEarly: false });
};

module.exports = { Graph, graphValidation };
