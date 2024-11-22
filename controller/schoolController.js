const schoolService = require('../service/schoolService');
const { schoolSchema } = require('../validators/schoolValidator');

const addSchool = async (req, res) => {
    const { error } = schoolSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Validation error',
            details: error.details[0].message,
        });
    }

    const { name, address, latitude, longitude } = req.body;

    try {
        const result = await schoolService.addSchool(name, address, latitude, longitude);
        res.status(201).json({ message: 'School added successfully!', schoolId: result.insertId });
    } catch (err) {
        console.error('Error adding school:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Latitude and longitude are required." });
        }

        const userLat = parseFloat(latitude);
        const userLng = parseFloat(longitude);

        if (isNaN(userLat) || isNaN(userLng)) {
            return res.status(400).json({ error: "Invalid latitude or longitude values." });
        }

        const schools = await schoolService.getSchoolsSortedByProximity(userLat, userLng);

        return res.status(200).json({ success: true, schools });
    } catch (error) {
        console.error("Error in listSchools controller:", error.message);
        return res.status(500).json({ error: "An internal server error occurred." });
    }
};



module.exports = { addSchool, listSchools };
