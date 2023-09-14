import requester from './index';

export default {
    getAllJourneys() {
        return requester.get('request/journey').then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },

    getSingleJourney(journeyId) {
        return requester.get('journey/' + journeyId)
            .then((res) => {
                const journeyData = res.data;

                const stops = journeyData[journeyId].Stops || [];

                return Promise.resolve(stops);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }
}