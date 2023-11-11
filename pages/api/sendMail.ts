import { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY || "");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, message } = req.body;

  const content = {
    to: "emonhasan20002000@gmail.com",
    from: {
      name: "Hello portfolio",
      email: "shehabhasan2020@gmail.com",
    },
    subject: `New Message from ${email} via the contact form`,
    text: message,
    html: `<p>${message}</p>`,
  };

  try {
    await sgMail.send(content);
    res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.log("ERROR ", error);
    res.status(400).send("Message not sent.");
  }
};
