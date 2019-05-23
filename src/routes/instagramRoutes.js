const express = require('express');
const router = new express.Router();

const Instagram = require('../db/models/Instagram');

router.post('/', async (req, res) => {
	const instagram = new Instagram(req.body);

	// du poxi
	if (!req.body.name) return res.status(400).json({ message: 'name is required!' });
	if (!req.body.username) return res.status(400).json({ message: 'username is required!' });
	if (!req.body.avatar) return res.status(400).json({ message: 'avatar is required!' });
	if (!req.body.img1) return res.status(400).json({ message: 'img1 is required!' });
	if (!req.body.img2) return res.status(400).json({ message: 'img2 is required!' });
	if (!req.body.img3) return res.status(400).json({ message: 'img3 is required!' });
	if (!req.body.img4) return res.status(400).json({ message: 'img4 is required!' });
	if (!req.body.img5) return res.status(400).json({ message: 'img5 is required!' });

	try {
		await instagram.save();
		res.status(201).json(instagram);
	} catch (error) {
		res.status(500).json({ message: 'Bad request' });
	}
});

router.get('/', async (req, res) => {
	try {
		let inastagrams = await Instagram.find().sort('username');
		if (req.query.username) {
			inastagrams = inastagrams.filter(instagram =>
				instagram.username.toLowerCase().includes(req.query.username.toLowerCase()),
			);
		}
		res.json(inastagrams);
	} catch (error) {
		res.status(500).json({ message: 'Bad request' });
	}
});


router.get('/:id', async (req, res) => {
	try {
		const instagram = await Instagram.findById(req.params.id);
		if (!instagram) return res.status(404).json({ message: 'Instagram not found' });
		res.json(instagram);
	} catch (error) {
		res.status(500).json({ message: 'Bad request' });
	}
});

router.get('/name/:name', async (req, res) => {
	try {
		const instagram = await Instagram.findOne({"name": req.params.name});
		if (!instagram) return res.status(404).json({ message: 'Instagram not found' });
		res.json(instagram);
	} catch (error) {
		res.status(500).json({ message: 'Bad request' });
	}
});


router.patch('/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	// es el poxi
	const allowedUpdates = ['name', 'username', 'avatar', 'img1', 'img2', 'img3', 'img4', 'img5'];
	const isValidOperation = updates.every(update => allowedUpdates.includes(update));

	if (!isValidOperation) return res.status(400).json({ message: 'Invalid updates!' });

	try {
		const instagram = await Instagram.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!instagram) return res.status(404).json({ message: 'Instagram not found!' });

		res.json(instagram);
	} catch (error) {
		res.status(500).json({ message: 'Bad request' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const instagram = await Instagram.findByIdAndDelete(req.params.id);

		if (!instagram) res.status(404).json({ message: 'Instagram not found' });

		res.json(instagram);
	} catch (error) {
		res.status(500).json({ message: 'Bad request' });
	}
});

module.exports = router;
