import { Overpass } from "@/app/server/types/overpass";
import { NextRequest, NextResponse } from "next/server";

/**
 * @param start The start point in format `"lat,lon"`
 * @returns the betterWalk for the given start and destination points
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<Overpass.Response>> {
  const promise = await fetch(`https://overpass-api.de/api/interpreter`, {
    method: "POST",
    body: `[out:json][timeout:25];
    node(42.630574, -82.167591,45.070271, -77.465443);
    nwr[highway=bus_stop][operator=Metrolinx];
    out geom;`,
  });
  // console.log(await promise.text());
  const res = await promise.json();

  return NextResponse.json(res);
}
