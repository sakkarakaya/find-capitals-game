import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CapitalCities from '../capitalCities.json'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  btn: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"

  }
}));

export default function ContainedButtons(props) {
  console.log("asd", props.distance)

  const [cityIndex, setCityIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [kilometers, setKilometers] = useState(1500)
  const [resultText, setResultText] = useState("")
  const [isDisabled, setDisable] = useState(false)
  const [nextDisabled, setNextDisable] = useState(false)

  const classes = useStyles();

  const handleNext = () => {
    //console.log(CapitalCities[i].capitalCity)
    setCityIndex(cityIndex + 1)
    setResultText("")
    props.index(cityIndex + 1)
    setDisable(false)

  }
  const handleCalculate = () => {
    if (props.distance <= 50) {
      setScore(score + 1)
      setResultText(`Correct. Your guess is ${props.distance} km from targeted city`)
    } else {
      setKilometers(kilometers - props.distance)
      setResultText(`Wrong. Your guess is ${props.distance} km from targeted city`)
    }
    setDisable(true)
    if (kilometers - props.distance <= 0) {
      setNextDisable(true)
      setResultText(`Game over. Your kilometer is below 0. Your score: ${score}`)
    }
  }
  const playAgain = () => {
    setKilometers(1500)
    setScore(0)
    setNextDisable(false)
    setDisable(false)
    setCityIndex(0)
    setResultText("")

  }

  return (

    <div className={classes.root}>
      <Box textAlign="center">

        <div className={classes.btn}>
          <Button style={{ marginBottom: "1rem" }} variant="contained">{score} cities placed</Button>
          <Button variant="contained">{kilometers} kilometers left</Button>
        </div>

        {cityIndex < 9 ?
          <>
            <p>Select the Location of {CapitalCities[cityIndex].capitalCity}</p>
            <p>Then click see result</p>
            <h2>{resultText}</h2>
            {!(kilometers <= 0) &&
              <p>For next city please click next city button</p>}
          </> :
          <p>Your score: {score}</p>}

        <Button style={{ marginRight: "1rem" }} onClick={handleNext} color="primary" variant="contained" disabled={nextDisabled}>next city</Button>
        <Button style={{ marginRight: "1rem" }} onClick={handleCalculate} variant="contained" color="secondary" disabled={isDisabled}>SEE RESULT</Button>
        {kilometers <= 0 &&
          <Button onClick={playAgain} variant="contained">PLAY AGAIN</Button>
        }
      </Box>
    </div>
  );
}