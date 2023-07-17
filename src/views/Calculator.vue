<template>
  <div class="container calculator" ref="calculator" @keydown="keyDown" tabindex="0">
    <div class="__interface">
      <Gradient />
      <div class="input" id="input">
        {{ sin }}
        {{ calc === '' ? 0 : calc }}
        <span class="calc_result" v-if="showEqual!==''">= <span class="result_num"
                                                                :class="showResult">{{ showEqual }}</span></span>
      </div>
      <div class="buttons">
        <div class="__left-panel">
          <div class="__small-numbers">
            <number-button size="small" color="standard" type="number" @click="calculate('number', E,'e')">e
            </number-button>
            <number-button size="small" color="standard" type="number" @click="calculate('number', P,'µ')">µ
            </number-button>
            <number-button size="small" color="standard" type="number" @click="calculate('number', P,'sin')">sin
            </number-button>
          </div>
          <div class="__normal-numbers">
            <number-button size="normal" color="lightGray" type="action" @click="calculate('action','Ac', null)">Ac
            </number-button>
            <number-button size="normal" color="lightGray" type="action" @click="calculate('action','x', null)">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                <path
                    d="M6.53499 1.11994e-08H21C21.2652 1.11994e-08 21.5196 0.105357 21.7071 0.292893C21.8946 0.48043 22 0.734784 22 1V17C22 17.2652 21.8946 17.5196 21.7071 17.7071C21.5196 17.8946 21.2652 18 21 18H6.53499C6.3704 18 6.20835 17.9594 6.06321 17.8818C5.91807 17.8042 5.79434 17.6919 5.70299 17.555L0.369993 9.555C0.260354 9.39067 0.201843 9.19755 0.201843 9C0.201843 8.80245 0.260354 8.60933 0.369993 8.445L5.70299 0.445C5.79434 0.308084 5.91807 0.195832 6.06321 0.118205C6.20835 0.0405779 6.3704 -2.46193e-05 6.53499 1.11994e-08ZM7.06999 2L2.40399 9L7.06999 16H20V2H7.06999ZM13 7.586L15.828 4.757L17.243 6.172L14.414 9L17.243 11.828L15.828 13.243L13 10.414L10.172 13.243L8.75699 11.828L11.586 9L8.75699 6.172L10.172 4.757L13 7.586Z"
                    fill="currentColor"/>
              </svg>
            </number-button>
            <number-button size="normal" color="blue" type="operator" @click="calculate('operator', Operators.DIVISION, null)">/</number-button>
          </div>
          <div class="__normal-numbers">
            <number-button size="normal" color="standard" type="number" @click="calculate('number',7, null)">7</number-button>
            <number-button size="normal" color="standard" type="number" @click="calculate('number',8, null)">8</number-button>
            <number-button size="normal" color="standard" type="number" @click="calculate('number',9, null)">9</number-button>
            <number-button size="normal" color="standard" type="number" @click="calculate('number',4, null)">4</number-button>
            <number-button size="normal" color="standard" type="number" @click="calculate('number',5, null)">5</number-button>
            <number-button size="normal" color="standard" type="number" @click="calculate('number',6, null)">6</number-button>
            <number-button size="normal" color="standard" type="number" @click="calculate('number',1, null)">1</number-button>
            <number-button size="normal" color="standard" type="number" @click="calculate('number',2, null)">2</number-button>
            <number-button size="normal" color="standard" type="number" @click="calculate('number',3, null)">3</number-button>
          </div>
          <div class="__vertical-numbers">
            <number-button size="vertical" color="standard" type="number" @click="calculate('number',0, null)">0
            </number-button>
            <number-button size="normal" color="standard" type="number" @click="calculate('number','.', null)">.
            </number-button>
          </div>
        </div>
        <div class="__right_panel">
          <div class="__numbers">
            <number-button size="small" color="standard">deg</number-button>
            <number-button size="normal" color="blue" type="operator"
                           @click="calculate('operator', Operators.MULTIPLICATION, null)">*
            </number-button>
            <number-button size="normal" color="blue" type="operator" @click="calculate('operator', Operators.SUBTRACTION, null)">
              -
            </number-button>
            <number-button size="horizontal" color="blue" type="operator"
                           @click="calculate('operator', Operators.ADDITION, null)">+
            </number-button>
            <number-button size="horizontal" color="lightBlue" type="operator"
                           @click="calculate('operator', Operators.EQUAL, null)">=
            </number-button>
          </div>
        </div>
      </div>
      <Gradient class="bottom"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NumberButton from "@/components/UI/NumberButton.vue"
