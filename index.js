//This code is hosted on this URL >>> https://i-want-to-join-ideta.herokuapp.com

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Joi = require('joi');

const Ideta = "A software that automates conversations thanks to a great team !";

const valid_candidacy = Joi.object({
    first_name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    last_name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    visited_ideta_website: Joi.boolean().valid(true).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io'] } }).required(),
    abilities: Joi.array().items(Joi.string()).required(),
    extra_professional_activities: Joi.array().items(Joi.string()).required(),
    location: Joi.string().required(),
    what_is_ideta: Joi.string().valid(Ideta).required()
})

app.use(express.json());

app.get('/', (req, res) => {
	res.send('It\'s a good first step, you should read further...');
})

app.post('/apply', (req, res) => {
	try {
		const candidate = req.body;
		if (!valid_candidacy.validate(candidate).error) {
			if (candidate.abilities.includes('Angular 2+') &&
				candidate.abilities.includes('SCSS') &&
				candidate.abilities.includes('HTML')) {
				if (candidate.location === 'Paris' ||
					candidate.location === 'Remote') {
					if (candidate.extra_professional_activities.includes('footbAll') ||
						candidate.extra_professional_activities.includes('Supporting Barcelona')) {
						res.send('You are a great fit to this company. \nSend me a mail at : ' +
							("yanis+" + process.env.THEY_DID_NOT_CHEAT + "@ideta.io" || "yanis+INeedATipPlease@ideta.io"));
					} else {
						res.send('Have you ever considered playing football or supporting Barcelona ;-) ?\n' +
							'Send me a mail at : ' +
							("yanis+" + process.env.THEY_DID_NOT_CHEAT_BUT_NO_FOOTBALL + "@ideta.io" ||
								"yanis+whatisthepasscode@ideta.io"));
					}
				} else {
					res.send('Are you sure you want to apply ? \n' +
						'Send me an email at : ' + ("yanis+" + process.env.NOT_PARIS_NOT_REMOTE + "@ideta.io" || "yanis+INeedATipPlease@ideta.io"));
				}
			} else {
				res.send('Even though this is some backend code, we are looking for a frontend developer !\n' +
					'If you really want to work with us, send us a mail at contact@ideta.io.\n' +
					'We will have other open positions soon !');
			}
		} else {
			res.send('Thanks for trying to apply ! But your candidacy does not match our requirements.\n' +
				'Check our requirements and try again :-) ');
		}
	} catch(error) {
		console.log(JSON.stringify(error));
		res.send("What they tried to crash the server and make me look like a fool and get extra attention... : " +
			JSON.stringify(error));
	}

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
