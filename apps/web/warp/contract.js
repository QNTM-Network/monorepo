/* warp/contract.js */
export function handle(state, action) {
  /* address of the caller is available in action.caller */
  if (action.input.function === 'initialize') {
    state.user = action.caller
  }
  if (action.input.function === 'createQuant' && action.caller === state.user) {
    const quants = state.quants
    quants[action.input.quant.id] = action.input.quant
    state.quants = quants
  }
  if (action.input.function === 'updateQuant' && action.caller === state.user) {
    const quants = state.quants
    const quantToUpdate = action.input.quant
    quants[quantToUpdate.id] = quantToUpdate
    state.quants = quants
  }
  if (action.input.function === 'deleteQuant' && action.caller === state.user) {
    const quants = state.quants
    delete quants[action.input.quant.id]
    state.quants = quants
  }
  return { state }
}
