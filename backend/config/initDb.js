const sequelize = require('./database');
const { User, Course, Assignment, Submission, Grade } = require('../models');

const initDb = async () => {
    try {
        // Sync all models with database
        await sequelize.sync({ force: true });
        console.log('Database synced successfully');

        // Create admin user
        await User.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin'
        });

        console.log('Admin user created successfully');
        console.log('Database initialization completed');
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
};

// Run if this file is executed directly
if (require.main === module) {
    initDb();
}

module.exports = initDb; 