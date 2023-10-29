<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";

const midi: Ref<MIDIAccess> = ref({} as MIDIAccess); // global MIDIAccess object
// const inputDisplay: Ref<MIDIAccess> = ref({} as MIDIAccess); // global MIDIAccess object
// const outputDisplay: Ref<MIDIAccess> = ref({} as MIDIAccess); // global MIDIAccess object
// const eventDisplay: Ref<MIDIAccess> = ref({} as MIDIAccess);

const onMIDISuccess = (midiAccess: MIDIAccess) => {
  console.log("MIDI ready!");
  console.log({ midiAccess });

  midi.value = midiAccess;

  const innout = listInputsAndOutputs(midiAccess);

  subtitle.value = `Connected: ${innout.input.manufacturer}  ${innout.input.name}`
  // content.value = innout.thingInput;

  console.log({ innout });
  startLoggingMIDIInput(midiAccess, innout.input?.id);
};

const onMIDIFailure = (msg: any) => {
  console.error(`Failed to get MIDI access - ${msg}`);
  subtitle.value = "failed to connect to midi device";
};

function onMIDIMessage(event: any) {
  let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data} bytes]: `;
  console.log(event.data);

  for (const character of event.data) {
    console.log({ character });
    str += `${character.toString(16)} `;
  }
  console.log(str);
  return event.data
}

const startLoggingMIDIInput = (
  midiAccess: MIDIAccess,
  indexOfPort: MIDIPort
) => {
  console.log(indexOfPort);

  midiAccess.inputs.forEach((entry: any) => {
    entry.onmidimessage = onMIDIMessage;
  });
};

// const listInputsAndOutputs = (midiAccess: any) => {
//   let thingInput = midiAccess.inputs.forEach((entry:any) => entry).join()
//   // .forEach((entry) => {
//   //   const input = entry;
//   //   console.log({entry})
//   //   console.log(
//   //     `Input port [type:'${input.type}']` +
//   //       ` id:'${input.id}'` +
//   //       ` manufacturer:'${input.manufacturer}'` +
//   //       ` name:'${input.name}'` +
//   //       ` version:'${input.version}'`
//   //   );
//   //   return input;
//   // });

//   let thingOutput = midiAccess.outputs
//   // .forEach((entry) => {
//   //   const output = entry;
//   //   console.log(
//   //     `Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`
//   //   );
//   //   return output;
//   // });

//   console.log({thingOutput})
//   return { thingInput, thingOutput };
// };

function listInputsAndOutputs(midiAccess:any) {
  const returnObject = {} as any
  let input
  let output
  for (const entry of midiAccess.inputs) {
    input = entry[1];
    console.log(
      `Input port [type:'${input.type}'] id:'${input.id}' manufacturer: '${input.manufacturer}' name: '${input.name}' version: '${input.version}'`,
    );
  }

  for (const entry of midiAccess.outputs) {
    output = entry[1];
    console.log(
      `Output port [type:'${output.type}'] id: '${output.id}' manufacturer: '${output.manufacturer}' name: '${output.name}' version: '${output.version}'`,
    );
  }

  returnObject.input = input ?? 'something'
  returnObject.output = output ?? 'something'

  console.log({returnObject})
  return returnObject
}

// onMounted(() => {
//   navigator.requestMIDIAccess().then((access: any) => {
//     // Get lists of available MIDI controllers
//     const inputs = access.inputs;
//     inputDisplay.value = inputs.forEach((x) => x);
//     const outputs = access.outputs;
//     outputDisplay.value = outputs.forEach((x) => x);

//     access.onstatechange = (event: any) => {
//       // Print information about the (dis)connected MIDI controller
//       eventDisplay.value = event;
//       console.log({ event });
//       // console.log(event.port?.name, event.port.manufacturer, event.port.state);
//     };
//   });
// });

// navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
navigator.requestMIDIAccess().then((midiAccess: any) => {
  Array.from(midiAccess.inputs).forEach((input: any) => {
    input[1].onmidimessage = (msg: any) => {
      // console.log(msg);
      console.log(msg.data);
    };
  });
});

const title = ref("helllo");
const subtitle = ref("Please connect your MIDI device to begin");
const content = ref("here is some content");
</script>

<template>
  <!-- <v-card :title="keyba
    ">{{ keyba }}</v-card> -->

  <v-card :title="title" :subtitle="subtitle">
    <v-card-text>
      <!-- <pre>{{ midi }}</pre>
      <pre>{{ inputDisplay }}</pre>
      <pre>{{ outputDisplay }}</pre>
      <pre>{{ eventDisplay }}</pre> -->
      <pre>{{ content }}</pre>
    </v-card-text>
  </v-card>
</template>