import {onMounted, ref} from "vue"
import {Operators} from "@/core/enum.js"
import Gradient from "@/components/Gradient.vue"
import {CalcType, NumberType} from "@/core/types"

const calculator = ref<HTMLDivElement | undefined>()
const calc = ref<string>('')
const showEqual = ref<string>('')
const showResult = ref<string>('hide')

const E = ref<number>(parseFloat(Math.exp(1).toFixed(7)))
const P = ref<number>(parseFloat(Math.PI.toFixed(7)))
const sin = ref<string | number>()

const existKeys = ref<Object>({
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    ".": ".",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    "Ac": "Ac",
    "e": "e",
    "µ": "µ",
    "x": "x",
    Enter: "=",
    Backspace: "Ac"
})

onMounted(() => {
  calculator.value.focus()
  calculator.value.style.outline = 'none'
})

function calculate(calcType: string | number, value: string | number, numberType: string | null) {
  isShowEqual()

  switch (calcType) {
    case "number":
      isTypeNumber(numberType, value)
      break;
    case "operator":
      isTypeOperator(value)
      break;
  }

  switch (value) {
    case "x":
      checkCalculate()
      break;
    case "Ac":
      resetCalc()
      break;
  }
}

function keyDown(event) {
  const key = event.key
  const value = existKeys.value[key]

  if (value !== undefined) {
    const numberType: NumberType = (value === 'e') ? 'e' : (value === 'µ' ? 'µ' : (value === 'sin' ? 'sin' : (value === 'Ac' ? 'Ac' : 'x')))
    const calcType:CalcType = Number(value) ? 'number' : 'operator'

    calculate(calcType, value, numberType)
  }
}

function isTypeNumber(numberType: string, value: string | number): void {
  if (numberType === 'e' || numberType === 'µ') {
    if (convertCalculateValueToArray().length === 1) {
      calc.value = `${value}`
    } else if (lastCharacterIsExistsOperator()) {
      calc.value += `${value}`
    }
  } else if (numberType === 'sin') {
    calc.value = `sin(`
  } else if (value === '.') {
    if (getLastCharacter() === value) {
      calc.value = value
    } else {
      calc.value += value
    }
  } else {
    if (checkIfStartSinus()) {
      const synRes = Math.sin(parseInt(`${value}`))
      showEqual.value = eval(`${synRes}`)
      showResult.value = "show"
    } else {
      calc.value += value
    }
  }
  if (convertCalculateValueToArray().length >= 2 && numberType !== 'sin') {
    showEqual.value = eval(calc.value)
  }
}

function isTypeOperator(value: string | number) {
  if((value === '*' || value === '/') && convertCalculateValueToArray().length === 1 && calc.value === '') {
    return
  }

  if (value === Operators.EQUAL) {
    if (lastCharacterIsExistsOperator()) {
      removeLastValue(-1)
    }
    return showResult.value = "show"
  } else {
    if (!convertCalculateValueToArray().length && isOperator(value)) {
      calc.value = `0${value}`
    }
    if (!lastCharacterIsExistsOperator()) {
      calc.value += value
    }
    if (getLastCharacter() !== value) {
      calc.value = calc.value.replace(/.$/, `${value}`)
    }
  }
}

function checkCalculate() {
  if (convertCalculateValueToArray().length > 2) {
    if (lastCharacterIsExistsOperator()) {
      removeLastValue(-1)
    } else {
      removeLastValue(-2)
    }
  }
}

function lastCharacterIsExistsOperator(): boolean {
  const values: Array<Object> = Object.values(Operators)
  return Boolean(values.includes(calc.value.slice(-1) as unknown as Operators))
}

function isOperator(operator: string| number): boolean {
  const values: Array<Object> = Object.values(Operators);
  return Boolean(values.includes(`${operator}` as unknown as Operators))
}

function getLastCharacter(): string {
  return calc.value.slice(-1)
}

function removeLastValue(sliceCount: number): void {
  calc.value = calc.value.slice(0, sliceCount);
  evaluate()
}

function convertCalculateValueToArray() {
  return calc.value.split(/[\-=/+*_]/)
}

function checkIfStartSinus() {
  return calc.value.startsWith('sin(')
}

function evaluate(): void {
  showEqual.value = eval(calc.value)
}

function isShowEqual(): void {
  if (showResult.value === "show") {
    resetCalc()
  }
}

function resetCalc(): void {
  calc.value = ''
  showEqual.value = ''
  showResult.value = 'hide'
}
</script>
