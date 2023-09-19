import TransportAPI from "./TransportAPI";

export default {
    getAll() {
        return TransportAPI.get("journey").then((res) =>
            Object.keys(res.data).map((journeyId) => ({
                id: journeyId,
                stops_count: res.data[journeyId],
            }))
        );
    },
    getJourney(id) {
        return TransportAPI.get(`journey/${id}`).then((res) =>
            Object.values(res.data[id].Stops).map((stopItem) => ({
                name: stopItem.TimingPointName,
                status: stopItem.TripStopStatus,
                wheelchair: stopItem.WheelChairAccessible,
                lon: stopItem.Longitude,
                lat: stopItem.Latitude,
            }))
        );
    },
};