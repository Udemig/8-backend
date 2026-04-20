import { statusColors } from "@/utils/constants";
import { FC } from "react";

interface Props {
  status: "Çözüldü" | "Devam Ediyor" | "Beklemede";
}

const StatusBadge: FC<Props> = ({ status }) => {
  const color = statusColors[status];

  return <div className={`text-white px-3 py-1 text-xs rounded-full ${color}`}>{status}</div>;
};

export default StatusBadge;
