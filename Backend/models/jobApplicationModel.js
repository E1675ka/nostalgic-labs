import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true
    },

    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
        required: true
    },
    resumePath: {
        type: String,
        required: true
    },
    resumeText: {
        type: String,
        required: true
    },
    appliedOn: {
        type: Date,
        default: Date.now
    }
});
const Application = mongoose.model("Application", jobApplicationSchema);
export default Application;