export const determineMidiInputs = (midiAccess: any) => {
  const inputs = [];
  for (const entry of midiAccess.inputs) {
    console.log({ entry });
    inputs.push(entry[1]);
  }

  return inputs;
};

export const determineMidiOutputs = (midiAccess: any) => {
  const outputs = [];
  for (const entry of midiAccess.outputs) {
    console.log({ entry });
    outputs.push(entry[1]);
  }
  return outputs;
};
