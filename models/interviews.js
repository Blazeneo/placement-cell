const mongoose = require('mongoose');


const interviewSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    students: [
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'StudentInterview',
            },
            name: {
                type: String,
                required: true,
            },
            result: {
                type: String,
                enum: ['PASS', 'FAIL', 'On Hold', 'Didn’t Attempt'],
                required: true,
            },
        },
    ],
});

const Interviews = mongoose.model('Interview', interviewSchema);


module.exports= Interviews;