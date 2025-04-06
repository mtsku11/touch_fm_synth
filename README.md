# BLE Speed Sensor Web Audio Example

This example builds on the principles of the *Sliders* demo and integrates real-time physical sensor input using the Bluetooth Low Energy (BLE) protocol. Specifically, it connects to a **Garmin speed sensor**, translating the wheel’s revolution speed into pitch in a **Csound** synthesizer.

---

## Key Features

- Real-time interaction via BLE.
- Dynamic pitch control driven by sensor data.
- Visual display of speed (in km/h) and frequency (Hz).
- Automatic idle detection and pitch reset.
- Adaptive smoothing and intelligent pitch holding at low speeds.

---

## What This Example Covers

This version moves on from traditional HTML sliders to explore:

- **Continuous control from a physical device** (a BLE speed sensor).
- **Bus-based parameter control** in Csound using the `.setControlChannel()` method.
- **Adaptive logic** for idle state detection and pitch behavior at low speeds.

We still preserve the original principle of **user-initiated audio context**: Csound starts only after clicking the start button. This is necessary for browser compatibility, since most browsers restrict autoplay of audio without user interaction.

---

## How the Start Button Works

The button now performs dual roles:

1. **Starts and stops** the Csound engine.
2. **Connects to the BLE sensor**.

When clicked:
- If Csound is not initialized, it loads and starts the Csound engine.
- Then, it connects to the Garmin speed sensor.
- The engine starts instrument 1 and begins receiving BLE updates.
- Clicking again toggles the instance off/on.

---

## BLE Sensor Integration

The Garmin sensor provides:
- **Cumulative revolutions**
- **Timestamp in 1/1024 second resolution**

The JavaScript extracts the revolution delta and time delta, then calculates:
- **Speed (km/h)**  
- **Frequency (Hz)** via a formula: `frequency = speed * 100`, mapped between 0 Hz and 3000 Hz for a speed range of 0–30 km/h.

A **speedometer display** shows the current speed, and the frequency is updated in real-time via:

```js
csound.setControlChannel('freq', computedFreq);
```

---

## Idle Detection

If the sensor stops reporting new revolutions for a short period:
- The system sets an `idle = true` state.
- Frequency resets to **0 Hz** (silence).
- Speed display shows **0.00 km/h**.

An **adaptive timeout** is applied:
- Fast speeds return to idle quickly.
- Speeds below ~6.5 km/h delay idle activation for a smoother experience.

---

## Csound Code

```csound
instr 1
  kamp = port(chnget:k("amp"),0.01,-1)
  kfreq = port(chnget:k("freq"),0.01,-1)
  out linenr(vco2(0dbfs*kamp,kfreq,10),0.01,0.5,0.01)
endin
schedule(1,0,-1)
```

Portamento smooths transitions in amplitude and frequency. Instrument 1 runs continuously, responding to control bus updates.

---

## HTML Structure

The HTML interface consists of:
- A **Start button** that invokes `start()`.
- Two **display fields**:
  - Frequency (`freqval`)
  - Speed (`speedval`)

```html
<input type="button" id="start button" onclick="start()" value="OFF">
<p>Frequency: <span id="freqval">0</span> Hz</p>
<p>Speed: <span id="speedval">0.00</span> km/h</p>
```

---

## Conclusion

This example demonstrates how to integrate a BLE speed sensor with the Csound audio engine in the browser, offering a real-time sonic representation of motion. It highlights the flexibility of Csound's software bus and the expressive potential of physical interaction as a control source.
