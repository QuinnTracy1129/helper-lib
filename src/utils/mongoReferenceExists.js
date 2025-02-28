export function mongoReferenceExists(_id, modelName) {
  const referenceExists = this.model(modelName).findById(_id);

  if (!referenceExists) throw new Error(`[${_id}] Does not exist in ${modelName}.`);
}
