
const isDate = (value) => {
    return !isNaN(Date.parse(value));
}

module.exports = {
    isDate
}