import { useState, useEffect } from "react";
import { Display } from "./Display";
import { CalcButton } from "./CalcButton";

export const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [error, setError] = useState(false);

  const inputDigit = (digit: string) => {
    if (error) {
      setError(false);
      setDisplay(digit);
      return;
    }

    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (error) {
      setError(false);
      setDisplay("0.");
      return;
    }

    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setError(false);
  };

  const performOperation = (nextOperation: string) => {
    if (error) {
      setError(false);
      return;
    }

    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operation) {
        case "+":
          newValue = currentValue + inputValue;
          break;
        case "-":
          newValue = currentValue - inputValue;
          break;
        case "×":
          newValue = currentValue * inputValue;
          break;
        case "÷":
          if (inputValue === 0) {
            setError(true);
            setDisplay("Xato: 0 ga bo'lish");
            setPreviousValue(null);
            setOperation(null);
            return;
          }
          newValue = currentValue / inputValue;
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;

      if (key >= "0" && key <= "9") {
        inputDigit(key);
      } else if (key === ".") {
        inputDecimal();
      } else if (key === "+" || key === "-") {
        performOperation(key);
      } else if (key === "*") {
        performOperation("×");
      } else if (key === "/") {
        event.preventDefault();
        performOperation("÷");
      } else if (key === "Enter" || key === "=") {
        performOperation("=");
      } else if (key === "Escape" || key.toLowerCase() === "c") {
        clear();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [display, operation, previousValue, waitingForOperand, error]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-card rounded-3xl shadow-2xl p-6 space-y-4">
        <Display value={display} error={error} />
        
        <div className="grid grid-cols-4 gap-3">
          <CalcButton onClick={clear} variant="secondary" className="col-span-2">
            C
          </CalcButton>
          <CalcButton onClick={() => performOperation("÷")} variant="operation">
            ÷
          </CalcButton>
          <CalcButton onClick={() => performOperation("×")} variant="operation">
            ×
          </CalcButton>

          <CalcButton onClick={() => inputDigit("7")}>7</CalcButton>
          <CalcButton onClick={() => inputDigit("8")}>8</CalcButton>
          <CalcButton onClick={() => inputDigit("9")}>9</CalcButton>
          <CalcButton onClick={() => performOperation("-")} variant="operation">
            −
          </CalcButton>

          <CalcButton onClick={() => inputDigit("4")}>4</CalcButton>
          <CalcButton onClick={() => inputDigit("5")}>5</CalcButton>
          <CalcButton onClick={() => inputDigit("6")}>6</CalcButton>
          <CalcButton onClick={() => performOperation("+")} variant="operation">
            +
          </CalcButton>

          <CalcButton onClick={() => inputDigit("1")}>1</CalcButton>
          <CalcButton onClick={() => inputDigit("2")}>2</CalcButton>
          <CalcButton onClick={() => inputDigit("3")}>3</CalcButton>
          <CalcButton onClick={() => performOperation("=")} variant="equals" className="row-span-2">
            =
          </CalcButton>

          <CalcButton onClick={() => inputDigit("0")} className="col-span-2">
            0
          </CalcButton>
          <CalcButton onClick={inputDecimal}>.</CalcButton>
        </div>
      </div>
    </div>
  );
};
