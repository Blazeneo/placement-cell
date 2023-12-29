

const mongoose = require('mongoose');









// Define main schema for Student Interviews
const studentInterviewSchema = new mongoose.Schema({
    
    batch: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['placed', 'not_placed'],
        required: true,
    }, dsaFinalScore: {
        type: Number,
        required: true,
    },
    webDFinalScore: {
        type: Number,
        required: true,
    },
    reactFinalScore: {
        type: Number,
        required: true,
    },
    
    
});

// Create a model based on the schema
const StudentInterview = mongoose.model('StudentInterview', studentInterviewSchema);

module.exports = StudentInterview;