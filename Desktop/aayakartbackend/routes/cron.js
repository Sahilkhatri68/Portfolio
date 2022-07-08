const cron = require("node-cron");
const nodemailer = require("nodemailer");

async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "dauswap.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "info@dauswap.com", // generated ethereal user
      pass: "Harsh@Singh8576", // generated ethereal password
    },
  });
  const date = new Date();
  //Get second
  const second = date.getSeconds();
  //Get minute
  const minute = date.getMinutes();
  //Get hour
  const hour = date.getHours();
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <dauswap.com>', // sender address
    to: "mecovox378@sueshaw.com", // list of receivers
    subject: `${second}/${minute}/${hour}`, // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

cron.schedule("*/10 * * * * *", () => {
  main();
});
