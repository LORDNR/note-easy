import jwt from 'jsonwebtoken'
import config from '../config'
import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'

async function sendVerifyEmail(
	email: string,
	customerId: string,
	linkPart: string,
	instructions: string,
	tokenExp: string = '30d',
) {
	const token = jwt.sign(
		{
			customerId: customerId,
		},
		config.environments.SECRET,
		{ expiresIn: tokenExp },
	)

	const text = 'Verify Email'
	const subject = 'Verify your Email'
	// const link = `${config.environments.URL_WEB}${linkPart}?token=${token}`;
	const link = `${config.environments.URL_WEB}${linkPart}/${token}`

	try {
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: config.environments.EMAIL,
				pass: config.environments.PASSWORD,
			},
		})

		let Mailgenerator = new Mailgen({
			theme: 'default',
			product: {
				name: 'Note Easy',
				link: 'http://localhost:5173/',
			},
		})

		//body of the email
		let emails = {
			body: {
				name: email,
				intro: 'Welcome to Note Easy.',
				action: {
					instructions: instructions,
					button: {
						color: '#22BC66', // Optional action button color
						text: text,
						link: link,
					},
				},
				outro:
					"Need help, or have questions? Just reply to this email, we'd love to help.",
			},
		}

		// Generate an HTML email with the provided contents
		let emailBody = Mailgenerator.generate(emails)

		let message = {
			from: config.environments.EMAIL,
			to: email,
			subject: subject,
			html: emailBody,
		}

		//send mail
		await transporter.sendMail(message)
	} catch (error: any) {
		throw error
	}
}

export default sendVerifyEmail
