export function findFieldsInClientConfig(clientConf, fieldToFind) {
  return Object.entries(clientConf).find(([k, v]) =>
    v.find((v2) => v2.fields.find((e) => e.id === fieldToFind && e.value)),
  );
}
