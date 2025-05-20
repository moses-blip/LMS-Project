const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Assignment = sequelize.define('Assignment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    totalPoints: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    submissionType: {
        type: DataTypes.ENUM('file', 'text', 'both'),
        defaultValue: 'file'
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    attachments: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

module.exports = Assignment; 