/**
 * Cria um novo fluxo de atendimento no sistema
 * @param {*} param0
 * @param {*} data
 */
const createFlux = async ({ dispatch }, data) => {
  try {
    return await http.post("admin/flux-attendance", data).then(result => {
      dispatch("getAllFlux");
      return result;
    });
  } catch (e) {
    throw e;
  }
};

/**
 * Busca os fluxos de atendimento no sistema
 * @param {*} param0
 */
const getAllFlux = async ({ commit }, queryParams) => {
  if (!queryParams) {
    queryParams = {
      params: { input: "" }
    };
  }

  try {
    return await http
      .get("admin/flux-attendance", queryParams)
      .then(results => {
        commit("SET_FLUX_ATTENDANCE", results.data);
        return results;
      });
  } catch (e) {
    throw e;
  }
};

/**
 * Atualiza os dados do fluxo de atendimento no sistema
 * @param {*} param0 
 * @param {*} data 
 */
const updateFlux = async ({ dispatch }, data) => {
  try {
    return await http.put(`admin/flux-attendance/${data.id}`, data).then(result => {
      dispatch("getAllFlux");
      return result;
    });
  } catch (e) {
    throw e;
  }
};

/**
 * Remove o fluxo de atendimento no sistema
 * @param {*} param0
 * @param {*} id
 */
const removeFlux = async ({ dispatch }, id) => {
  try {
    return await http.delete(`admin/flux-attendance/${id}`).then(_ => {
      dispatch("getAllFlux");
    });
  } catch (e) {
    throw e;
  }
};

export default {
  createFlux,
  getAllFlux,
  updateFlux,
  removeFlux
};
