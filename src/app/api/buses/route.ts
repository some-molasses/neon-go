import { Metrolinx } from "@/app/server/types/service-at-a-glance";
import { NextRequest, NextResponse } from "next/server";

/**
 * @param start The start point in format `"lat,lon"`
 * @returns the betterWalk for the given start and destination points
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<Metrolinx.ServiceataGlance.Buses.Response>> {
  const res: Metrolinx.ServiceataGlance.Buses.Response = await fetch(
    `https://api.openmetrolinx.com/OpenDataAPI/api/V1/ServiceataGlance/Buses/All?key=${process.env.METROLINX_API_KEY}`,
    { method: "GET" }
  ).then((res) => res.json());

  return NextResponse.json(res);
}
