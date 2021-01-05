import { ENTITIES } from "src/entities"

const DataTypes = require('sequelize/lib/data-types')

export function defineSqlDatetime() {
    DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
        date = this._applyTimezone(date, options)
        return date.format('YYYY-MM-DD HH:mm:ss.SSS')
    }
}

export const databaseConfig: any = {
    dialect: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'sa',
    password: '123',
    database: 'todo_task',
    define: {
        timestamps: false,
        underscored: true
    },
    autoLoadModels: true,
    synchronize: true,
    models: ENTITIES
}