/**
 * Cria uma nova conta no sistema
 * @param {*} param0
 * @param {*} data
 */
const createUser = async ({ dispatch }, data) => {
  try {
  } catch (e) {
    throw e;
  }
};

/**
 * Busca as contas cadastradas no sistema
 * @param {*} param0
 */
const getAllUsers = async ({ commit }, queryParams) => {

  if (!queryParams) {
    queryParams = {
      params: { input: "" }
    }
  }

  try {
    return await http.get("admin/user", queryParams).then(results => {
      commit("SET_USERS", results.data);
      return results;
    });
  } catch (e) {
    throw e;
  }
};

export default {
  createUser,
  getAllUsers
};
