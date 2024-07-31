"use client";

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Metrolinx } from "./server/types/service-at-a-glance";
import { Overpass } from "./server/types/overpass";

export default function Home() {
  const [trains, setTrains] =
    useState<Metrolinx.ServiceataGlance.Trains.Response>();
  const [buses, setBuses] =
    useState<Metrolinx.ServiceataGlance.Buses.Response>();
  const [stops, setStops] = useState<Overpass.Response>();
  const [stations, setStations] = useState<Overpass.Response>();

  const getBounds = useCallback(() => {
    if (!stops) throw new Error("no stops");

    const latlongs: { lat: number; lon: number }[] = stops.elements.map(
      (p: any) => ({
        lat: p.lat,
        lon: p.lon,
      })
    );

    const minLat = latlongs.reduce(
      (prev, current) => Math.min(prev, current.lat),
      Infinity
    );
    const maxLat = latlongs.reduce(
      (prev, current) => Math.max(prev, current.lat),
      -Infinity
    );
    const minLon = latlongs.reduce(
      (prev, current) => Math.min(prev, current.lon),
      Infinity
    );
    const maxLon = latlongs.reduce(
      (prev, current) => Math.max(prev, current.lon),
      -Infinity
    );

    const width = maxLon - minLon;
    const height = maxLat - minLat;

    return {
      minLat,
      minLon,
      width,
      height,
    };
  }, [stops]);

  useEffect(() => {
    fetch(`/api/trains`)
      .then(
        (res) =>
          res.json() as Promise<Metrolinx.ServiceataGlance.Trains.Response>
      )
      .then((data) => setTrains(data));
  }, []);

  useEffect(() => {
    fetch(`/api/buses`)
      .then(
        (res) =>
          res.json() as Promise<Metrolinx.ServiceataGlance.Buses.Response>
      )
      .then((data) => setBuses(data));
  }, []);

  useEffect(() => {
    fetch(`/api/stops`)
      .then((res) => res.json())
      .then((data) => setStops(data));
  }, []);

  useEffect(() => {
    fetch(`/api/stations`)
      .then((res) => res.json())
      .then((data) => setStations(data));
  }, []);

  if (!trains || !buses || !stops || !stations) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <span>Warming up the neon glow...</span>
      </div>
    );
  }

  return (
    <Main>
      <Display>
        <div>
          {stops.elements.map((stop) => (
            <Marker
              lat={stop.lat}
              lon={stop.lon}
              key={stop.id}
              type="stop"
              getBounds={getBounds}
            />
          ))}
        </div>
        <div>
          {buses.Trips.Trip.map((trip) => (
            <Marker
              lat={trip.Latitude}
              lon={trip.Longitude}
              key={trip.TripNumber}
              type="bus"
              getBounds={getBounds}
            />
          ))}
        </div>
        <div>
          {trains.Trips.Trip.map((trip) => (
            <Marker
              lat={trip.Latitude}
              lon={trip.Longitude}
              key={trip.TripNumber}
              type="train"
              getBounds={getBounds}
            />
          ))}
        </div>
        <div>
          {stations.elements.map((station) => (
            <Marker
              lat={station.lat}
              lon={station.lon}
              key={station.id}
              type="station"
              getBounds={getBounds}
            />
          ))}
        </div>
      </Display>
    </Main>
  );
}

const Marker: React.FC<{
  lat: number;
  lon: number;
  type: string;
  getBounds: () => any;
  children?: React.ReactNode;
}> = ({ lat, lon, getBounds, type, children }) => {
  const getColour = useCallback(() => {
    switch (type) {
      case "train":
        return "#03cd09";
      case "bus":
        return "green";
      case "stop":
        return "white";
      case "station":
        return "#03cd09";
    }
  }, [type]);

  const getStyle = useCallback(() => {
    switch (type) {
      case "train":
        const trainWidth = 11;
        return {
          border: `3px solid ${getColour()}`,
          minHeight: trainWidth,
          minWidth: trainWidth,
          borderRadius: 1000,
          boxShadow: `0 0 15px 0px ${getColour()}`,
          backgroundColor: getColour(),
        };
      case "bus":
        const busWidth = 8;
        return {
          border: `2px solid ${getColour()}`,
          minHeight: busWidth,
          minWidth: busWidth,
          borderRadius: 1000,
          boxShadow: `0 0 13px 0px ${getColour()}`,
          backgroundColor: getColour(),
        };
      case "stop":
        const stopWidth = 3;
        return {
          border: `1px solid ${getColour()}`,
          height: stopWidth,
          width: stopWidth,
          borderRadius: 1000,
          boxShadow: `0 0 8px 0px ${getColour()}`,
        };
      case "station":
        const stationWidth = 6;
        return {
          border: `1px solid ${getColour()}`,
          height: stationWidth,
          width: stationWidth,
          borderRadius: 1000,
          boxShadow: `0 0 15px 0px ${getColour()}`,
        };
    }
  }, [type, getColour]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${(100 * (lon - getBounds().minLon)) / getBounds().width}%`,
        bottom: `${(100 * (lat - getBounds().minLat)) / getBounds().height}%`,
        ...getStyle(),
        transform: "translate(-50%, 50%)",
      }}
    >
      {children}
    </div>
  );
};

const Main = styled.main`
  background-color: black;
  width: 100%;
  height: calc(100vh - 80px);
  padding: 40px;
`;

const Display = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;
