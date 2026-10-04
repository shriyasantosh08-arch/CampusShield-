const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        incidentType: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            default: "medium"
        },

        photo: {
            type: String,
            default: ""
        },

        location: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["reported", "assigned", "in-progress", "resolved"],
            default: "reported"
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Incident", incidentSchema);