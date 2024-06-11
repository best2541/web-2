import { useState } from 'react'
import { ChromePicker } from 'react-color'
import "./styles.scss"

const ChromePickerCustom = (props) => {
  const [state, setState] = useState({
    background: '#fff',
    rgb: {
      r: '255',
      g: '255',
      b: '255',
      a: '1'
    },
    hsl: { h: 0, s: 0, l: 1, a: 1 },
    color: {
      hex: "#ffffff",
      hsl: { h: 0, s: 0, l: 1, a: 1 },
      hsv: { h: 0, s: 0, v: 1, a: 1 },
      oldHue: 0,
      rgb: { r: 255, g: 255, b: 255, a: 1 },
      source: "hsv"
    },
    hex: "#fff"
  })

  const handleChangeComplete = (color) => {
    const convert2hex = RGBAToHexA(color.rgb.r, color.rgb.g, color.rgb.b, color.rgb.a)
    setState({ ...state, rgb: color.rgb, background: color.hex, hsl: color.hsl, color, hex: convert2hex })
  }

  const styleCustom = {
    default: {
      picker: {
        height: "269px"
      },
      // saturation: {
      //   height: "269px"
      // },
      controls: {
        display: 'block'
      },
      color: {
        display: 'none'
      },
      wrap: {
        display: 'none'
      },
      hue: {
        margin: "20px 0px"
      },
      Hue: {
        radius: "16px"
      },
      Alpha: {
        radius: "16px"
      }
    }
  }

  const RGBAToHexA = (r, g, b, a) => {
    r = r.toString(16) === "255" ? "ff" : r.toString(16)
    g = g.toString(16) === "255" ? "ff" : g.toString(16)
    b = b.toString(16) === "255" ? "ff" : b.toString(16)
    a = Math.round(a * 255).toString(16) === "ff" ? "" : Math.round(a * 255).toString(16)

    if (r.length === 1) {
      r = `0${r}`
    }
    if (g.length === 1) {
      g = `0${g}`
    }
    if (b.length === 1) {
      b = `0${b}`
    }
    if (a.length === 1) {
      a = `0${a}`
    }
    return `#${r}${g}${b}${a}`
  }

  const handleClickAddColor = () => {
    props.onAdd(state.hex)
  }

  const handleClickCancle = () => {
    props.onCancle()
  }

  const onColorPickerInfoChange = color => {
    console.log("Main Color Change", color)
  }

  return (
    <div>
      <ChromePicker
        className='chromePicker-custom'
        width={269}
        // disableAlpha={true}
        color={state.rgb}
        styles={styleCustom}
        onChangeComplete={handleChangeComplete}
        onChange={handleChangeComplete}
      />
      <div className='card-color-box'>
        <div className='d-flex'>
          <div>Hex</div>
          <div className='colorBox mx-1' style={{ backgroundColor: `rgba(${state.rgb.r}, ${state.rgb.g}, ${state.rgb.b}, ${state.rgb.a})` }}></div>
          {/* <div>{state.hex}</div> */}
        </div>
        <div className='d-flex'>
          <div style={{ cursor: "pointer" }} className='mr-1' onClick={handleClickCancle}>Cancel</div>
          <div className='text-primary' style={{ cursor: "pointer" }} onClick={handleClickAddColor}><strong>Add</strong></div>
        </div>
      </div>
    </div>
  )

}

export default ChromePickerCustom