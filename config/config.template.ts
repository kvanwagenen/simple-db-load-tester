module.exports = {

    /**
     * Knex database connection object. See http://knexjs.org/#Installation-client
     */
    db: {
        client: 'mysql',
        connection: {
            host: '',
            user : '',
            password : '',
            database : '',
            port: ''
        }
    },

    table: {

        /**
         * Name of table to read from and write to.
         */
        name: '',

        /**
         * Max id to use to select a record when making a read request.
         */
        maxSelectId: 10,

        /**
         * Function that returns an object of values to insert when making a single write
         * request.
         *
         * @returns {Object}
         */
        insertValuesCb(): Object {
            const value = Math.random() * 65000
            return {columnName: value}
        }
    }
}