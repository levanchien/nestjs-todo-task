const DataTypes = require('sequelize/lib/data-types')

export function defineSqlDatetime() {
    DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
        date = this._applyTimezone(date, options)
        return date.format('YYYY-MM-DD HH:mm:ss.SSS')
    }
}