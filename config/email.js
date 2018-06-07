//config/email.js
module.exports.email = {
    service: "Mailgun",
    auth: {
        user: "postmaster@sandboxc57543be10d540989707c9dd2ed842f7.mailgun.org",
        pass: "arpa1996,"
    },
    templateDir: "view/emailTemplates/sendEmail",
    testMode: false,
    ssl: true
}