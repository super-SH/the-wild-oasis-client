import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import { BookingWithCabin } from "../types/collection";

/////////////
// GET

export async function getCabin(id: number) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );

    const countries = await res.json();

    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

export const getCabins = async function () {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export async function getBookings(guestId: number) {
  const { data, error, count } = await supabase
    .from("bookings")
    .select("*,cabins(*)")
    .eq("guestId", guestId)
    .order("startDate")
    .returns<BookingWithCabin[]>();

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getBookedDatesByCabinId(cabinId: number) {
  let today: Date | string = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getGuest(email: string) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}
export async function createGuest(newGuest: {
  email: string;
  fullName: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
}) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}
