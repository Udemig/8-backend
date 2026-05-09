"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type BookingFormProps = {
  pricePerDay: number;
  location: string;
  carId: string;
};

const TIME_OPTIONS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const labelClass = "text-secondary-500 text-sm font-bold";
const fieldBase =
  "h-11 w-full rounded border border-border bg-card px-3 text-sm text-secondary-500 outline-none focus:border-primary";

export default function BookingForm({ carId, pricePerDay, location }: BookingFormProps) {
  const { data: session } = useSession();
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("10:00");
  const [notes, setNotes] = useState("");

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          carId,
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
          pickupLocation: location,
          dropoffLocation: location,
          notes,
        }),
      });

      const data = await res.json();

      console.log(data);
    } catch (error) {
      alert("Ödeme anında bir hata oluştu");
    }
  }

  return (
    <aside className="bg-card rounded-card p-6 flex flex-col gap-5 lg:sticky lg:top-24 self-start">
      <div className="flex items-end gap-1">
        <span className="text-secondary-500 text-2xl font-bold">₺{pricePerDay.toFixed(2)}</span>
        <span className="text-secondary-300 text-sm font-medium pb-1">/ gün</span>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <fieldset className="flex flex-col gap-3">
          <legend className={labelClass}>Teslim Alma Tarihi & Saati</legend>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-secondary-300 text-xs font-medium">Tarih</span>
              <input
                type="date"
                className={fieldBase}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-secondary-300 text-xs font-medium">Saat</span>
              <select className={fieldBase} value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}>
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className={labelClass}>Geri Teslim Tarihi & Saati</legend>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-secondary-300 text-xs font-medium">Tarih</span>
              <input
                type="date"
                className={fieldBase}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={pickupDate || undefined}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-secondary-300 text-xs font-medium">Saat</span>
              <select className={fieldBase} value={returnTime} onChange={(e) => setReturnTime(e.target.value)}>
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </fieldset>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Teslim Alma Konumu</span>
          <span className="relative">
            <MapPin size={16} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-300" />
            <input
              type="text"
              value={location}
              readOnly
              disabled
              className={`${fieldBase} pl-9 bg-surface cursor-not-allowed`}
            />
          </span>
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Geri Teslim Konumu</span>
          <span className="relative">
            <MapPin size={16} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-300" />
            <input
              type="text"
              value={location}
              readOnly
              disabled
              className={`${fieldBase} pl-9 bg-surface cursor-not-allowed`}
            />
          </span>
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Ek Notlar (Opsiyonel)</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Özel istek veya not"
            rows={3}
            className="w-full rounded border border-border bg-card px-3 py-2 text-sm text-secondary-500 placeholder:text-secondary-300 outline-none focus:border-primary resize-none"
          />
        </label>

        {!session?.user ? (
          <button className="bg-primary hover:opacity-90 text-white text-sm font-semibold h-12 rounded">
            <Link href="/login">Rezerve Etmek için Giriş Yap</Link>
          </button>
        ) : (
          <button
            disabled={!session?.user}
            type="submit"
            className="bg-primary hover:opacity-90 text-white text-sm font-semibold h-12 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Rezerve Et
          </button>
        )}
      </form>
    </aside>
  );
}
