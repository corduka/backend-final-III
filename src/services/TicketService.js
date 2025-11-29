import TicketRepository from '../repositories/TicketRepository.js'; // Assuming you implement this
import { generateUniqueCode } from '../utils/codeGenerator.js'; // Utility to generate code

class TicketService {
    constructor() {
        this.ticketRepository = new TicketRepository();
    }

    async createTicket(amount, purchaser) {
        const ticketData = {
            code: generateUniqueCode(),
            amount,
            purchaser,
        };
        
        const newTicket = await this.ticketRepository.create(ticketData);
        
        return newTicket;
    }
}

export default TicketService;