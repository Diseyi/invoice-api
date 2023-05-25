import express, { json, Application } from "express";
import config from 'config';
import userRouter from "./routes/auth.routes";
import InvoiceRouter from "./routes/invoice.routes";
import { connect } from './config/database';
import log from "./utilities/logger";


const app: Application = express()
const PORT = config.get<number>('port')

app.use(json())
app.use("/api/v1/auth", userRouter)
app.use("/api/v1", InvoiceRouter)
app.listen(PORT, () => {
    log.info(`listening on port ${PORT}`)
    connect()
})