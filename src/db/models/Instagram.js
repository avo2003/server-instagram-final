const mongoose = require('mongoose');

const instagramSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			trim: true,
		},
		avatar: {
			type: String,
			required: true,
			trim: true,
		},
		img1: {
			type: String,
			required: true,
			trim: true,
		},
		img2: {
			type: String,
			required: true,
			trim: true,
		},
		img3: {
			type: String,
			required: true,
			trim: true,
		},
		img4: {
			type: String,
			required: true,
			trim: true,
		},
		img5: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true },
);

const Instagram = mongoose.model('Instagram', instagramSchema);

module.exports = Instagram;
