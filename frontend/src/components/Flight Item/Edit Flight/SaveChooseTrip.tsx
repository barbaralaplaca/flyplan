import { useSelector, useDispatch } from "react-redux";
import { fetchTripsData } from "../../../state/slicers/dashboardSlice";
import { RootState, AppDispatch } from "../../../state/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IFlightItem, SaveFlightButtonProps } from "../../../types/types";
import { CreateTrip } from "../../Trip Container/Create Trip/CreateTrip";

export default function SaveChooseTrip({
  onClose,
  ...props
}: SaveFlightButtonProps) {
  const isReturnTrip = useSelector(
    (state: RootState) => !state.searchReducer.oneWay
  );

  const {
    carrierOneWay,
    carrierReturn,
    durationOneWay,
    durationReturn,
    itineraryOneWay,
    itineraryReturn,
    origin,
    cityOrigin,
    destination,
    cityDestination,
    price,
    departureDateOneWay,
    departureTimeOneWay,
    departureTimeReturn,
    departureDateReturn,
    arrivalTimeOneWay,
    arrivalTimeReturn,
    logoOneWay,
    logoOneWayName,
    logoReturn,
    logoReturnName,
    link,
    setSaveFlight,
  } = props;

  const flightData: IFlightItem = {
    carrierOneWay,
    carrierReturn,
    durationOneWay,
    durationReturn,
    origin,
    cityOrigin,
    destination,
    cityDestination,
    price,
    link,
    departureDateOneWay: departureDateOneWay,
    itineraryOneWay,
    departureTimeOneWay,
    arrivalTimeOneWay,
    logoOneWay,
    logoOneWayName,
  };

  if (
    isReturnTrip &&
    itineraryReturn &&
    departureDateReturn &&
    departureTimeReturn &&
    arrivalTimeReturn &&
    logoReturn &&
    logoReturnName
  ) {
    flightData.departureDateReturn = departureDateReturn;
    flightData.itineraryReturn = itineraryReturn;
    flightData.departureTimeReturn = departureTimeReturn;
    flightData.arrivalTimeReturn = arrivalTimeReturn;
    flightData.logoReturn = logoReturn;
    flightData.logoReturnName = logoReturnName;
  }

  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector((state: RootState) => state.loginReducer.userId);
  const tripsData = useSelector(
    (state: RootState) => state.dashboardReducer.tripsData
  );
  const loading = useSelector(
    (state: RootState) => state.dashboardReducer.loading
  );
  const error = useSelector((state: RootState) => state.dashboardReducer.error);

  const [selectedTrip] = useState("");
  const [createNewListBox, setCreateNewListBox] = useState(false);

  useEffect(() => {
    if (selectedTrip) {
      saveFlight(selectedTrip);
    }
  }, [selectedTrip]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTripsData(userId));
    }
  }, [userId, dispatch]);

  const saveFlight = async (tripUuid: string) => {
    if (!userId) {
      // Show toast with unsuccessful message that the user is not logged in
      toast.error("You are not logged in!", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 6000,
      });
      return;
    }
    try {
      await axios.patch(
        process.env.REACT_APP_API_SAVEFLIGHTS_PRODUCTION!,
        // process.env.REACT_APP_API_SAVEFLIGHTS_DEV!,
        {
          userId: userId,
          flightItem: flightData,
          tripUuid,
        }
      );
    } catch (error) {
      // Show the toast with error message when there's an error from the server or when the saveFlight function fails to trigger
      toast.error("Failed to save flight", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        onClose: () => {
          onClose();
        },
      });
      console.error(error);
    }
  };

  return (
    <>
      {createNewListBox ? (
        <CreateTrip onClose={() => setCreateNewListBox(false)} />
      ) : (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white rounded-md p-6 flex flex-col gap-4 w-11/12 mx-auto border border-black max-w-md">
            <h1 className="text-3xl font-bold text-black py-4">Save to trip</h1>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              tripsData.length > 0 && (
                <div className="space-y-2">
                  {tripsData.map((trip, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        saveFlight(trip.tripId);
                        setSaveFlight(true);
                        onClose();
                      }}
                      className=" border border-black block w-full text-left py-2 px-4 bg-white hover:bg-gray-100 rounded-md"
                    >
                      {trip.tripName}
                    </button>
                  ))}
                </div>
              )
            )}
            <hr></hr>
            <div className="flex items-center justify-between">
              <button
                className="self-start mt-4 text-flyplanyellow px-4 py-2 rounded-md"
                onClick={() => setCreateNewListBox(true)}
              >
                Create Trip
              </button>
              <button
                onClick={onClose}
                className="self-end mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
            {/* checking state to load lightbox */}
            {createNewListBox && (
              <CreateTrip onClose={() => setCreateNewListBox(false)} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
