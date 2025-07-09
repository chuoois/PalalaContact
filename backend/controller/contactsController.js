const { StatusCodes } = require('http-status-codes');
const {
    Users,
    Contacts,
} = require('../models');

const getContactbyUserId = async (req, res) => {
    const userId = req.userId;
    const { category, status, search } = req.query; 

    try {
        const query = { userId };

        if (category) {
            query.category = category;
        }

        if (status) {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } }, 
                { phone: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }

        const contacts = await Contacts.find(query);
        res.status(StatusCodes.OK).json(contacts);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi khi tìm kiếm liên hệ' });
    }
};

const getContactdetails = async (req, res) => {
    const contactId = req.params.id;
    try {
        const contact = await Contacts.findById(contactId);
        if (!contact) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Không tìm thấy liên hệ' });
        }
        res.status(StatusCodes.OK).json(contact);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi khi tìm kiếm liên hệ' });
    }
}

const togleFavorite = async (req, res) => {
    const contactId = req.params.id;
    try {
        const contact = await Contacts.findById(contactId);
        if (!contact) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Không tìm thấy liên hệ' });
        }

        await Contacts.updateOne({ _id: contactId }, { isFavorite: !contact.isFavorite });
        res.status(StatusCodes.OK).json(contact);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi khi tìm kiếm liên hệ' });
    }
}

const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const userId = req.body.userId; 

        const contact = await Contacts.findById(contactId);
        if (!contact) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Không tìm thấy liên hệ',
            });
        }

        await Contacts.deleteOne({ _id: contactId });

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Xóa liên hệ thành công',
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Lỗi khi xóa liên hệ',
            error: error.message,
        });
    }
};

const createContact = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            company,
            jobTitle,
            website,
            birthday,
            notes,
            tags,
            category,
            isFavorite,
            status,
            socialMedia
        } = req.body;

        const userId = req.userId;

        if (!userId || !firstName || !lastName || !phone) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Không được để trống'
            });
        }

        const fullName = `${firstName} ${lastName}`.trim();

        const savedContact = await Contacts.create({
            userId,
            firstName,
            lastName,
            fullName,
            email,
            phone,
            address: address || {},
            company,
            jobTitle,
            website,
            birthday,
            notes,
            tags: tags || [],
            category: category || 'other',
            isFavorite: isFavorite || false,
            status: status || 'Active',
            socialMedia: socialMedia || {}
        });

        res.status(StatusCodes.CREATED).json({
            success: true,
            data: savedContact,
            message: 'Tạo thành công'
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Lỗi khi tạo liên hệ',
            error: error.message
        });
    }
};

const updateContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const userId = req.userId;
        
        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            company,
            jobTitle,
            website,
            birthday,
            notes,
            tags,
            category,
            isFavorite,
            status,
            socialMedia
        } = req.body;

        // Kiểm tra contact có tồn tại không
        const contact = await Contacts.findById(contactId);
        if (!contact) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Không tìm thấy liên hệ'
            });
        }

        // Kiểm tra quyền sở hữu (chỉ user tạo ra contact mới được update)
        if (contact.userId.toString() !== userId) {
            return res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                message: 'Bạn không có quyền chỉnh sửa liên hệ này'
            });
        }

        // Tạo object cập nhật
        const updateData = {};
        
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (email !== undefined) updateData.email = email;
        if (phone !== undefined) updateData.phone = phone;
        if (address !== undefined) updateData.address = address;
        if (company !== undefined) updateData.company = company;
        if (jobTitle !== undefined) updateData.jobTitle = jobTitle;
        if (website !== undefined) updateData.website = website;
        if (birthday !== undefined) updateData.birthday = birthday;
        if (notes !== undefined) updateData.notes = notes;
        if (tags !== undefined) updateData.tags = tags;
        if (category !== undefined) updateData.category = category;
        if (isFavorite !== undefined) updateData.isFavorite = isFavorite;
        if (status !== undefined) updateData.status = status;
        if (socialMedia !== undefined) updateData.socialMedia = socialMedia;

        // Cập nhật fullName nếu firstName hoặc lastName thay đổi
        if (firstName !== undefined || lastName !== undefined) {
            const newFirstName = firstName !== undefined ? firstName : contact.firstName;
            const newLastName = lastName !== undefined ? lastName : contact.lastName;
            updateData.fullName = `${newFirstName} ${newLastName}`.trim();
        }

        // Cập nhật contact
        const updatedContact = await Contacts.findByIdAndUpdate(
            contactId,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(StatusCodes.OK).json({
            success: true,
            data: updatedContact,
            message: 'Cập nhật liên hệ thành công'
        });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Lỗi khi cập nhật liên hệ',
            error: error.message
        });
    }
};

module.exports = {
    getContactbyUserId,
    getContactdetails,
    togleFavorite,
    deleteContact,
    createContact,
    updateContact
};