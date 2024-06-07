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
