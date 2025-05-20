const User = require('./User');
const Course = require('./Course');
const Assignment = require('./Assignment');
const Submission = require('./Submission');
const Grade = require('./Grade');

// User-Course associations (Enrollments)
User.belongsToMany(Course, { through: 'Enrollments' });
Course.belongsToMany(User, { through: 'Enrollments' });

// Course-Assignment associations
Course.hasMany(Assignment);
Assignment.belongsTo(Course);

// User-Assignment associations (for lecturers)
User.hasMany(Assignment, { as: 'CreatedAssignments' });
Assignment.belongsTo(User, { as: 'Creator' });

// Assignment-Submission associations
Assignment.hasMany(Submission);
Submission.belongsTo(Assignment);

// User-Submission associations
User.hasMany(Submission);
Submission.belongsTo(User);

// Submission-Grade associations
Submission.hasOne(Grade);
Grade.belongsTo(Submission);

// User-Grade associations (for graders)
User.hasMany(Grade, { as: 'GivenGrades' });
Grade.belongsTo(User, { as: 'Grader' });

module.exports = {
    User,
    Course,
    Assignment,
    Submission,
    Grade
}; 