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
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Template for OTP email
const getOTPEmailTemplate = (name, otpCode) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Mã xác thực OTP</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .otp-box { 
                background-color: #fff; 
                border: 2px solid #4CAF50; 
                padding: 20px; 
                text-align: center; 
                margin: 20px 0;
                border-radius: 8px;
            }
            .otp-code { 
                font-size: 32px; 
                font-weight: bold; 
                color: #4CAF50; 
                letter-spacing: 8px;
                margin: 10px 0;
            }
            .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
            .warning { color: #ff6b6b; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Mã xác thực OTP</h1>
            </div>
            <div class="content">
                <h2>Xin chào ${name},</h2>
                <p>Bạn đã yêu cầu mã xác thực OTP. Vui lòng sử dụng mã sau để xác thực tài khoản:</p>
                
                <div class="otp-box">
                    <p>Mã OTP của bạn:</p>
                    <div class="otp-code">${otpCode}</div>
                </div>
                
                <p><strong class="warning">Lưu ý quan trọng:</strong></p>
                <ul>
                    <li>Mã OTP này sẽ hết hạn sau <strong>5 phút</strong></li>
                    <li>Không chia sẻ mã này với bất kỳ ai</li>
                    <li>Chỉ sử dụng mã này trên website chính thức</li>
                </ul>
                
                <p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi.</p>
            </div>
            <div class="footer">
                <p>© 2024 Hệ thống của chúng tôi. Tất cả quyền được bảo lưu.</p>
                <p>Email này được gửi tự động, vui lòng không trả lời.</p>
            </div>
        </div>
    </body>
    </html>
    `
}

const getForgotPasswordEmailTemplate = (name, password) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Mật khẩu mới</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .otp-box { 
                background-color: #fff; 
                border: 2px solid #4CAF50; 
                padding: 20px; 
                text-align: center; 
                margin: 20px 0;
                border-radius: 8px;
            }
            .otp-code { 
                font-size: 32px; 
                font-weight: bold; 
                color: #4CAF50; 
                letter-spacing: 8px;
                margin: 10px 0;
            }
            .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
            .warning { color: #ff6b6b; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Mật khẩu mới</h1>
            </div>
            <div class="content">
                <h2>Xin chào ${name},</h2>
                <p>Bạn đã yêu cầu lấy lại mật khẩu. Vui lòng sử dụng mật khẩu sau để xác thực tài khoản:</p>
                
                <div class="otp-box">
                    <p>Mật khẩu của bạn:</p>
                    <div class="otp-code">${password}</div>
                </div>
                
                <p><strong class="warning">Lưu ý quan trọng:</strong></p>
                <ul>
                    <li>Không chia sẻ mật khẩu này với bất kỳ ai</li>
                    <li>Chỉ sử dụng mật khẩu này trên website chính thức</li>
                </ul>
            </div>
            <div class="footer">
                <p>© 2024 Hệ thống của chúng tôi. Tất cả quyền được bảo lưu.</p>
                <p>Email này được gửi tự động, vui lòng không trả lời.</p>
            </div>
        </div>
    </body>
    </html>
    `
}

module.exports = { sendMail, getOTPEmailTemplate, getForgotPasswordEmailTemplate }