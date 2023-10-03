
exports.uploadFile = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
     
        const fileUrl = req.file.location;
        return res.status(200).json({
            message: 'File uploaded successfully',
            url: fileUrl
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};