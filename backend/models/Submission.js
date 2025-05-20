const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Submission = sequelize.define('Submission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    files: {
        type: DataTypes.JSON,
        allowNull: true
    },
    submittedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('submitted', 'graded', 'late'),
        defaultValue: 'submitted'
    },
    feedback: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Submission; 