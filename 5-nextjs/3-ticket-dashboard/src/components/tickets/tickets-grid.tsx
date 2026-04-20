import { getTickets } from "@/utils/service";
import TicketCard from "./ticket-card";

const TicketsGrid = async () => {
  const { tickets } = await getTickets();

  // ticket'ların benzersiz kategorilerinden oluşan bir dizi oluştur
  const categories = [...new Set(tickets?.map((ticket) => ticket.category))];

  return (
    <div>
      {categories.map((category, key) => {
        const categoryTickets = tickets
          ?.filter((ticket) => ticket.category === category)
          .sort((b, a) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        return (
          <div key={key} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-500 rounded-full" />

                {category}
              </h2>

              <span className="bg-blue-600/20 text-sm py-1 px-2 rounded-md">{categoryTickets.length} ticket</span>
            </div>

            <div className="grid md:grid-cols lg:grid-cols-3 gap-3">
              {categoryTickets.map((ticket) => (
                <TicketCard key={ticket._id} ticket={ticket} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketsGrid;
