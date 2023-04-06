import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProgressBar from 'react-bootstrap/ProgressBar';


const Quest = (props) => {
    const [score,setScore] = useState(0);
    const [finalScore,setfinalScore] = useState(false);
    const [answer,setAnswer] = useState();
    
      //Progress Bar
  const [running, setRunning] = useState(true);
  const [progress, setProgress] = useState(0);

  const interval = useRef();

  useEffect(() => {
    if (running) {
      interval.current = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 200);
    } else {
      clearInterval(interval.current);
    }
  }, [running]);

  useEffect(() => {
    if (progress === 100) {
      setRunning(false);
      handleSubmit();
      clearInterval(interval.current);
    }
  }, [progress]);


    console.log('data length', props.data.length);
    console.log(props.idx);

    const handleSubmit = (e) => {
        
        // e.preventDefault();
        console.log(answer);
        let rightanswer = props.data[props.idx].ans;

        if (answer === rightanswer) {
            console.log('Correct!')
            setScore(score+1);
            
        } else {
            console.log('Wrong!')
        }
        props.nextqs(props.idx);
        if (props.idx === props.data.length-1) {
            setfinalScore(true);
        }
        setAnswer();
        setRunning(true);
        setProgress(0);
    }

    return (
        <div className='container1'>
                   {!finalScore? <div style={{fontWeight: "bold"}}>Score : {score}</div> : null} <br></br>
                    {finalScore? <div className='question' >
                                    <div className="finalscore">Your final score is: {score} / {props.data.length}
                                    </div> 
                                    <Button className="button-quiz finalscore" variant="primary" onClick={() => {props.retry(props.idx); setfinalScore(false); setScore(0); setProgress(0)} }>
                                        Retry
                                    </Button>
                                    <Button className="button-quiz finalscore" variant="primary" href="/">
                                        Back to Home
                                    </Button>
                                 </div> : 
                                 
                                 <div className='question'>
                                <ProgressBar now={progress}/>
                                <div> Question {props.idx+1} / {props.data.length}</div>
                                <div className='QS'>{ props.data[props.idx].qs }</div>
                             
                                <div className="options">
                                    <Container className="quiz-container">
                                        <Row>
                                            <Col>
                                                <div className="result" onClick={() => {setAnswer('A')}} >
                                                    A. { props.data[props.idx].a }
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className='result' onClick={() => {setAnswer('B')}}>
                                                    B. { props.data[props.idx].b }
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div className='result' onClick={() => {setAnswer('C')}}>
                                                C. { props.data[props.idx].c }
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className='result' onClick={() => {setAnswer('D')}}>
                                                    D. { props.data[props.idx].d }
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <p></p>
                                    {answer? <div> Your Answer: {answer} </div> : null}
                                </div>
                            <Button className="button-quiz" variant="primary" type="submit" onClick={handleSubmit}>
                                Next Question
                            </Button>
                            
                        
                    </div>}
{/*             
            <button onClick={() => { props.nextqs(props.idx)} }>Next Question</button>
            <button onClick={() => { props.prevqs(props.idx)} }>Previous Question</button> */}
        </div>
        
    )
}
export default Quest;