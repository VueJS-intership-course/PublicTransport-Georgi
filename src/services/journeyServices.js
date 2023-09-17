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
            let count = 0;
            let data = [];

            for (const key in res.data) {
                if (count >= 5) {
                    break;
                }

                const single = await this.getSingleJourney(key);
                data.push(single)
                count++;
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

}