import { supabase } from "./supabase";

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );

    const countries = await res.json();
    console.log(countries);
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
