import { drizzle } from "drizzle-orm/neon-http"
import {neon} from '@neondatabase/serverless'
import 'dotenv/config'
import * as schema from '../db/Schema.js'


const sql = neon(process.env.DATABASE_URL)
export const database = drizzle(sql , {schema})




