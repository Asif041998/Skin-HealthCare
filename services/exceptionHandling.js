
const exceptionHandlingId = async (id) => {
    let message = {
        message: "Invalid ID format"
    };
    if (!/^\d+$/.test(id))
        return message;
    
}
module.exports = exceptionHandlingId;