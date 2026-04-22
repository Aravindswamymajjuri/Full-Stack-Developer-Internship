const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    
    const userRecord = await User.findById(userId);

    if (!userRecord) {
      console.log('User not found:', userId);
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: userRecord._id,
        name: userRecord.name,
        email: userRecord.email,
        memberSince: userRecord.createdAt,
      },
    });
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ message: 'Could not fetch user profile' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email } = req.body;

    const userRecord = await User.findById(userId);

    if (!userRecord) {
      return res.status(404).json({ message: 'User not found' });
    }

    // only update provided fields
    if (name) userRecord.name = name;
    if (email) userRecord.email = email;

    await userRecord.save();
    console.log('Profile updated for user:', userId);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: userRecord._id,
        name: userRecord.name,
        email: userRecord.email,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Could not update profile' });
  }
};
