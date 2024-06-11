import { Tables } from "./supabase";

export type Cabin = Tables<"cabins">;
export type Booking = Tables<"bookings">;

export interface BookingWithCabin extends Omit<Booking, "cabins"> {
  cabins: Cabin;
}
