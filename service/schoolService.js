const db = require('../config/config');

const addSchool = async (name, address, latitude, longitude) => {
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const result = await db.execute(query, [name, address, latitude, longitude]);
    return result;
};

const getSchoolsSortedByProximity = async (latitude, longitude) => {
    try {
        const query = `
        SELECT id, name, address, latitude, longitude,
               (6371 * acos(
                 cos(radians(?)) 
                 * cos(radians(latitude)) 
                 * cos(radians(longitude) - radians(?)) 
                 + sin(radians(?)) 
                 * sin(radians(latitude))
               )) AS distance
        FROM schools
        ORDER BY distance ASC;
      `;

        const [results] = await db.execute(query, [latitude, longitude, latitude]);
        return results;
    } catch (error) {
        console.error("Error in getSchoolsSortedByProximity service:", error.message);
        throw error;
    }
};

module.exports = { addSchool, getSchoolsSortedByProximity };


