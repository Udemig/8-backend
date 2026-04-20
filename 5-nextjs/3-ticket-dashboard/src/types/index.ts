export type StatisticsResponse = {
  message: string;
  totalTickets: number;
  ticketsByCategory: {
    "Yazılım Sorunu": number;
    "Donanım Sorunu": number;
    "Bağlantı Sorunu": number;
    Diğer: number;
  };
  ticketsByStatus: {
    Çözüldü: number;
    Beklemede: number;
    "Devam Ediyor": number;
  };
  completedTickets: number;
  completionRate: number;
  criticalTicket: number;
  averagePriority: number;
  ticketsCreatedToday: number;
  ticketsCreatedLast7Days: number;
  ticketsCreatedThisYear: number;
};

export type Ticket = {
  _id: string;
  title: string;
  description: string;
  category: "Yazılım Sorunu" | "Donanım Sorunu" | "Bağlantı Sorunu" | "Diğer";
  priority: number;
  progress: number;
  status: "Çözüldü" | "Beklemede" | "Devam Ediyor";
  createdAt: string;
  updatedAt: string;
};

export type TicketsResponse = {
  message: string;
  tickets: Ticket[];
};

export type TicketResponse = {
  message: string;
  ticket: Ticket;
};
