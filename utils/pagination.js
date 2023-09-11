//pagination
exports.getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};
exports.getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: users } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, users, totalPages, currentPage };
};