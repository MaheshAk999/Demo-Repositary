const registrations = require('../Models/registrations.js');

exports.register = async (req, res, next) => {
    try {
        const { event_names, state, email, year_of_study, branch, college, others, student_name, whatsapp_number } = req.body;

        const user = await registrations.findOne({ email });

        if (user) {
            const newEvents = event_names.filter(event => !user.event_names.includes(event));
            
            if (newEvents.length > 0) {
                await registrations.updateOne(
                    { email },
                    { $push: { 'event_names': { $each: newEvents } } }
                );

                req.en = newEvents; 
            } else {
                req.en = []; 
                return res.status(200).send({ status: false, msg: 'You are already registered for these events. Please choose different events to register.' });            }
            req.id = user._id;
        } else {
            const newUser = new registrations({
                event_names,
                year_of_study,
                branch,
                email,
                college,
                others,
                student_name,
                whatsapp_number,
                state,
                registration_date: new Date()
            });

            const savedUser = await newUser.save();
            req.en = event_names;
            req.id = savedUser._id;
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, msg: err.message });
    }
};
