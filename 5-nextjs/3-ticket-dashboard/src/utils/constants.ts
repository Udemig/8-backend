import { ChartArea, House, Mail, Plus, Ticket, Users } from "lucide-react";

export const navigationItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: House,
  },
  {
    label: "Tickets",
    href: "/tickets",
    icon: Ticket,
  },
  {
    label: "Yeni Ticket",
    href: "/ticket/add",
    icon: Plus,
  },
  {
    label: "Takımlar",
    href: "#",
    icon: Users,
  },
  {
    label: "Gelen Kutusu",
    href: "#",
    icon: Mail,
  },
  {
    label: "İstatistikler",
    href: "#",
    icon: ChartArea,
  },
];

export const dateFormat = {
  year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
} as const;

export const statusColors = {
  Beklemede: "bg-yellow-500",
  "Devam Ediyor": "bg-blue-500",
  Çözüldü: "bg-green-500",
};
