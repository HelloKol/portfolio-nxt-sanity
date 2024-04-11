import { NextApiRequest, NextApiResponse } from "next";
import { env } from "@/utils";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(env.NEXT_PUBLIC_SENDGRID_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, message } = req.body;

  const content = {
    to: "emonhasan20002000@gmail.com",
    from: {
      name: "Portfolio message",
      email: "shehabhasan2020@gmail.com",
    },
    subject: `New Message from ${email}`,
    text: message,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html
      data-editor-version="2"
      class="sg-campaigns"
      xmlns="http://www.w3.org/1999/xhtml"
    >
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        <!--<![endif]-->
        <!--[if (gte mso 9)|(IE)]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG />
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
        <!--[if (gte mso 9)|(IE)]>
          <style type="text/css">
            body {
              width: 600px;
              margin: 0 auto;
            }
            table {
              border-collapse: collapse;
            }
            table,
            td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
            img {
              -ms-interpolation-mode: bicubic;
            }
          </style>
        <![endif]-->
        <style type="text/css">
          body,
          p,
          div {
            font-family: arial, helvetica, sans-serif;
            font-size: 14px;
          }
          body {
            color: #000000;
          }
          body a {
            color: #42ee99;
            text-decoration: none;
          }
          p {
            margin: 0;
            padding: 0;
          }
          table.wrapper {
            width: 100% !important;
            table-layout: fixed;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          img.max-width {
            max-width: 100% !important;
          }
          .column.of-2 {
            width: 50%;
          }
          .column.of-3 {
            width: 33.333%;
          }
          .column.of-4 {
            width: 25%;
          }
          ul ul ul ul {
            list-style-type: disc !important;
          }
          ol ol {
            list-style-type: lower-roman !important;
          }
          ol ol ol {
            list-style-type: lower-latin !important;
          }
          ol ol ol ol {
            list-style-type: decimal !important;
          }
          @media screen and (max-width: 480px) {
            .preheader .rightColumnContent,
            .footer .rightColumnContent {
              text-align: left !important;
            }
            .preheader .rightColumnContent div,
            .preheader .rightColumnContent span,
            .footer .rightColumnContent div,
            .footer .rightColumnContent span {
              text-align: left !important;
            }
            .preheader .rightColumnContent,
            .preheader .leftColumnContent {
              font-size: 80% !important;
              padding: 5px 0;
            }
            table.wrapper-mobile {
              width: 100% !important;
              table-layout: fixed;
            }
            img.max-width {
              height: auto !important;
              max-width: 100% !important;
            }
            a.bulletproof-button {
              display: block !important;
              width: auto !important;
              font-size: 80%;
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
            .columns {
              width: 100% !important;
            }
            .column {
              display: block !important;
              width: 100% !important;
              padding-left: 0 !important;
              padding-right: 0 !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
            .social-icon-column {
              display: inline-block !important;
            }
          }
        </style>
        <!--user entered Head Start-->
    
        <!--End Head user entered-->
      </head>
      <body>
        <center
          class="wrapper"
          data-link-color="#42ee99"
          data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#000000;"
        >
          <div class="webkit">
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              width="100%"
              class="wrapper"
              bgcolor="#000000"
            >
              <tr>
                <td valign="top" bgcolor="#000000" width="100%">
                  <table
                    width="100%"
                    role="content-container"
                    class="outer"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                  >
                    <tr>
                      <td width="100%">
                        <table
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          border="0"
                        >
                          <tr>
                            <td>
                              <!--[if mso]>
        <center>
        <table><tr><td width="600">
      <![endif]-->
                              <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                style="width: 100%; max-width: 600px"
                                align="center"
                              >
                                <tr>
                                  <td
                                    role="modules-container"
                                    style="
                                      padding: 0px 0px 0px 0px;
                                      color: #000000;
                                      text-align: left;
                                    "
                                    bgcolor="#FFFFFF"
                                    width="100%"
                                    align="left"
                                  >
                                    <table
                                      class="module preheader preheader-hide"
                                      role="module"
                                      data-type="preheader"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        display: none !important;
                                        mso-hide: all;
                                        visibility: hidden;
                                        opacity: 0;
                                        color: transparent;
                                        height: 0;
                                        width: 0;
                                      "
                                    >
                                      <tr>
                                        <td role="module-content">
                                          <p>Show What You Know!</p>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      class="module"
                                      role="module"
                                      data-type="spacer"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="table-layout: fixed"
                                      data-muid="vB9TDziyvx65CC2nx3oyRH"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="padding: 0px 0px 20px 0px"
                                            role="module-content"
                                            bgcolor="#000000"
                                          ></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      class="module"
                                      role="module"
                                      data-type="text"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="table-layout: fixed"
                                      data-muid="9c6b060b-bce8-45e0-bd65-ff3e0047b94d"
                                      data-mc-module-version="2019-10-22"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="
                                              padding: 18px 0px 18px 0px;
                                              line-height: 22px;
                                              text-align: inherit;
                                              background-color: #000000;
                                            "
                                            height="100%"
                                            valign="top"
                                            bgcolor="#000000"
                                            role="module-content"
                                          >
                                            <div>
                                              <div
                                                style="
                                                  font-family: inherit;
                                                  text-align: right;
                                                "
                                              >
                                                <span
                                                  style="
                                                    box-sizing: border-box;
                                                    padding-top: 0px;
                                                    padding-right: 0px;
                                                    padding-bottom: 0px;
                                                    padding-left: 0px;
                                                    margin-top: 0px;
                                                    margin-right: 0px;
                                                    margin-bottom: 0px;
                                                    margin-left: 0px;
                                                    font-style: inherit;
                                                    font-variant-ligatures: inherit;
                                                    font-variant-caps: inherit;
                                                    font-variant-numeric: inherit;
                                                    font-variant-east-asian: inherit;
                                                    font-weight: inherit;
                                                    font-stretch: inherit;
                                                    line-height: inherit;
                                                    font-size: 10px;
                                                    vertical-align: baseline;
                                                    border-top-width: 0px;
                                                    border-right-width: 0px;
                                                    border-bottom-width: 0px;
                                                    border-left-width: 0px;
                                                    border-top-style: initial;
                                                    border-right-style: initial;
                                                    border-bottom-style: initial;
                                                    border-left-style: initial;
                                                    border-top-color: initial;
                                                    border-right-color: initial;
                                                    border-bottom-color: initial;
                                                    border-left-color: initial;
                                                    border-image-source: initial;
                                                    border-image-slice: initial;
                                                    border-image-width: initial;
                                                    border-image-outset: initial;
                                                    border-image-repeat: initial;
                                                    letter-spacing: normal;
                                                    orphans: 2;
                                                    text-align: right;
                                                    text-indent: 0px;
                                                    text-transform: none;
                                                    white-space: pre-wrap;
                                                    widows: 2;
                                                    word-spacing: 0px;
                                                    -webkit-text-stroke-width: 0px;
                                                    text-decoration-thickness: initial;
                                                    text-decoration-style: initial;
                                                    text-decoration-color: initial;
                                                    font-family: arial, helvetica,
                                                      sans-serif;
                                                    color: #ffffff;
                                                  "
                                                  >Email not displaying correctly? </span
                                                ><a href="{{Weblink}}"
                                                  ><span
                                                    style="
                                                      box-sizing: border-box;
                                                      padding-top: 0px;
                                                      padding-right: 0px;
                                                      padding-bottom: 0px;
                                                      padding-left: 0px;
                                                      margin-top: 0px;
                                                      margin-right: 0px;
                                                      margin-bottom: 0px;
                                                      margin-left: 0px;
                                                      font-style: inherit;
                                                      font-variant-ligatures: inherit;
                                                      font-variant-caps: inherit;
                                                      font-variant-numeric: inherit;
                                                      font-variant-east-asian: inherit;
                                                      font-weight: inherit;
                                                      font-stretch: inherit;
                                                      line-height: inherit;
                                                      font-size: 10px;
                                                      vertical-align: baseline;
                                                      border-top-width: 0px;
                                                      border-right-width: 0px;
                                                      border-bottom-width: 0px;
                                                      border-left-width: 0px;
                                                      border-top-style: initial;
                                                      border-right-style: initial;
                                                      border-bottom-style: initial;
                                                      border-left-style: initial;
                                                      border-top-color: initial;
                                                      border-right-color: initial;
                                                      border-bottom-color: initial;
                                                      border-left-color: initial;
                                                      border-image-source: initial;
                                                      border-image-slice: initial;
                                                      border-image-width: initial;
                                                      border-image-outset: initial;
                                                      border-image-repeat: initial;
                                                      outline-color: initial;
                                                      outline-style: none;
                                                      outline-width: initial;
                                                      text-decoration-line: none;
                                                      text-decoration-thickness: initial;
                                                      text-decoration-style: initial;
                                                      text-decoration-color: initial;
                                                      transition-duration: 0.3s;
                                                      transition-timing-function: ease;
                                                      transition-delay: 0s;
                                                      transition-property: color;
                                                      letter-spacing: normal;
                                                      orphans: 2;
                                                      text-align: right;
                                                      text-indent: 0px;
                                                      text-transform: none;
                                                      white-space: pre-wrap;
                                                      widows: 2;
                                                      word-spacing: 0px;
                                                      -webkit-text-stroke-width: 0px;
                                                      font-family: arial, helvetica,
                                                        sans-serif;
                                                      color: #ffffff;
                                                    "
                                                    >View it</span
                                                  ></a
                                                ><span
                                                  style="
                                                    box-sizing: border-box;
                                                    padding-top: 0px;
                                                    padding-right: 0px;
                                                    padding-bottom: 0px;
                                                    padding-left: 0px;
                                                    margin-top: 0px;
                                                    margin-right: 0px;
                                                    margin-bottom: 0px;
                                                    margin-left: 0px;
                                                    font-style: inherit;
                                                    font-variant-ligatures: inherit;
                                                    font-variant-caps: inherit;
                                                    font-variant-numeric: inherit;
                                                    font-variant-east-asian: inherit;
                                                    font-weight: inherit;
                                                    font-stretch: inherit;
                                                    line-height: inherit;
                                                    font-size: 10px;
                                                    vertical-align: baseline;
                                                    border-top-width: 0px;
                                                    border-right-width: 0px;
                                                    border-bottom-width: 0px;
                                                    border-left-width: 0px;
                                                    border-top-style: initial;
                                                    border-right-style: initial;
                                                    border-bottom-style: initial;
                                                    border-left-style: initial;
                                                    border-top-color: initial;
                                                    border-right-color: initial;
                                                    border-bottom-color: initial;
                                                    border-left-color: initial;
                                                    border-image-source: initial;
                                                    border-image-slice: initial;
                                                    border-image-width: initial;
                                                    border-image-outset: initial;
                                                    border-image-repeat: initial;
                                                    letter-spacing: normal;
                                                    orphans: 2;
                                                    text-align: right;
                                                    text-indent: 0px;
                                                    text-transform: none;
                                                    white-space: pre-wrap;
                                                    widows: 2;
                                                    word-spacing: 0px;
                                                    -webkit-text-stroke-width: 0px;
                                                    text-decoration-thickness: initial;
                                                    text-decoration-style: initial;
                                                    text-decoration-color: initial;
                                                    font-family: arial, helvetica,
                                                      sans-serif;
                                                    color: #ffffff;
                                                  "
                                                >
                                                  in your browser.</span
                                                >
                                              </div>
                                              <div></div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      class="module"
                                      role="module"
                                      data-type="text"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="table-layout: fixed"
                                      data-muid="hL6wjQ2qknNd5qDwT1p7Up"
                                      data-mc-module-version="2019-10-22"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="
                                              background-color: #000000;
                                              padding: 10px 20px 10px 20px;
                                              line-height: 40px;
                                              text-align: justify;
                                            "
                                            height="100%"
                                            valign="top"
                                            bgcolor="#000000"
                                          >
                                            <div>
                                              <h1 style="text-align: center">
                                                <span
                                                  style="
                                                    color: #ffffff;
                                                    font-size: 28px;
                                                    font-family: verdana, geneva,
                                                      sans-serif;
                                                  "
                                                  ><strong
                                                    >Message from portfolio!</strong
                                                  ></span
                                                >
                                              </h1>
                                              <div></div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      class="wrapper"
                                      role="module"
                                      data-type="image"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="table-layout: fixed"
                                      data-muid="37c1DUYE1TN31PTwSNoaE7"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="
                                              font-size: 6px;
                                              line-height: 10px;
                                              padding: 0px 0px 0px 0px;
                                              background-color: #000000;
                                            "
                                            valign="top"
                                            align="center"
                                          >
                                            <img
                                              class="max-width"
                                              border="0"
                                              style="
                                                display: block;
                                                color: #000000;
                                                text-decoration: none;
                                                font-family: Helvetica, arial,
                                                  sans-serif;
                                                font-size: 16px;
                                                max-width: 100% !important;
                                                width: 100%;
                                                height: auto !important;
                                              "
                                              src="https://mc.sendgrid.com/assets/uploads/c4f7e550ea6e1dc8618193f5d31ae9c2aba8f542a5c7b20de199ef019965e396a34356c8181ce010e4a180058e1309fb033edd29246b3820fa2126343c17292c.png"
                                              alt=""
                                              width="600"
                                              data-responsive="true"
                                              data-proportionally-constrained="false"
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      class="module"
                                      role="module"
                                      data-type="text"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="table-layout: fixed"
                                      data-muid="qk51Jjn4bm3rn2Yb31Dxzb"
                                      data-mc-module-version="2019-10-22"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="
                                              background-color: #ffffff;
                                              padding: 50px 50px 10px 50px;
                                              line-height: 22px;
                                              text-align: center;
                                            "
                                            height="100%"
                                            valign="top"
                                            bgcolor="#ffffff"
                                          >
                                            <div>
                                              <div
                                                style="
                                                  font-family: inherit;
                                                  text-align: inherit;
                                                "
                                              >
                                                <span
                                                  style="
                                                    font-size: 24px;
                                                    font-family: verdana, geneva,
                                                      sans-serif;
                                                  "
                                                  ><strong
                                                    >${name}</strong
                                                  ></span
                                                >
                                              </div>
                                              <div></div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      class="module"
                                      role="module"
                                      data-type="text"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="table-layout: fixed"
                                      data-muid="iTBXe9c6QUCujvmJs8hYKr"
                                      data-mc-module-version="2019-10-22"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="
                                              background-color: #ffffff;
                                              padding: 40px 40px 40px 40px;
                                              line-height: 22px;
                                              text-align: inherit;
                                            "
                                            height="100%"
                                            valign="top"
                                            bgcolor="#ffffff"
                                          >
                                            <div>
                                              <div
                                                style="
                                                  font-family: inherit;
                                                  text-align: inherit;
                                                "
                                              >
                                                <span
                                                  style="
                                                    font-size: 16px;
                                                    font-family: verdana, geneva,
                                                      sans-serif;
                                                  "
                                                  >${message}</span
                                                >
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      class="module"
                                      role="module"
                                      data-type="spacer"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="table-layout: fixed"
                                      data-muid="2ga5f7koD5ApvUfnqUK6aT"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="padding: 0px 0px 30px 0px"
                                            role="module-content"
                                            bgcolor="#000000"
                                          ></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                              <!--[if mso]>
                                      </td>
                                    </tr>
                                  </table>
                                </center>
                                <![endif]-->
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </center>
      </body>
    </html>
    `,
  };

  try {
    const response = await sgMail.send(content);
    res.status(200).send(response);
  } catch (error) {
    console.log("ERROR ", error);
    res.status(400).send(error);
  }
};
