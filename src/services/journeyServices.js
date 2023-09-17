import requester from './index';

export default {
    getAllJourneys() {
        return requester.get('request/journey').then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },

    async getSingleJourney(journeyId) {
        return requester.get('journey/' + journeyId)
            .then((res) => {
                const journeyData = res.data;

                const stops = journeyData[journeyId].Stops || [];

                return Promise.resolve(stops);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },


    async getTenStops() {
        try {
            const res = await requester.get('request/journey');
            const keys = Object.keys(res.data).slice(0, 3);
    
            const promises = keys.map(async (key) => {
                return this.getSingleJourney(key);
            });
    
            const data = await Promise.all(promises);
    
            return data;
        } catch (error) {
            throw error;
        }
    }

}