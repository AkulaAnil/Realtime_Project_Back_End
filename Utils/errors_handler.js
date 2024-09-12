const error_handler = (error, req, res, next) => {
    const statusCode = res?.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case 400:
            res.json({
                title: "Validation Error",
                message: error.message,
                stackTrace: error.stack
            });
            break;
        case 401:
            res.json({
                title: "UnAuthorized",
                message: error.message,
                stackTrace: error.stack
            });
            break;
        case 403:
            res.json({
                title: "Forbidden Error",
                message: error.message,
                stackTrace: error.stack
            });
            break;
        case 404:
        res.json({
            title: "Not Found",
            message: error.message,
            stackTrace: error.stack
        });
        break;
    case 500:
        res.json({
            title: "Server Error",
            message: error.message,
            stackTrace: error.stack
        });
        break;
        default:
            break;
    }
}

module.exports = error_handler;