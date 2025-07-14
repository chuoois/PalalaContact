const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const { Users } = require('../models');

const changePassword = async (req, res) => {
    try {
        const userId = req.userId;
        const { oldPassword, newPassword } = req.body;

        const user = await Users.findById(userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Không tìm thấy người dùng' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Mật khẩu cũ không chính xác' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Users.updateOne({ _id: userId }, { password: hashedPassword });

        res.status(StatusCodes.OK).json({ message: 'Cập nhật mật khẩu thành công' });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi khi tìm kiếm liên hệ' });
    }
};

module.exports = {
    changePassword
};