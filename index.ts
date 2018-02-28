import * as knex from 'knex'
import * as util from 'util'
import config from './config'

console.log('Initializing db connection...')
const db = knex(config.db)
console.log('Initialized.')

let reads = 0
let writes = 0

function logRead() {
    reads++
}

function logWrite() {
    writes++
}

function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function makeReadRequest(db: knex, table: string) {
    return db(table).select().from(table).where('id', Math.random() * config.table.maxId)
}

async function makeWriteRequest(db: knex, table: string, valuesCb: () => object) {
    return db(table).insert(valuesCb())
}

async function makeReadRequests(db: knex, table: string) {
    console.log('Beginning to make read requests...')
    while (true) {
        await makeReadRequest(db, table)
        logRead()
    }
}

async function makeWriteRequests(db: knex, table: string, valuesCb: () => object) {
    console.log('Beginning to make write requests...')
    while (true) {
        await makeWriteRequest(db, table, valuesCb)
        logWrite()
    }
}

async function logRequests() {
    console.log('Logging results...')
    setInterval(() => {
        console.log(`Reads: ${reads}/s, Writes: ${writes}/s`)
        reads = 0
        writes = 0
    }, 1000)
}

function loadTest(db: knex, table: string, valuesCb: () => object) {
    makeReadRequests(db, table)
    makeWriteRequests(db, table, valuesCb)
    logRequests()
}

loadTest(db, config.table.name, config.table.insertValuesCb)
