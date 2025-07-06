export const selectTasks = (state) => state.taskState.tasks;
// Селекторы для отдельных флагов загрузки
export const selectAddLoading = (state) => state.taskState.loading.add;
export const selectDeleteLoading = (state) => state.taskState.loading.delete;
export const selectUpdateLoading = (state) => state.taskState.loading.update;
export const selectFetchLoading = (state) => state.taskState.loading.fetch;
