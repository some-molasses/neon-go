export namespace GO {
  export namespace ServiceataGlance {
    interface ServiceResponse<TripType> {
      Metadata: {
        TimeStamp: string;
        ErrorCode: string;
        ErrorMessage: string;
      };
      Trips: {
        Trip: TripType[];
      };
    }

    export namespace Trains {
      export type Response = ServiceResponse<TrainTrip>;

      export type TrainTrip = {
        Cars: string;
        TripNumber: string;
        StartTime: string;
        EndTime: string;
        LineCode: string;
        RouteNumber: string;
        VariantDir: string;
        Display: string;
        Latitude: number;
        Longitude: number;
        IsInMotion: boolean;
        DelaySeconds: number;
        Course: number;
        FirstStopCode: string;
        LastStopCode: string;
        PrevStopCode: string;
        NextStopCode: string;
        AtStationCode: string;
        ModifiedDate: string;
      };
    }

    export namespace Buses {
      export type Response = ServiceResponse<BusTrip>;

      export type BusTrip = {
        BusType: "Coach";
        TripNumber: string;
        StartTime: string;
        EndTime: string;
        LineCode: string;
        RouteNumber: string;
        VariantDir: string;
        Display: string;
        Latitude: number;
        Longitude: number;
        IsInMotion: boolean;
        DelaySeconds: number;
        Course: number;
        FirstStopCode: string;
        LastStopCode: string;
        PrevStopCode: string;
        NextStopCode: string;
        AtStationCode: string;
        ModifiedDate: string;
      };
    }
  }
}
