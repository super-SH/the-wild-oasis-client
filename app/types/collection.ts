import { Tables } from "./supabase";

export type Cabin = Tables<"cabins">;
export type Booking = Tables<"bookings">;
export type Settings = Tables<"settings">;
export type Guest = Tables<"guests">;

export interface BookingWithCabin extends Omit<Booking, "cabins"> {
  cabins: Cabin;
}
