exports.notFound = (req, res, next) => {
    res.status(404).json({ message: `🔍 Not Found - ${req.originalUrl}` });
};

exports.errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

exports.handleValidationError = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ message: messages.join(', ') });
    }
    next(err);
};