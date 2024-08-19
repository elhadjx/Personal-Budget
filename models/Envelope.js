class Envelope {
    constructor(obj) {
        if (!isValidEnvelope(obj)) return null;
        this.id = obj.id
        this.name = obj.name;
        this.limit = obj.limit
    }
}

function isValidNum(param) {
    return typeof (param) == 'number'
}

function isValidName(param) {
    if (typeof (param) == 'string' &&
        param.length > 3 &&
        param.length < 20) {
        return true;
    }
    return false;
}

function isValidEnvelope(obj) {
    if (
        isValidNum(obj.id) &&
        isValidNum(obj.limit) &&
        isValidName(obj.name)) {
        return true;
    }
    return false;
}

module.exports = Envelope;