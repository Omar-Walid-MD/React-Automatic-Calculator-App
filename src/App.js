import logo from './logo.svg';
import './calculator.css';
import {useState} from "react"

function InputButton({input,label,handleNumString})
{
  return(
    <div className="calculator-number-button" onClick={function(){handleNumString(input)}}>
      <div className="calculator-number-button-label">{label || input}</div>
    </div>
  )
}

function OperationButton({label, operation})
{
  return(
    <div className="calculator-number-button" onClick={function(){operation()}}>
      <div className="calculator-number-button-label">{label}</div>
    </div>
  )
}

function App() {

  const [numString, setNumString] = useState("");

  function handleNumString(number)
  {
    setNumString(numString + number);
  }

  function eraseNumString()
  {
    console.log(numString)
    setNumString(numString.substr(0,numString.length-1));
  }

  function clearNumString()
  {
    setNumString("");
  }

  function solveNumString()
  {
    setNumString(String(solve(numString)));
  }

  function toSolve(string)
  {
    let stringLength = string.length
    for (let i = 0; i < stringLength; i++)
    {
      const c = string[i];
      if(c === '(' && i > 0)
      {
        if(isInt(string[i-1]))
        {
          string = (string.substring(0, i) + '*' + string.substring(i));
          stringLength = string.length;
        }
      }
      
    }

    for (let i = 0; i < stringLength; i++)
    {
      const c = string[i];
      if(c==='×')
      {
        string = (string.substring(0, i) + '*' + string.substring(i+1));
        stringLength = string.length;
      }
      else if(c==='÷')
      {
        string = (string.substring(0, i) + '/' + string.substring(i+1));
        stringLength = string.length;
      }
      else if(c==='^')
      {
        string = (string.substring(0, i) + '**' + string.substring(i+1));
        stringLength = string.length;
        i++;
      }
      else if(c==='s')
      {
        if(isInt(string[i-1]))
        {
          string = (string.substring(0, i) + '*sin(' + string.substring(i+1));
          stringLength = string.length;
          i += 5;
        }
        else
        {
          string = (string.substring(0, i) + 'sin(' + string.substring(i+1));
          stringLength = string.length;
          i += 4;
        }
      }
      else if(c==='c')
      {
        if(isInt(string[i-1]))
        {
          string = (string.substring(0, i) + '*cos(' + string.substring(i+1));
          stringLength = string.length;
          i += 5;
        }
        else
        {
          string = (string.substring(0, i) + 'cos(' + string.substring(i+1));
          stringLength = string.length;
          i += 4;
        }
      }
      else if(c==='t')
      {
        if(isInt(string[i-1]))
        {
          string = (string.substring(0, i) + '*tan(' + string.substring(i+1));
          stringLength = string.length;
          i += 5;
        }
        else
        {
          string = (string.substring(0, i) + 'tan(' + string.substring(i+1));
          stringLength = string.length;
          i += 4;
        }
      }
      
    }

    for (let i = 0; i < stringLength; i++)
    {
      const c = string[i];
      if(c==='√')
      {
        if(isInt(string[i-1]))
        {
          string = (string.substring(0, i) + '*sqrt(' + string.substring(i+1));
          stringLength = string.length;
          i += 5;
        }
        else
        {
          string = (string.substring(0, i) + 'sqrt(' + string.substring(i+1));
          stringLength = string.length;
          i += 4;
        }
      }
    }

    
    console.log("Input: " + string)
  
    return string;
  }

  function toDisplay(string)
  {
    let stringLength = string.length

    for (let i = 0; i < stringLength; i++)
    {
      const c = string[i];
  
      if(c==='s')
      {
        string = (string.substring(0, i) + 'sin(' + string.substring(i+1));
        stringLength = string.length;
        i += 4;
      }
      else if(c==='c')
      {
        string = (string.substring(0, i) + 'cos(' + string.substring(i+1));
        stringLength = string.length;
        i += 4;
      }
      else if(c==='t')
      {
        string = (string.substring(0, i) + 'tan(' + string.substring(i+1));
        stringLength = string.length;
        i += 4;
      }
      else if(c==='√')
      {
        string = (string.substring(0, i) + '√(' + string.substring(i+1));
        stringLength = string.length;
        i += 2;
      }
      
    }

    
    console.log("Display: " + string)
  
    return string;
  }

  function solve(input)
  {
    try
    {
      let trySolve = (eval(toSolve(input)))
    }
    catch
    {
      return("")
    }

    return(eval(toSolve(input)))
  }

  function isInt(c)
  {
    let possibleChars = ['1','2','3','4','5','6','7','8','9','0',')'];
    return possibleChars.includes(c);
  }

  function sin(n)
  {
    return Math.fround(Math.sin(n*Math.PI/180));
  }

  function cos(n)
  {
    return Math.fround(Math.cos(n*Math.PI/180));
  }

  function tan(n)
  {
    return Math.fround(Math.tan(n*Math.PI/180));
  }
  function sqrt(n)
  {
    return Math.fround(Math.sqrt(n));
  }

  return (
    <div className="page-container">
      <div className="calculator-container">
        <div className="calculator-display-container">
          <div className="calculator-input-display">
            {toDisplay(numString)}
          </div>
          <div className="split-line"></div>
          <div className="calculator-output-display">
            {solve(numString)}
          </div>
          
        </div>
        <div className="calculator-buttons-container">
          <div className="calculator-number-buttons">
              <div className="calculator-buttons-row">
                <InputButton input="1" handleNumString={handleNumString}></InputButton>
                <InputButton input="2" handleNumString={handleNumString}></InputButton>
                <InputButton input="3" handleNumString={handleNumString}></InputButton>
              </div>
              <div className="calculator-buttons-row">
                <InputButton input="4" handleNumString={handleNumString}></InputButton>
                <InputButton input="5" handleNumString={handleNumString}></InputButton>
                <InputButton input="6" handleNumString={handleNumString}></InputButton>
              </div>
              <div className="calculator-buttons-row">
                <InputButton input="7" handleNumString={handleNumString}></InputButton>
                <InputButton input="8" handleNumString={handleNumString}></InputButton>
                <InputButton input="9" handleNumString={handleNumString}></InputButton>
              </div>
              <div className="calculator-buttons-row">
                <InputButton input="." handleNumString={handleNumString}></InputButton>
                <InputButton input="0" handleNumString={handleNumString}></InputButton>
              </div>
          </div>
          <div className="calculator-operation-buttons">
          <div className="calculator-buttons-row">
                <InputButton input="+" handleNumString={handleNumString}></InputButton>
                <InputButton input="-" handleNumString={handleNumString}></InputButton>
                <InputButton input="×" handleNumString={handleNumString}></InputButton>
                <InputButton input="÷" handleNumString={handleNumString}></InputButton>

              </div>
              <div className="calculator-buttons-row">
                <InputButton input="(" handleNumString={handleNumString}></InputButton>
                <InputButton input=")" handleNumString={handleNumString}></InputButton>
                <InputButton input="^" handleNumString={handleNumString}></InputButton>
                <InputButton input="√" handleNumString={handleNumString}></InputButton>

              </div>

              <div className="calculator-buttons-row">
                <InputButton input="s" label="sin" handleNumString={handleNumString}></InputButton>
                <InputButton input="c" label="cos" handleNumString={handleNumString}></InputButton>
                <InputButton input="t" label="tan" handleNumString={handleNumString}></InputButton>
              </div>

              <div className="calculator-buttons-row">
                <OperationButton label="←" operation={eraseNumString}></OperationButton>
                <OperationButton label="C" operation={clearNumString}></OperationButton>
                <OperationButton label="=" operation={solveNumString}></OperationButton>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
