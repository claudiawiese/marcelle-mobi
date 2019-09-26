export const state = () => ({
  chargingStations: [],
  parkingStations: {}

})

export const mutations = {
  SET_CHARGING_STATIONS(state, chargingStations) {
    state.chargingStations = chargingStations;
  },
  SET_PARKING_STATIONS(state, parkingStations) {
    state.parkingStations = parkingStations.data.pois
  }

};

export const actions = {
  async fetchChargingStations({ commit }, { latitude, longitude }) {
    const chargingStations = await this.$axios.$get(
      "https://api.openchargemap.io/v3/poi/", {
      params: {
        output: 'json', countrycode: 'FR', latitude, longitude, distanceunit: 'KM', verbose: false, camelcase: true, maxresults: 1000, distance: 25
      }
    }
    );
    commit("SET_CHARGING_STATIONS", chargingStations);
  },


  async fetchParkingStations({ commit }) {
    const ParkingStations = await this.$axios.get("https://uws2.mappy.net/data/poi/5.3/applications/parking", { params: { bbox: "43.20525712103248,5.592577232855179,43.393463513774186,5.291813644399666", max: 500, } })


    commit("SET_PARKING_STATIONS", ParkingStations)
  }
};
