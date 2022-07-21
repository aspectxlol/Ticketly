import { QuickDB } from "quick.db";
import { ticket } from "../../types";

const ticketDB = new QuickDB({filePath: 'src/database/tickets.sqlite'})

export default ticketDB

export const setTicket = (ticket: ticket) => {
    ticketDB.set(`${ticket.channel}`, ticket)
}