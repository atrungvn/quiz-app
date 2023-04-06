import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BASE_URL_API from '../axios';
import axios from 'axios';
import { useState } from 'react';



export default function InputQuest() {
    const [quest,setQuest] = useState();
    const [op1,setOp1] = useState();
    const [op2,setOp2] = useState();
    const [op3,setOp3] = useState();
    const [op4,setOp4] = useState();
    const [ans,setAns] = useState('A');
    const [isLoading,setIsLoading] = useState(false);
    const [err,setErr] = useState(false);
    const [qs,setQs] = useState();
    
    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const newQuest = {
            qs: quest,
            a: op1,
            b: op2,
            c: op3,
            d: op4,
            ans: ans
        };
        
        setQs(newQuest);

        const setData = async () => {
            await axios.post(`${BASE_URL_API}`, newQuest).then(res => {
                setIsLoading(false);
                console.log('Success');
            }).catch(err => {
                setIsLoading(false);
                setErr(true);
                console.log('failed');
            });
        };
        setData();

       
        
    }

        const ShowResult = () => {
            if (!qs) {
                console.log('chua co du lieu');
                return null;
            } else if (err) 
            {return <div>Upload failed!</div>}
            else return (<div>Upload Success!</div>)
        }

        const handleClear = () => {
          setQuest('');
          setOp1('');
          setOp2('');
          setOp3('');
          setOp4('');
          setAns('A');
          setIsLoading(false);
          console.log('Clearing..');
        }

    return (
    <div className='container'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="inputQuest">
          <Form.Label className="label">Question</Form.Label>
          <Form.Control type="text" placeholder="Enter question" value={quest}
          onChange={ (e) => {setQuest(e.target.value); console.log(quest)}} />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label className="label">Option A</Form.Label>
          <Form.Control type="text" value={op1}
          onChange={ (e) => {setOp1(e.target.value)}} />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label className="label">Option B</Form.Label>
          <Form.Control type="text" value={op2}
          onChange={ (e) => {setOp2(e.target.value)}} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">Option C</Form.Label>
          <Form.Control value={op3}
          onChange={ (e) => {setOp3(e.target.value)}} type="text"  />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">Option D</Form.Label>
          <Form.Control type="text" value={op4}
          onChange={ (e) => {setOp4(e.target.value)}} />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label className="label">Answer</Form.Label>
          <Form.Select onChange={ (e) => {setAns(e.target.value)}} defaultValue="A">
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="primary" className='buttonClear' onClick={handleClear}>
          Clear
        </Button>
      </Form>
      {isLoading? <div>Uploading data..!</div> : <ShowResult />}
    </div>
    );
  }
  

