const nodemailer = require("nodemailer")
const { env } = require("../configs/environment")

const sendMail = async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: true,
    auth: {
      user: env.EMAIL_USERNAME,
      pass: env.EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: env.EMAIL_USERNAME,
    to: email,
    subject,
    html,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Email sent successfully to:", email)
    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: error.message }
  }
}

// Template for verification email
const getVerificationEmailTemplate = (name, verificationLink) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Xác nhận tài khoản</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .button { 
                display: inline-block; 
                padding: 12px 24px; 
                background-color: #4CAF50; 
                color: white; 
                text-decoration: none; 
                border-radius: 5px; 
                margin: 20px 0;
            }
            .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Chào mừng bạn đến với hệ thống của chúng tôi!</h1>
            </div>
            <div class="content">
                <h2>Xin chào ${name},</h2>
                <p>Cảm ơn bạn đã đăng ký tài khoản. Để hoàn tất quá trình đăng ký, vui lòng xác nhận địa chỉ email của bạn bằng cách nhấp vào nút bên dưới:</p>
                
                <div style="text-align: center;">
                    <a href="${verificationLink}" class="button">Xác nhận tài khoản</a>
                </div>
                
                <p>Hoặc bạn có thể copy và paste đường link sau vào trình duyệt:</p>
                <p style="word-break: break-all; background-color: #f0f0f0; padding: 10px; border-radius: 3px;">
                    ${verificationLink}
                </p>
                
                <p><strong>Lưu ý:</strong> Link xác nhận này sẽ hết hạn sau 24 giờ.</p>
                
                <p>Nếu bạn không tạo tài khoản này, vui lòng bỏ qua email này.</p>
            </div>
            <div class="footer">
                <p>© 2024 Hệ thống của chúng tôi. Tất cả quyền được bảo lưu.</p>
            </div>
        </div>
    </body>
    </html>
    `
}

module.exports = { sendMail, getVerificationEmailTemplate }
