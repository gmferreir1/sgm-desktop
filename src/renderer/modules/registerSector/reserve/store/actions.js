const createReserve = async ({}, data) => {
  try {
    return http.post("register/reserve", data).then(result => {
      return result;
    });
  } catch (e) {
    throw e;
  }
};

const getAllReserves = async ({ commit }, queryParams) => {
  try {
    return await http.get("register/reserve", queryParams).then(results => {
      commit("SET_RESERVES", results.data);
      return results;
    });
  } catch (e) {
    throw e;
  }
};

const getReserve = async ({}, id) => {
  try {
    return await http.get(`register/reserve/${id}`).then(results => {
      return results;
    });
  } catch (e) {
    throw e;
  }
};

const updateReserve = async ({}, data) => {
  try {
    return http.put(`register/reserve/${data.id}`, data).then(result => {
      return result;
    });
  } catch (e) {
    throw e;
  }
};

export default {
  createReserve,
  getAllReserves,
  getReserve,
  updateReserve
};
