/**
 * Cria um novo motivo
 * @param {*} param0
 * @param {*} data
 */
const createReason = async ({ dispatch }, data) => {
  try {
    return await http.post("admin/reason", data).then(results => {
      dispatch("getAllReasons");
      return results;
    });
  } catch (e) {
    throw e;
  }
};

/**
 * Atualiza um novo motivo
 * @param {*} param0 
 * @param {*} data 
 */
const updateReason = async ({ dispatch }, data) => {
  try {
    return await http.put(`admin/reason/${data.id}`, data).then(results => {
      dispatch("getAllReasons");
      return results;
    });
  } catch (e) {
    throw e;
  }
};

/**
 * Busca os motivos cadastrados no sistema
 * @param {*} param0
 */
const getAllReasons = async ({ commit }, queryParams) => {
  if (!queryParams) {
    queryParams = {
      params: { module_name: "" }
    };
  }

  try {
    return await http.get("admin/reason", queryParams).then(results => {
      commit("SET_REASONS", results.data);
      return results;
    });
  } catch (e) {
    throw e;
  }
};

export default {
  createReason,
  updateReason,
  getAllReasons
};
