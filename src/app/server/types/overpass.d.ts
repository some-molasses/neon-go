export namespace Overpass {
  export interface Response {
    version: number;
    generator: string;
    osm3s: {
      timestamp_osm_base: string;
      copyright: string;
    };
    elements: Node[];
  }

  export type Node = {
    type: "node";
    id: number;
    lat: number;
    lon: number;
    tags: Record<string, string>;
  };
}
