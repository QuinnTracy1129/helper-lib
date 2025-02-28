export async function mongoReferenceExists(_id, modelName) {
  const referenceExists = await this.model(modelName).findById(_id);

  if (!referenceExists) throw new Error(`[${_id}] Does not exist in ${modelName}.`);
}
