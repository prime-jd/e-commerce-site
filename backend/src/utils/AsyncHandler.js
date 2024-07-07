const asyncHandler = (requestHandler) => async (req, res, next) => {
    try {
        return await Promise.resolve(requestHandler(req, res, next));
    } catch (error) {
        return (next(error));
    }
}
export default asyncHandler;