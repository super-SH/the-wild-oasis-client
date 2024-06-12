import React from "react";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app//_lib/data-service";
import { Cabin } from "../types/collection";

async function CabinList({ filter }: { filter: string }) {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins = [] as Cabin[];

  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);

  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  if (filter === "all") displayedCabins = cabins;

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
