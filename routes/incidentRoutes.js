const express = require("express");
const Incident = require("../models/Incident");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create incident
router.post("/", authMiddleware, async (req, res) => {
    try {
        const incident = await Incident.create({
            ...req.body,
            studentId: req.user.id
        });

        // Send real-time notification
        const io = req.app.get("io");

        if (io) {
            io.emit("newIncident", incident);
        }

        res.status(201).json(incident);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all incidents
router.get("/", authMiddleware, async (req, res) => {
    try {
        const incidents = await Incident.find()
            .populate("studentId", "name email")
            .populate("assignedTo", "name email");

        res.json(incidents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get one incident
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({
                message: "Incident not found"
            });
        }

        res.json(incident);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update incident status
router.put("/:id/status", authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;

        const incident = await Incident.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!incident) {
            return res.status(404).json({
                message: "Incident not found"
            });
        }

        const io = req.app.get("io");

        if (io) {
            io.emit("incidentStatusUpdated", incident);
        }

        res.json(incident);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Assign security
router.put("/:id/assign", authMiddleware, async (req, res) => {
    try {
        const { assignedTo } = req.body;

        const incident = await Incident.findByIdAndUpdate(
            req.params.id,
            {
                assignedTo,
                status: "assigned"
            },
            { new: true }
        );

        if (!incident) {
            return res.status(404).json({
                message: "Incident not found"
            });
        }

        const io = req.app.get("io");

        if (io) {
            io.emit("incidentAssigned", incident);
        }

        res.json(incident);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;