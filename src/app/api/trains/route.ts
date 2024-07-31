import { Metrolinx } from "@/app/server/types/service-at-a-glance";
import { NextRequest, NextResponse } from "next/server";

/**
 * @param start The start point in format `"lat,lon"`
 * @returns the betterWalk for the given start and destination points
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<Metrolinx.ServiceataGlance.Trains.Response>> {
  const res: Metrolinx.ServiceataGlance.Trains.Response = await fetch(
    `https://api.openmetrolinx.com/OpenDataAPI/api/V1/ServiceataGlance/Trains/All?key=${process.env.METROLINX_API_KEY}`,
    { method: "GET" }
  ).then((res) => res.json());

  return NextResponse.json(res);
}
