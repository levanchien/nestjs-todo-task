import { ENTITIES } from "src/entities";

const DataTypes = require('sequelize/lib/data-types');

/* Object không thể thay đôi value ??? */
export const dbConfiguration = () => ({
    dialect: 'mssql',
    host: process.env.DB_HOST || 'localhostx',
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
} as any)

export const _dbConfiguration = {
    dialect: 'mssql',
    host: process.env.DB_HOST || 'localhostx',
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
} as any


export const setSqlDatetimeFormat = () => {
    DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
        date = this._applyTimezone(date, options)
        return date.format('YYYY-MM-DD HH:mm:ss.SSS')
    }
}